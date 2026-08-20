/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * EndingLibrary 的 MinecraftMixin 的 @WrapOperation（avoidNprPlayerUsing）注入点
 * 要求 handleKeybinds 方法体内有 LocalPlayer.isUsingItem() 调用（新版 MC 结构，
 * 1.20.1 不存在），通过移除注入注解使注入失效
 * （相关 hook 在 dev 环境不可用，正式环境不受影响）。
 */
function initializeCoreMod() {
    return {
        'gtgcore_disable_endinglib_mc_inject': {
            'target': {
                'type': 'CLASS',
                'name': 'com.mega.endinglib.mixin.MinecraftMixin'
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
