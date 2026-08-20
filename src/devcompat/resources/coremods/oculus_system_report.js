/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * Oculus 的 MixinSystemReport 用 @Shadow 引用 SRG 方法 m_143522_
 * （官方名 SystemReport.setDetail(String, Supplier)），refmap 无条目且
 * @Shadow 基于 ClassInfo，只能走 CoreMod 补方法（委托官方实现）。
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var MethodNode = Java.type('org.objectweb.asm.tree.MethodNode');
    var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
    var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');

    return {
        'gtgcore_oculus_system_report': {
            'target': {
                'type': 'CLASS',
                'name': 'net.minecraft.SystemReport'
            },
            'transformer': function (classNode) {
                var methods = classNode.methods;
                var desc = '(Ljava/lang/String;Ljava/util/function/Supplier;)V';
                for (var i = 0; i < methods.size(); i++) {
                    var m = methods.get(i);
                    if (m.name === 'm_143522_' && m.desc === desc) { return classNode; }
                }
                var method = new MethodNode(Opcodes.ACC_PUBLIC, 'm_143522_', desc, null, null);
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 1));
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 2));
                method.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL,
                    'net/minecraft/SystemReport', 'setDetail', desc, false));
                method.instructions.add(new InsnNode(Opcodes.RETURN));
                methods.add(method);
                return classNode;
            }
        }
    };
}
