/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * Architectury 的 MixinMinecraft 的 @Inject 目标 m_91393_（destroy）要求方法体内有
 * (Ljava/lang/String;)V 调用（@At(INVOKE, target="{1}(Ljava/lang/String;)V") 动态匹配），
 * 且 mixin 注入不能进入低 priority mixin 合并的方法，因此用 CoreMod 添加真实字节码方法。
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var MethodNode = Java.type('org.objectweb.asm.tree.MethodNode');
    var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
    var LdcInsnNode = Java.type('org.objectweb.asm.tree.LdcInsnNode');
    var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');

    return {
        'gtgcore_architectury_minecraft_destroy': {
            'target': {
                'type': 'CLASS',
                'name': 'net.minecraft.client.Minecraft'
            },
            'transformer': function (classNode) {
                var methods = classNode.methods;
                var desc = '()V';
                for (var i = 0; i < methods.size(); i++) {
                    var m = methods.get(i);
                    if (m.name === 'm_91393_' && m.desc === desc) { return classNode; }
                }
                var method = new MethodNode(Opcodes.ACC_PUBLIC, 'm_91393_', desc, null, null);
                // this.openChatScreen("gtgcore");（@At(INVOKE, target="{1}(Ljava/lang/String;)V") 注入点）
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                method.instructions.add(new LdcInsnNode('gtgcore'));
                method.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL,
                    'net/minecraft/client/Minecraft', 'openChatScreen', '(Ljava/lang/String;)V', false));
                // this.destroy();
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                method.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL,
                    'net/minecraft/client/Minecraft', 'destroy', desc, false));
                method.instructions.add(new InsnNode(Opcodes.RETURN));
                methods.add(method);
                return classNode;
            }
        }
    };
}
