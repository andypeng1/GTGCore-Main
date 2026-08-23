/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * Forge 的 mapped_official recomp jar 中，接口 default 方法的"具体化"实现
 * （如 AbstractContainerEventHandler.setDragging/isDragging，官方源码非 final）
 * 被标为 ACC_FINAL。sodium/embeddium 用官方映射（MCP 域）发布，其子类
 * （如 ConfigCorruptedScreen）override setDragging → JVM 加载时
 * "overrides final method" → IncompatibleClassChangeError。
 * 清掉这两个方法的 final 标志（正式环境 SRG 域无此问题）。
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var FINAL = Opcodes.ACC_FINAL;
    var names = { 'setDragging': true, 'isDragging': true };
    return {
        'gtgcore_unfinal_abstract_container_event_handler': {
            'target': { 'type': 'CLASS', 'name': 'net/minecraft/client/gui/components/events/AbstractContainerEventHandler' },
            'transformer': function (classNode) {
                var methods = classNode.methods;
                for (var i = 0; i < methods.size(); i++) {
                    var m = methods.get(i);
                    if (names[m.name] && (m.access & FINAL) !== 0) {
                        m.access = m.access & ~FINAL;
                    }
                }
                return classNode;
            }
        }
    };
}
