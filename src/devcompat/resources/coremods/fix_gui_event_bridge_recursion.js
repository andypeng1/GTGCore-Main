/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * 修复 GUI 事件 SRG 桥接的无限递归（StackOverflowError: mouseReleased event
 * handler，embeddium EmbeddiumVideoOptionsScreen 的 TabFrame 交互触发）。
 * <p>
 * 环：vanilla GUI 类的 SRG 桥接（m_6348_=mouseReleased 等）方法体用
 * INVOKEVIRTUAL/INVOKEINTERFACE 调 MCP 事件方法（多态分派）→ SRG 域 mod 子类
 * （TabFrame）有自己的 MCP 桥接（INVOKESPECIAL 自身 m_6348_）+ 真实 m_6348_
 * 内 super 调用（INVOKESPECIAL 父类 m_6348_）→ 桥接 → 多态分派回子类 MCP
 * 桥接 → 无限递归。
 * <p>
 * 修复：GuiEventListener 的鼠标/键盘/字符事件方法（mouseClicked/mouseReleased/
 * mouseDragged/mouseScrolled/charTyped/keyPressed/keyReleased）全部是 default
 * 方法——SRG 桥接体从多态分派改为 INVOKESPECIAL（接口 default 调用 itf=true，
 * 类方法 itf=false），执行本层/接口 default 实现，断环且语义与正式环境
 * （invokespecial 调接口 default）一致。仅处理生成器加的 SRG 桥接（m_ 前缀
 * 方法），不动 SRG 域 mod 类上的 MCP 桥接。
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');

    var EVENT_MCP_NAMES = [
        'mouseClicked', 'mouseReleased', 'mouseDragged', 'mouseScrolled',
        'charTyped', 'keyPressed', 'keyReleased'
    ];

    function isEventName(name) {
        for (var i = 0; i < EVENT_MCP_NAMES.length; i++) {
            if (EVENT_MCP_NAMES[i] === name) return true;
        }
        return false;
    }

    function fixEventBridges(classNode) {
        var methods = classNode.methods;
        for (var i = 0; i < methods.size(); i++) {
            var m = methods.get(i);
            // 只处理生成器生成的 SRG 桥接（m_ 前缀）；SRG 域 mod 类上的 MCP 桥接不动
            if (!m.name.startsWith('m_')) { continue; }
            for (var j = 0; j < m.instructions.size(); j++) {
                var insn = m.instructions.get(j);
                var op = insn.getOpcode();
                if ((op === Opcodes.INVOKEVIRTUAL || op === Opcodes.INVOKEINTERFACE)
                    && isEventName(insn.name)) {
                    insn.setOpcode(Opcodes.INVOKESPECIAL);
                    print('[EVT-FIX] ' + classNode.name + '.' + m.name + ' -> INVOKESPECIAL ' + insn.name);
                }
            }
        }
        return classNode;
    }

    return {
        'gtgcore_gui_event_container_ih': {
            'target': { 'type': 'CLASS', 'name': 'net/minecraft/client/gui/components/events/ContainerEventHandler' },
            'transformer': fixEventBridges
        },
        'gtgcore_gui_event_gui_listener': {
            'target': { 'type': 'CLASS', 'name': 'net/minecraft/client/gui/components/events/GuiEventListener' },
            'transformer': fixEventBridges
        },
        'gtgcore_gui_event_abstract_ceh': {
            'target': { 'type': 'CLASS', 'name': 'net/minecraft/client/gui/components/events/AbstractContainerEventHandler' },
            'transformer': fixEventBridges
        },
        'gtgcore_gui_event_screen': {
            'target': { 'type': 'CLASS', 'name': 'net/minecraft/client/gui/screens/Screen' },
            'transformer': fixEventBridges
        },
        'gtgcore_gui_event_abstract_widget': {
            'target': { 'type': 'CLASS', 'name': 'net/minecraft/client/gui/components/AbstractWidget' },
            'transformer': fixEventBridges
        },
        'gtgcore_gui_event_abstract_button': {
            'target': { 'type': 'CLASS', 'name': 'net/minecraft/client/gui/components/AbstractButton' },
            'transformer': fixEventBridges
        }
    };
}
