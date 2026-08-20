/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * KubeJS 2001.6.5-build.16+ 的 MinecraftClientMixin 包含按新版 MC 结构编写的
 * 注入点（openAllSelected 等），在 1.20.1 dev 环境无法满足。
 * 移除该 mixin 类所有方法上的全部 mixin 注入注解（visible + invisible），
 * 使注入失效（KubeJS 相关 hook 在 dev 环境不可用，正式环境不受影响）。
 */
function initializeCoreMod() {
    return {
        'gtgcore_disable_kubejs_mc_all': {
            'target': {
                'type': 'CLASS',
                'name': 'dev.latvian.mods.kubejs.core.mixin.common.MinecraftClientMixin'
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
                            if (a.desc.indexOf('org/spongepowered/asm/mixin/injection/') !== -1 ||
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
