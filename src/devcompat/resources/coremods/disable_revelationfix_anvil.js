/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * revelationfix 的 AnvilMenuMixin 与 ae2 的 AnvilMenuMixin 冲突：revelationfix
 * 先 merge 了 createResult()，ae2 的 @At("INVOKE") 无法注入到已被合并的方法
 * （InvalidInjectionException: cannot inject into ... merged by ...）。
 * dev 环境禁用 revelationfix 的该 mixin（保留 ae2 的注入；正式环境不受影响）。
 */
function initializeCoreMod() {
    return {
        'gtgcore_disable_revelationfix_anvil': {
            'target': {
                'type': 'CLASS',
                'name': 'com.mega.revelationfix.mixin.AnvilMenuMixin'
            },
            'transformer': function (classNode) {
                // 只移除方法级注解（保留类级 @Mixin，否则 PREPARE 报 missing @Mixin）
                var methods = classNode.methods;
                var removed = 0;
                for (var i = 0; i < methods.size(); i++) {
                    var m = methods.get(i);
                    var tabs = [m.visibleAnnotations, m.invisibleAnnotations];
                    for (var t = 0; t < tabs.length; t++) {
                        var list = tabs[t];
                        if (!list) { continue; }
                        for (var j = list.size() - 1; j >= 0; j--) {
                            var a = list.get(j);
                            if (a.desc.indexOf('org/spongepowered/asm/mixin/') !== -1 ||
                                a.desc.indexOf('com/llamalad7/mixinextras/') !== -1) {
                                list.remove(j);
                                removed++;
                            }
                        }
                    }
                }
                print('[ANVIL-DBG] stripped ' + removed + ' annotations from AnvilMenuMixin');
                return classNode;
            }
        }
    };
}
