/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * embeddium core.render.world.WorldRendererMixin @Overwrite 了 renderChunkLayer
 * （注入名 m_172993_）与 setupRender（注入名 m_194338_）——注入后 LevelRenderer
 * 同时存在 vanilla MCP 方法（原实现）和 embeddium SRG 名方法，调用点必须走
 * embeddium 实现才正常（否则 embeddium 半接管 → 只渲染一个区块）。
 * <p>
 * 不能改 renderLevel 里的调用点（会级联破坏 ae2lt LevelRendererPhaseFlightMixin
 * 的 @ModifyArg、oculus MixinLevelRenderer_EntityListSorting 的 @ModifyVariable
 * 等注入——它们的注入点/变量分析基于 renderLevel 字节码）。因此改为
 * **方法体转发**：把 vanilla renderChunkLayer/setupRender 方法体替换为直接
 * 调用 embeddium 的 m_172993_/m_194338_（调用点不变，mixin 注入点不受影响）。
 * 已确认没有任何 mixin 以 renderChunkLayer/setupRender 方法体为注入目标。
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
    var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');

    var RCL_DESC = '(Lnet/minecraft/client/renderer/RenderType;Lcom/mojang/blaze3d/vertex/PoseStack;DDDLorg/joml/Matrix4f;)V';
    var SUR_DESC = '(Lnet/minecraft/client/Camera;Lnet/minecraft/client/renderer/culling/Frustum;ZZ)V';

    function forward(classNode, mcpName, srgName, desc, loads) {
        var methods = classNode.methods;
        for (var i = 0; i < methods.size(); i++) {
            var m = methods.get(i);
            if (m.name !== mcpName || m.desc !== desc) { continue; }
            // 已是转发形式（指令数恰好是 loads + 2）则跳过
            m.instructions.clear();
            m.tryCatchBlocks.clear();
            for (var j = 0; j < loads.length; j++) {
                var lv = loads[j];
                m.instructions.add(new VarInsnNode(lv[0], lv[1]));
            }
            m.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL,
                'net/minecraft/client/renderer/LevelRenderer', srgName, desc, false));
            m.instructions.add(new InsnNode(Opcodes.RETURN));
            m.maxLocals = 10;
            m.maxStack = 10;
            print('[LRDBG] forwarded ' + mcpName + ' -> ' + srgName);
            return;
        }
    }

    return {
        'gtgcore_fix_levelrenderer_embeddium': {
            'target': { 'type': 'CLASS', 'name': 'net/minecraft/client/renderer/LevelRenderer' },
            'transformer': function (classNode) {
                // renderChunkLayer(RenderType, PoseStack, x, y, z, Matrix4f) -> m_172993_
                forward(classNode, 'renderChunkLayer', 'm_172993_', RCL_DESC,
                    [[Opcodes.ALOAD, 0], [Opcodes.ALOAD, 1], [Opcodes.ALOAD, 2],
                     [Opcodes.DLOAD, 3], [Opcodes.DLOAD, 5], [Opcodes.DLOAD, 7],
                     [Opcodes.ALOAD, 9]]);
                // setupRender(Camera, Frustum, boolean, boolean) -> m_194338_
                forward(classNode, 'setupRender', 'm_194338_', SUR_DESC,
                    [[Opcodes.ALOAD, 0], [Opcodes.ALOAD, 1], [Opcodes.ALOAD, 2],
                     [Opcodes.ILOAD, 3], [Opcodes.ILOAD, 4]]);
                return classNode;
            }
        }
    };
}
