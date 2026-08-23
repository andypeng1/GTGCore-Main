/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * ModernFix 的 compact_mojang_registries.MappedRegistryMixin 用 @Mutable @Shadow
 * 写 MappedRegistry.lifecycles（final 字段）。dev 环境类为 MCP 域：字段引用
 * 改写方案只改 GETFIELD（PUTFIELD 写真实 final 字段会 IllegalAccessError），
 * 该 mixin 的写入逻辑走桥接字段会导致读写不一致，直接禁用（纯性能优化，
 * 正式环境不受影响）。
 */
function initializeCoreMod() {
    var ANN_PATTERN = /org\/spongepowered\/asm\/mixin/;
    return {
        'gtgcore_disable_modernfix_mapped_registry': {
            'target': { 'type': 'CLASS', 'name': 'org.embeddedt.modernfix.common.mixin.perf.compact_mojang_registries.MappedRegistryMixin' },
            'transformer': function (classNode) {
                var fields = classNode.fields;
                if (fields) {
                    for (var i = 0; i < fields.size(); i++) {
                        var f = fields.get(i);
                        var tabs = [f.visibleAnnotations, f.invisibleAnnotations];
                        for (var t = 0; t < tabs.length; t++) {
                            var list = tabs[t];
                            if (!list) { continue; }
                            for (var j = list.size() - 1; j >= 0; j--) {
                                if (ANN_PATTERN.test(list.get(j).desc)) { list.remove(j); }
                            }
                        }
                    }
                }
                var methods = classNode.methods;
                if (methods) {
                    for (var i = 0; i < methods.size(); i++) {
                        var m = methods.get(i);
                        var tabs = [m.visibleAnnotations, m.invisibleAnnotations];
                        for (var t = 0; t < tabs.length; t++) {
                            var list = tabs[t];
                            if (!list) { continue; }
                            for (var j = list.size() - 1; j >= 0; j--) {
                                if (ANN_PATTERN.test(list.get(j).desc)) { list.remove(j); }
                            }
                        }
                    }
                }
                return classNode;
            }
        }
    };
}
