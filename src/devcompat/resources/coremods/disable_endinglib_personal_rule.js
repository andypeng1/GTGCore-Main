/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * EndingLibrary personal_rule.PlayerMixin 的 @Inject(method="tick") 在 dev 环境
 * 经 remapRefMap 反查后与类名字域错位，mixin 0.8.5 内部 NPE（insnNode is null）
 * 崩溃。移除全部 mixin 注解使 mixin 失效（相关功能 dev 环境不可用，正式环境不受影响）。
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');

    function stripInjectionAnnotations(ann) {
        if (ann === null) { return; }
        for (var j = ann.size() - 1; j >= 0; j--) {
            var a = ann.get(j);
            // Keep @Shadow declarations intact. Removing them turns abstract
            // declarations into merged methods and can replace target methods.
            if (a.desc.indexOf('org/spongepowered/asm/mixin/injection/') !== -1 ||
                a.desc.indexOf('com/llamalad7/mixinextras/') !== -1) {
                ann.remove(j);
            }
        }
    }

    return {
        'gtgcore_disable_endinglib_personal_rule': {
            'target': {
                'type': 'CLASS',
                // CoreMod class targets use JVM internal names, not Java source names.
                'name': 'com/mega/endinglib/mixin/personal_rule/PlayerMixin'
            },
            'transformer': function (classNode) {
                // 只移除方法级注解（保留类级 @Mixin，否则 mixin 配置显式声明的类会
                // 在 PREPARE 阶段报 "missing an @Mixin annotation"）
                var methods = classNode.methods;
                for (var i = 0; i < methods.size(); i++) {
                    var m = methods.get(i);
                    stripInjectionAnnotations(m.visibleAnnotations);
                    stripInjectionAnnotations(m.invisibleAnnotations);
                    // The dev mappings expose the shadow target as public. Keep the
                    // mixin declaration compatible even if another transformer leaves
                    // its method annotation in place.
                    if (m.name === 'm_36218_') {
                        m.access = (m.access & ~(Opcodes.ACC_PRIVATE | Opcodes.ACC_PROTECTED)) | Opcodes.ACC_PUBLIC;
                    }
                }
                return classNode;
            }
        }
    };
}
