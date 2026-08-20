/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * RevelationFix（GoetyRevelation 内嵌）的 GuiGraphicsMixin 注入
 * renderTooltipInternal（1.20.2+ 方法，dev 无法满足其注入点），
 * 通过移除其注入注解使注入失效（该功能在 dev 环境不可用）。
 */
function initializeCoreMod() {
    return {
        'gtgcore_disable_revelationfix_gui_inject': {
            'target': {
                'type': 'CLASS',
                'name': 'com.mega.revelationfix.mixin.GuiGraphicsMixin'
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
                            a.desc === 'Lorg/spongepowered/asm/mixin/injection/ModifyArg;' ||
                            a.desc === 'Lorg/spongepowered/asm/mixin/injection/ModifyVariable;' ||
                            a.desc === 'Lorg/spongepowered/asm/mixin/injection/Redirect;') {
                            ann.remove(j);
                        }
                    }
                }
                return classNode;
            }
        }
    };
}
