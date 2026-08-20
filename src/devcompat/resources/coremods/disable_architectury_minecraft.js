/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * Architectury 的 MixinMinecraft 的 @Inject（onStart/onStopping）注入点
 * （FIELD gameThread + shift AFTER）在 dev 环境无法满足，通过移除注入注解使注入失效
 * （CLIENT_STARTED/CLIENT_STOPPING 事件在 dev 环境不触发，正式环境不受影响）。
 */
function initializeCoreMod() {
    return {
        'gtgcore_disable_architectury_minecraft': {
            'target': {
                'type': 'CLASS',
                'name': 'dev.architectury.mixin.forge.MixinMinecraft'
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
