/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * ModernFix 的 bugfix.world_leaks.MinecraftMixin 的 @Inject 注入点（FIELD level）
 * 在 dev 环境无法满足，通过移除注入注解使注入失效
 * （该修复在 dev 环境不可用，正式环境不受影响）。
 */
function initializeCoreMod() {
    return {
        'gtgcore_disable_modernfix_world_leaks': {
            'target': {
                'type': 'CLASS',
                'name': 'org.embeddedt.modernfix.common.mixin.bugfix.world_leaks.MinecraftMixin'
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
