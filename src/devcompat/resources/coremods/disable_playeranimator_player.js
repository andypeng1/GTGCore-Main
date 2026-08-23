/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * playerAnimator 的 PlayerEntityMixin 用 @Inject(method="tick", at=HEAD) 注入
 * Player.tick()，在 dev 环境（remapRefMap + 名字域）触发 mixin 0.8.5 内部 NPE
 * （insnNode is null）崩溃；BipedEntityModelMixin 的 @Intrinsic 方法要求
 * "interface 前缀重命名"，dev 环境 SRG 名 m_7695_ 不满足（"no rename encountered"）。
 * 移除方法级 mixin 注解使注入失效（dev 环境动画库不可用，正式环境不受影响）。
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

    function makeTransformer() {
        return function (classNode) {
            // 只移除方法级注解（保留类级 @Mixin，否则 PREPARE 报 missing @Mixin）
            var methods = classNode.methods;
            for (var i = 0; i < methods.size(); i++) {
                var m = methods.get(i);
                stripAnnotations(m.visibleAnnotations);
                stripAnnotations(m.invisibleAnnotations);
            }
            return classNode;
        };
    }

    return {
        'gtgcore_disable_playeranimator_player': {
            'target': {
                'type': 'CLASS',
                'name': 'dev.kosmx.playerAnim.mixin.PlayerEntityMixin'
            },
            'transformer': makeTransformer()
        },
        'gtgcore_disable_playeranimator_biped': {
            'target': {
                'type': 'CLASS',
                'name': 'dev.kosmx.playerAnim.mixin.BipedEntityModelMixin'
            },
            'transformer': makeTransformer()
        }
    };
}
