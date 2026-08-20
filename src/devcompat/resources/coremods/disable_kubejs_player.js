/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * KubeJS 的 PlayerMixin 引用 LocalPlayer 的 SRG 方法（Player 类中不存在），
 * 移除全部 mixin 注解（含 @Shadow）使 mixin 失效
 * （相关 hook 在 dev 环境不可用，正式环境不受影响）。
 */
function initializeCoreMod() {
    return {
        'gtgcore_disable_kubejs_player': {
            'target': {
                'type': 'CLASS',
                'name': 'dev.latvian.mods.kubejs.core.mixin.common.PlayerMixin'
            },
            'transformer': function (classNode) {
                var methods = classNode.methods;
                for (var i = 0; i < methods.size(); i++) {
                    var m = methods.get(i);
                    var tables = [m.visibleAnnotations, m.invisibleAnnotations];
                    for (var t = 0; t < tables.length; t++) {
                        var ann = tables[t];
                        if (ann === null) { continue; }
                        for (var j = ann.size() - 1; j >= 0; j--) {
                            var a = ann.get(j);
                            if (a.desc.indexOf('org/spongepowered/asm/mixin/') !== -1 ||
                                a.desc.indexOf('com/llamalad7/mixinextras/') !== -1) {
                                ann.remove(j);
                            }
                        }
                    }
                }
                return classNode;
            }
        }
    };
}
