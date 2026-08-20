/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * EndingLibrary 的 MinecraftMixin 用 @Shadow 引用 GameRenderer 的 SRG 方法：
 * - m_109153_ → GameRenderer.getMainCamera()Lnet/minecraft/client/Camera;
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var MethodNode = Java.type('org.objectweb.asm.tree.MethodNode');
    var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
    var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');

    return {
        'gtgcore_gamerenderer_endinglib_compat': {
            'target': {
                'type': 'CLASS',
                'name': 'net.minecraft.client.renderer.GameRenderer'
            },
            'transformer': function (classNode) {
                var methods = classNode.methods;
                for (var i = 0; i < methods.size(); i++) {
                    var m = methods.get(i);
                    if (m.name === 'm_109153_' && m.desc === '()Lnet/minecraft/client/Camera;') { return classNode; }
                }
                var method = new MethodNode(Opcodes.ACC_PUBLIC, 'm_109153_', '()Lnet/minecraft/client/Camera;', null, null);
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                method.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL,
                    'net/minecraft/client/renderer/GameRenderer', 'getMainCamera', '()Lnet/minecraft/client/Camera;', false));
                method.instructions.add(new InsnNode(Opcodes.ARETURN));
                methods.add(method);
                return classNode;
            }
        }
    };
}
