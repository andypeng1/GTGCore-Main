/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * ModernUI 的 MixinMinecraft 用 @Shadow 引用 SRG 成员（refmap 无条目，
 * @Shadow 基于 ClassInfo，只能走 CoreMod）：
 * - f_90990_ → Minecraft.window（Window 字段）
 * - f_91080_ → Minecraft.screen（Screen 字段）
 * - m_91302_ → Minecraft.isWindowActive()Z
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var FieldNode = Java.type('org.objectweb.asm.tree.FieldNode');
    var MethodNode = Java.type('org.objectweb.asm.tree.MethodNode');
    var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
    var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');

    return {
        'gtgcore_minecraft_modernui_compat': {
            'target': {
                'type': 'CLASS',
                'name': 'net.minecraft.client.Minecraft'
            },
            'transformer': function (classNode) {
                var fields = classNode.fields;
                function addField(name, desc) {
                    for (var i = 0; i < fields.size(); i++) {
                        if (fields.get(i).name === name) { return; }
                    }
                    fields.add(new FieldNode(Opcodes.ACC_PUBLIC, name, desc, null, null));
                }
                addField('f_90990_', 'Lcom/mojang/blaze3d/platform/Window;');
                addField('f_91080_', 'Lnet/minecraft/client/gui/screens/Screen;');

                var methods = classNode.methods;
                var exists = false;
                for (var j = 0; j < methods.size(); j++) {
                    var m = methods.get(j);
                    if (m.name === 'm_91302_' && m.desc === '()Z') { exists = true; break; }
                }
                if (!exists) {
                    // public boolean m_91302_() { return this.isWindowActive(); }
                    var method = new MethodNode(Opcodes.ACC_PUBLIC, 'm_91302_', '()Z', null, null);
                    method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                    method.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL,
                        'net/minecraft/client/Minecraft', 'isWindowActive', '()Z', false));
                    method.instructions.add(new InsnNode(Opcodes.IRETURN));
                    methods.add(method);
                }
                return classNode;
            }
        }
    };
}
