/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * KubeJS 的 components.MutableComponentMixin 用 @Shadow 引用 SRG 方法
 * m_130946_（官方名 append(String)MutableComponent），refmap 无条目且
 * @Shadow 基于 ClassInfo，只能走 CoreMod 补方法（委托官方实现）。
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var MethodNode = Java.type('org.objectweb.asm.tree.MethodNode');
    var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
    var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');

    return {
        'gtgcore_kubejs_mutable_component': {
            'target': {
                'type': 'CLASS',
                'name': 'net.minecraft.network.chat.MutableComponent'
            },
            'transformer': function (classNode) {
                var methods = classNode.methods;
                var desc = '(Ljava/lang/String;)Lnet/minecraft/network/chat/MutableComponent;';
                for (var i = 0; i < methods.size(); i++) {
                    var m = methods.get(i);
                    if (m.name === 'm_130946_' && m.desc === desc) { return classNode; }
                }
                var method = new MethodNode(Opcodes.ACC_PUBLIC, 'm_130946_', desc, null, null);
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 1));
                method.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL,
                    'net/minecraft/network/chat/MutableComponent', 'append', desc, false));
                method.instructions.add(new InsnNode(Opcodes.ARETURN));
                methods.add(method);
                return classNode;
            }
        }
    };
}
