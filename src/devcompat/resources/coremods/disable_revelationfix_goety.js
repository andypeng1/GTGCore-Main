/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * RevelationFix 的 goety.OwnedMixin 注入 mod 类（SRG 域）。dev 环境
 * remapRefMap（srg→mcp）会把 refmap 反查结果再反查回 MCP 名，在 SRG 域
 * mod 类里找不到目标（Critical injection failure on tick）；fix_injections
 * 的 SRG 名替换 + remap=false 依赖 prepare 前转换，时序不可控。
 * dev 环境直接禁用该 mixin（移除注解使其空转），正式环境不受影响。
 */
function initializeCoreMod() {
    var INJECTION_PATTERN = /org\/spongepowered\/asm\/mixin\/injection/;
    return {
        'gtgcore_disable_revelationfix_goety_owned': {
            'target': { 'type': 'CLASS', 'name': 'com/mega/revelationfix/mixin/goety/OwnedMixin' },
            'transformer': function (classNode) {
                var methods = classNode.methods;
                if (methods) {
                    for (var i = 0; i < methods.size(); i++) {
                        var m = methods.get(i);
                        var tabs = [m.visibleAnnotations, m.invisibleAnnotations];
                        for (var t = 0; t < tabs.length; t++) {
                            var list = tabs[t];
                            if (!list) { continue; }
                            for (var j = list.size() - 1; j >= 0; j--) {
                                // Preserve @Shadow; only the incompatible injection
                                // must be disabled in the development name domain.
                                if (INJECTION_PATTERN.test(list.get(j).desc) ||
                                    String(list.get(j).desc).indexOf('com/llamalad7/mixinextras/') !== -1) {
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
