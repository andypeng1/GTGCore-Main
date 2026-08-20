/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * KubeJS 的 MinecraftClientMixin 的 kjs$startAttack 注入点要求 startAttack 方法体内有
 * PackRepository.openAllSelected() 调用（新版 MC 结构，1.20.1 不存在），
 * 通过移除注入注解使注入失效（KubeJS 相关 hook 在 dev 环境不可用，正式环境不受影响）。
 */
function initializeCoreMod() {
    return {
        'gtgcore_disable_kubejs_mc_inject': {
            'target': {
                'type': 'CLASS',
                'name': 'dev.latvian.mods.kubejs.core.mixin.common.MinecraftClientMixin'
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
