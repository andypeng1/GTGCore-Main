/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * ModernUI 的 MixinMinecraft 用 @Shadow 引用 Window 的 SRG 方法（refmap 无条目）：
 * - m_85434_ → Window.getFramerateLimit()I
 * - m_85439_ → Window.getWindow()J
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var MethodNode = Java.type('org.objectweb.asm.tree.MethodNode');
    var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
    var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');
    var WINDOW = 'com/mojang/blaze3d/platform/Window';

    return {
        'gtgcore_window_modernui_compat': {
            'target': {
                'type': 'CLASS',
                'name': WINDOW
            },
            'transformer': function (classNode) {
                var methods = classNode.methods;
                function addDelegate(name, desc, targetName, targetDesc, retInsn) {
                    for (var i = 0; i < methods.size(); i++) {
                        var m = methods.get(i);
                        if (m.name === name && m.desc === desc) { return; }
                    }
                    var method = new MethodNode(Opcodes.ACC_PUBLIC, name, desc, null, null);
                    method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                    method.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL, WINDOW, targetName, targetDesc, false));
                    method.instructions.add(new InsnNode(retInsn));
                    methods.add(method);
                }
                addDelegate('m_85434_', '()I', 'getFramerateLimit', '()I', Opcodes.IRETURN);
                addDelegate('m_85439_', '()J', 'getWindow', '()J', Opcodes.LRETURN);
                return classNode;
            }
        }
    };
}
