/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * FTB Library 的 SidebarGroupGuiButton（SRG 域）只实现 m_88315_（render），
 * 没有 MCP 名 render——生成器 IM 的 skipDueToParent 认为父类
 * AbstractWidget.render（MCP 具体实现）可兜底而跳过桥接。但 vanilla
 * AbstractWidget.render 内部调用已被 SRG 化的 m_87963_（renderButton），
 * dispatch 到 AbstractButton 桥接直接 renderWidget——SidebarGroupGuiButton
 * m_88315_ 里"遍历按钮组并设置 width/height"的逻辑被绕过 → width=0 →
 * blitNineSliced 除零崩溃（打开任意 Screen 即崩）。
 * 修复：补 MCP render 桥接（INVOKESPECIAL 直调自身 m_88315_）。
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var MethodNode = Java.type('org.objectweb.asm.tree.MethodNode');
    var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
    var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');

    var DESC = '(Lnet/minecraft/client/gui/GuiGraphics;IIF)V';

    return {
        'gtgcore_fix_sidebar_button_render': {
            'target': {
                'type': 'CLASS',
                'name': 'dev/ftb/mods/ftblibrary/sidebar/SidebarGroupGuiButton'
            },
            'transformer': function (classNode) {
                var methods = classNode.methods;
                for (var i = 0; i < methods.size(); i++) {
                    var m = methods.get(i);
                    if (m.name === 'render' && m.desc === DESC) { return classNode; }
                }
                var hasSrg = false;
                for (var i = 0; i < methods.size(); i++) {
                    var m = methods.get(i);
                    if (m.name === 'm_88315_' && m.desc === DESC) { hasSrg = true; break; }
                }
                if (!hasSrg) { return classNode; }
                var bridge = new MethodNode(Opcodes.ACC_PUBLIC, 'render', DESC, null, null);
                bridge.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                bridge.instructions.add(new VarInsnNode(Opcodes.ALOAD, 1));
                bridge.instructions.add(new VarInsnNode(Opcodes.ILOAD, 2));
                bridge.instructions.add(new VarInsnNode(Opcodes.ILOAD, 3));
                bridge.instructions.add(new VarInsnNode(Opcodes.FLOAD, 4));
                bridge.instructions.add(new MethodInsnNode(Opcodes.INVOKESPECIAL,
                    'dev/ftb/mods/ftblibrary/sidebar/SidebarGroupGuiButton', 'm_88315_', DESC, false));
                bridge.instructions.add(new InsnNode(Opcodes.RETURN));
                methods.add(bridge);
                return classNode;
            }
        }
    };
}
