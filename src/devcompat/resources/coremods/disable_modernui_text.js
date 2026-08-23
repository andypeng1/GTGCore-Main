/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * ModernUI text 包的 MixinGameRenderer @Inject(preloadUiShader) 调
 * TextRenderType.preloadShaders() → obtainResourceProvider() 的 lambda 实现
 * Minecraft ResourceProvider（SRG 域编译，lambda 合成类方法名与 dev MCP 域
 * 接口不匹配 → 接口 default 兜底返回 null → NPE）。dev 环境禁用该注入
 * （ModernUI 文本渲染在 dev 不可用，正式环境不受影响）。
 */
function initializeCoreMod() {
    return {
        'gtgcore_disable_modernui_text': {
            'target': {
                'type': 'CLASS',
                'name': 'icyllis.modernui.mc.text.mixin.MixinGameRenderer'
            },
            'transformer': function (classNode) {
                // 只移除方法级注解（保留类级 @Mixin，否则 PREPARE 报 missing @Mixin）
                var methods = classNode.methods;
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
                            }
                        }
                    }
                }
                return classNode;
            }
        }
    };
}
