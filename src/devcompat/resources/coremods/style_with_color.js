/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * EndingLibrary 的 custom_style.StyleMixin 的 @WrapOperation 目标 m_131157_
 * （withColor(ChatFormatting)）要求方法体内有 TextColor.fromLegacyFormat 调用
 * （@At(INVOKE) 注入点），且 mixin 注入不能进入低 priority mixin 合并的方法，
 * 因此用 CoreMod 添加真实字节码方法。
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var MethodNode = Java.type('org.objectweb.asm.tree.MethodNode');
    var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
    var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');

    return {
        'gtgcore_style_with_color': {
            'target': {
                'type': 'CLASS',
                'name': 'net.minecraft.network.chat.Style'
            },
            'transformer': function (classNode) {
                var methods = classNode.methods;
                var desc = '(Lnet/minecraft/ChatFormatting;)Lnet/minecraft/network/chat/Style;';
                for (var i = 0; i < methods.size(); i++) {
                    var m = methods.get(i);
                    if (m.name === 'm_131157_' && m.desc === desc) { return classNode; }
                }
                var method = new MethodNode(Opcodes.ACC_PUBLIC, 'm_131157_', desc, null, null);
                // TextColor.fromLegacyFormat(formatting);（EndingLibrary @At(INVOKE) 注入点要求）
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 1));
                method.instructions.add(new MethodInsnNode(Opcodes.INVOKESTATIC,
                    'net/minecraft/network/chat/TextColor', 'fromLegacyFormat',
                    '(Lnet/minecraft/ChatFormatting;)Lnet/minecraft/network/chat/TextColor;', false));
                method.instructions.add(new InsnNode(Opcodes.POP));
                // return this.withColor(formatting);
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 1));
                method.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL,
                    'net/minecraft/network/chat/Style', 'withColor', desc, false));
                method.instructions.add(new InsnNode(Opcodes.ARETURN));
                methods.add(method);

                // m_131164_ → applyLegacyFormat(ChatFormatting)（saveOriginalLegacyColor 的 @WrapOperation 目标）
                var desc2 = '(Lnet/minecraft/ChatFormatting;)Lnet/minecraft/network/chat/Style;';
                var has2 = false;
                for (var k = 0; k < methods.size(); k++) {
                    var mk = methods.get(k);
                    if (mk.name === 'm_131164_' && mk.desc === desc2) { has2 = true; break; }
                }
                if (!has2) {
                    var method2 = new MethodNode(Opcodes.ACC_PUBLIC, 'm_131164_', desc2, null, null);
                    // TextColor.fromLegacyFormat(formatting);（注入点要求）
                    method2.instructions.add(new VarInsnNode(Opcodes.ALOAD, 1));
                    method2.instructions.add(new MethodInsnNode(Opcodes.INVOKESTATIC,
                        'net/minecraft/network/chat/TextColor', 'fromLegacyFormat',
                        '(Lnet/minecraft/ChatFormatting;)Lnet/minecraft/network/chat/TextColor;', false));
                    method2.instructions.add(new InsnNode(Opcodes.POP));
                    // return this.applyLegacyFormat(formatting);
                    method2.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                    method2.instructions.add(new VarInsnNode(Opcodes.ALOAD, 1));
                    method2.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL,
                        'net/minecraft/network/chat/Style', 'applyLegacyFormat', desc2, false));
                    method2.instructions.add(new InsnNode(Opcodes.ARETURN));
                    methods.add(method2);
                }
                return classNode;
            }
        }
    };
}
