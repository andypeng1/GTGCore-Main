/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * SRG 域 mod 类（embeddium）的 GUI override 的是 Screen.m_7856_（init 的 SRG 名），
 * 而 dev 环境 vanilla 的 Minecraft.setScreen 调用的是 MCP 名 Screen.init——
 * dispatch 不到 mod 类的 m_7856_ → init 空转 → 控件（applyButton 等）从不创建 →
 * SodiumOptionsGUI.updateControls NPE。补 MCP 名 init 桥接（INVOKESPECIAL 直调
 * 自身 m_7856_，不 dispatch）。
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var MethodNode = Java.type('org.objectweb.asm.tree.MethodNode');
    var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
    var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');

    return {
        'gtgcore_sodium_options_gui_init': {
            'target': {
                'type': 'CLASS',
                'name': 'me/jellysquid/mods/sodium/client/gui/SodiumOptionsGUI'
            },
            'transformer': function (classNode) {
                var methods = classNode.methods;
                for (var i = 0; i < methods.size(); i++) {
                    var m = methods.get(i);
                    if (m.name === 'init' && m.desc === '()V') { return classNode; }
                }
                var hasSrg = false;
                for (var i = 0; i < methods.size(); i++) {
                    var m = methods.get(i);
                    if (m.name === 'm_7856_' && m.desc === '()V') { hasSrg = true; break; }
                }
                if (!hasSrg) { return classNode; }
                var bridge = new MethodNode(Opcodes.ACC_PUBLIC, 'init', '()V', null, null);
                bridge.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                bridge.instructions.add(new MethodInsnNode(Opcodes.INVOKESPECIAL,
                    'me/jellysquid/mods/sodium/client/gui/SodiumOptionsGUI', 'm_7856_', '()V', false));
                bridge.instructions.add(new InsnNode(Opcodes.RETURN));
                methods.add(bridge);
                return classNode;
            }
        }
    };
}
