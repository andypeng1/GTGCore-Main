/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * 生成器给 Screen/AbstractContainerScreen 加的 m_7856_（init 的 SRG 别名）桥接
 * 用 INVOKEVIRTUAL 调 MCP init——SRG 域子类（如 embeddium SodiumOptionsGUI）的
 * super.m_7856_() 会 dispatch 回我们补的 MCP init 桥接 → init ↔ m_7856_ 无限递归。
 * super 调用语义应执行父类原实现，改为 INVOKESPECIAL。
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');

    function fixBridge(classNode) {
        var methods = classNode.methods;
        for (var i = 0; i < methods.size(); i++) {
            var m = methods.get(i);
            if (m.name !== 'm_7856_' || m.desc !== '()V') { continue; }
            for (var j = 0; j < m.instructions.size(); j++) {
                var insn = m.instructions.get(j);
                if (insn.getOpcode() === Opcodes.INVOKEVIRTUAL
                    && insn.name === 'init' && insn.desc === '()V') {
                    insn.setOpcode(Opcodes.INVOKESPECIAL);
                }
            }
        }
        return classNode;
    }

    return {
        'gtgcore_fix_screen_init_bridge': {
            'target': { 'type': 'CLASS', 'name': 'net/minecraft/client/gui/screens/Screen' },
            'transformer': fixBridge
        },
        'gtgcore_fix_acs_init_bridge': {
            'target': { 'type': 'CLASS', 'name': 'net/minecraft/client/gui/screens/inventory/AbstractContainerScreen' },
            'transformer': fixBridge
        }
    };
}
