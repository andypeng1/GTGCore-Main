/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * ModernFix 的 state_definition_construct.StateDefinitionMixin 用
 * @Shadow @Final f_61048_（实例字段 propertiesByName）读取缓存。
 * dev 环境类为 MCP 域：该字段非 private，mixin 不允许别名
 * （Non-private field cannot be aliased），补桥接字段（null）会被读取 NPE，
 * 因此直接移除该 mixin 的全部注解使其空转（dev 环境不需要该性能优化，
 * 正式环境不受影响）。
 */
function initializeCoreMod() {
    var ANN_SHADOW = 'Lorg/spongepowered/asm/mixin/Shadow;';
    return {
        'gtgcore_disable_modernfix_state_def': {
            'target': {
                'type': 'CLASS',
                'name': 'org.embeddedt.modernfix.common.mixin.perf.state_definition_construct.StateDefinitionMixin'
            },
            'transformer': function (classNode) {
                // 移除字段上的 @Shadow / @Final 注解
                var fields = classNode.fields;
                if (fields) {
                    for (var i = 0; i < fields.size(); i++) {
                        var f = fields.get(i);
                        var tabs = [f.visibleAnnotations, f.invisibleAnnotations];
                        for (var t = 0; t < tabs.length; t++) {
                            var list = tabs[t];
                            if (!list) { continue; }
                            for (var j = list.size() - 1; j >= 0; j--) {
                                var a = list.get(j);
                                if (a.desc === ANN_SHADOW || a.desc === 'Lorg/spongepowered/asm/mixin/Final;') {
                                    list.remove(j);
                                }
                            }
                        }
                    }
                }
                // 移除方法上的注入注解（@ModifyVariable/@Inject/@Redirect 等）
                var methods = classNode.methods;
                if (methods) {
                    for (var i = 0; i < methods.size(); i++) {
                        var m = methods.get(i);
                        var tabs = [m.visibleAnnotations, m.invisibleAnnotations];
                        for (var t = 0; t < tabs.length; t++) {
                            var list = tabs[t];
                            if (!list) { continue; }
                            for (var j = list.size() - 1; j >= 0; j--) {
                                var a = list.get(j);
                                if (a.desc.indexOf('mixin/injection/') >= 0) {
                                    list.remove(j);
                                }
                            }
                        }
                    }
                }
                return classNode;
            }
        }
    };
}
