/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * ModernFix 的 dedicated_reload_executor.MinecraftMixin 的 @Redirect 目标
 * getResourceReloadExecutor 期望新版 MC 的返回类型 ExecutorService，
 * 1.20.1 返回 Executor，描述符不匹配导致注入失败。通过移除注入注解使注入失效
 * （该优化功能在 dev 环境不可用，正式环境不受影响）。
 */
function initializeCoreMod() {
    return {
        'gtgcore_disable_modernfix_dre': {
            'target': {
                'type': 'CLASS',
                'name': 'org.embeddedt.modernfix.common.mixin.perf.dedicated_reload_executor.MinecraftMixin'
            },
            'transformer': function (classNode) {
                var methods = classNode.methods;
                for (var i = 0; i < methods.size(); i++) {
                    var m = methods.get(i);
                    var ann = m.visibleAnnotations;
                    if (ann === null) { continue; }
                    for (var j = ann.size() - 1; j >= 0; j--) {
                        var a = ann.get(j);
                        if (a.desc === 'Lorg/spongepowered/asm/mixin/injection/Inject;' ||
                            a.desc === 'Lorg/spongepowered/asm/mixin/injection/Redirect;' ||
                            a.desc === 'Lorg/spongepowered/asm/mixin/injection/ModifyArg;' ||
                            a.desc === 'Lorg/spongepowered/asm/mixin/injection/ModifyVariable;' ||
                            a.desc === 'Lorg/spongepowered/asm/mixin/injection/ModifyExpressionValue;') {
                            ann.remove(j);
                        }
                    }
                }
                return classNode;
            }
        }
    };
}
