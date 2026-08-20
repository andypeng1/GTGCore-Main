/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * EndingLibrary 的 advanced.client.custom_style 系列 mixin（自定义 tooltip/样式）
 * 依赖新版 MC 的渲染与样式实现，在 1.20.1 dev 环境无法满足，
 * 通过移除注入注解使注入失效（该功能在 dev 环境不可用，正式环境不受影响）。
 */
function initializeCoreMod() {
    return {
        'gtgcore_disable_endinglib_gui': {
            'target': {
                'type': 'CLASS',
                'name': 'com.mega.endinglib.mixin.advanced.client.custom_style.GuiGraphicsMixin'
            },
            'transformer': function (classNode) {
                return removeInjects(classNode);
            }
        },
        'gtgcore_disable_endinglib_style': {
            'target': {
                'type': 'CLASS',
                'name': 'com.mega.endinglib.mixin.advanced.client.custom_style.StyleMixin'
            },
            'transformer': function (classNode) {
                return removeInjects(classNode);
            }
        }
    };

    function removeInjects(classNode) {
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
