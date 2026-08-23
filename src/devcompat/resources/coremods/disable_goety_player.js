/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * Goety 的 PlayerMixin 用 @Inject(method="interactOn(desc)", at=HEAD) 注入
 * Player.interactOn。该 mixin 的 refmap 反查后 selector 保持 SRG 名
 * （m_36157_），在 dev 环境（MCP 域类）匹配不到目标 → Critical injection failure
 * 崩溃。移除方法级 mixin 注解使注入失效（dev 环境功能不可用，正式环境不受影响）。
 */
function initializeCoreMod() {
    function stripAnnotations(ann) {
        if (ann === null) { return; }
        for (var j = ann.size() - 1; j >= 0; j--) {
            var a = ann.get(j);
            if (a.desc.indexOf('org/spongepowered/asm/mixin/') !== -1 ||
                a.desc.indexOf('com/llamalad7/mixinextras/') !== -1) {
                ann.remove(j);
            }
        }
    }

    return {
        'gtgcore_disable_goety_player': {
            'target': {
                'type': 'CLASS',
                'name': 'com.Polarice3.Goety.mixin.PlayerMixin'
            },
            'transformer': function (classNode) {
                // 只移除方法级注解（保留类级 @Mixin，否则 PREPARE 报 missing @Mixin）
                var methods = classNode.methods;
                for (var i = 0; i < methods.size(); i++) {
                    var m = methods.get(i);
                    stripAnnotations(m.visibleAnnotations);
                    stripAnnotations(m.invisibleAnnotations);
                }
                return classNode;
            }
        }
    };
}
