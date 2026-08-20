/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * ModernUI 的 MixinChatFormatting 用 @Overwrite 引用 SRG 方法 m_126645_
 * （官方名 ChatFormatting.getByCode(char)），refmap 无条目且 @Overwrite 基于 ClassInfo，
 * 只能走 CoreMod 补方法（委托官方实现）。
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var MethodNode = Java.type('org.objectweb.asm.tree.MethodNode');
    var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
    var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');

    return {
        'gtgcore_modernui_chat_formatting': {
            'target': {
                'type': 'CLASS',
                'name': 'net.minecraft.ChatFormatting'
            },
            'transformer': function (classNode) {
                var methods = classNode.methods;
                var desc = '(C)Lnet/minecraft/ChatFormatting;';
                for (var i = 0; i < methods.size(); i++) {
                    var m = methods.get(i);
                    if (m.name === 'm_126645_' && m.desc === desc) { return classNode; }
                }
                var method = new MethodNode(Opcodes.ACC_PUBLIC + Opcodes.ACC_STATIC, 'm_126645_', desc, null, null);
                method.instructions.add(new VarInsnNode(Opcodes.ILOAD, 0));
                method.instructions.add(new MethodInsnNode(Opcodes.INVOKESTATIC,
                    'net/minecraft/ChatFormatting', 'getByCode', desc, false));
                method.instructions.add(new InsnNode(Opcodes.ARETURN));
                methods.add(method);

                // Rhino TextColorMixin handler 调用 m_126657_ → getByName(String)
                var desc2 = '(Ljava/lang/String;)Lnet/minecraft/ChatFormatting;';
                var has2 = false;
                for (var k = 0; k < methods.size(); k++) {
                    var mk = methods.get(k);
                    if (mk.name === 'm_126657_' && mk.desc === desc2) { has2 = true; break; }
                }
                if (!has2) {
                    var method2 = new MethodNode(Opcodes.ACC_PUBLIC + Opcodes.ACC_STATIC, 'm_126657_', desc2, null, null);
                    method2.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                    method2.instructions.add(new MethodInsnNode(Opcodes.INVOKESTATIC,
                        'net/minecraft/ChatFormatting', 'getByName', desc2, false));
                    method2.instructions.add(new InsnNode(Opcodes.ARETURN));
                    methods.add(method2);
                }

                // Rhino TextColorMixin handler 调用 m_178510_ → getChar()（instance 方法）
                var desc3 = '()C';
                var has3 = false;
                for (var q = 0; q < methods.size(); q++) {
                    var mq = methods.get(q);
                    if (mq.name === 'm_178510_' && mq.desc === desc3) { has3 = true; break; }
                }
                if (!has3) {
                    var method3 = new MethodNode(Opcodes.ACC_PUBLIC, 'm_178510_', desc3, null, null);
                    method3.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                    method3.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL,
                        'net/minecraft/ChatFormatting', 'getChar', desc3, false));
                    method3.instructions.add(new InsnNode(Opcodes.IRETURN));
                    methods.add(method3);
                }
                return classNode;
            }
        }
    };
}
