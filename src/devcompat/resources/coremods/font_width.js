/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * EndingLibrary 的 mixin 用 @Shadow 引用 SRG 方法 m_92895_（官方名 Font.width，
 * 签名 (Ljava/lang/String;)I），refmap 无条目且 @Shadow 基于 ClassInfo，只能走 CoreMod。
 * 方法体委托真实 width 实现。
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var MethodNode = Java.type('org.objectweb.asm.tree.MethodNode');
    var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
    var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');

    return {
        'gtgcore_font_width': {
            'target': {
                'type': 'CLASS',
                'name': 'net.minecraft.client.gui.Font'
            },
            'transformer': function (classNode) {
                var methods = classNode.methods;
                for (var i = 0; i < methods.size(); i++) {
                    var m = methods.get(i);
                    if (m.name === 'm_92895_' && m.desc === '(Ljava/lang/String;)I') { return classNode; }
                }
                // public int m_92895_(String s) { return this.width(s); }
                var method = new MethodNode(Opcodes.ACC_PUBLIC, 'm_92895_', '(Ljava/lang/String;)I', null, null);
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 1));
                method.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL,
                    'net/minecraft/client/gui/Font', 'width', '(Ljava/lang/String;)I', false));
                method.instructions.add(new InsnNode(Opcodes.IRETURN));
                methods.add(method);
                return classNode;
            }
        }
    };
}
