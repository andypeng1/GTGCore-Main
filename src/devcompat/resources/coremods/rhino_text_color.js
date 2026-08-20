/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * Rhino 的 TextColorMixin 用 @Shadow 引用 SRG 方法 m_131274_
 * （官方名 TextColor.serialize()String），refmap 无条目且 @Shadow 基于 ClassInfo，
 * 只能走 CoreMod 补方法（委托官方实现）。
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var MethodNode = Java.type('org.objectweb.asm.tree.MethodNode');
    var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
    var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');

    return {
        'gtgcore_rhino_text_color': {
            'target': {
                'type': 'CLASS',
                'name': 'net.minecraft.network.chat.TextColor'
            },
            'transformer': function (classNode) {
                var methods = classNode.methods;
                var desc = '()Ljava/lang/String;';
                for (var i = 0; i < methods.size(); i++) {
                    var m = methods.get(i);
                    if (m.name === 'm_131274_' && m.desc === desc) { return classNode; }
                }
                var method = new MethodNode(Opcodes.ACC_PUBLIC, 'm_131274_', desc, null, null);
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                method.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL,
                    'net/minecraft/network/chat/TextColor', 'serialize', desc, false));
                method.instructions.add(new InsnNode(Opcodes.ARETURN));
                methods.add(method);

                // @Shadow 字段 f_131257_ → value（int）
                var FieldNode = Java.type('org.objectweb.asm.tree.FieldNode');
                var fields = classNode.fields;
                var hasField = false;
                for (var k = 0; k < fields.size(); k++) {
                    if (fields.get(k).name === 'f_131257_') { hasField = true; break; }
                }
                if (!hasField) {
                    fields.add(new FieldNode(Opcodes.ACC_PUBLIC, 'f_131257_', 'I', null, null));
                }
                return classNode;
            }
        }
    };
}
