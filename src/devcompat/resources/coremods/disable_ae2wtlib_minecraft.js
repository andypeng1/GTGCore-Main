/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * ae2wtlib 的 MinecraftMixin 的 @Inject 目标 m_91280_（pickBlock）要求方法体内有
 * Inventory.findSlotMatchingItem 调用 + LocalCapture 局部变量捕获
 * （1.20.1 的 pickBlock 结构无法由补丁方法模拟），通过移除其注入注解使注入失效
 * （该功能在 dev 环境不可用，正式环境不受影响）。
 */
function initializeCoreMod() {
    return {
        'gtgcore_disable_ae2wtlib_minecraft_inject': {
            'target': {
                'type': 'CLASS',
                'name': 'de.mari_023.ae2wtlib.mixin.MinecraftMixin'
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
                            a.desc === 'Lorg/spongepowered/asm/mixin/injection/Redirect;' ||
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
