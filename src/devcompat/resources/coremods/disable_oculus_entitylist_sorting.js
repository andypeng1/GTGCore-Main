/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * oculus 的 MixinLevelRenderer_EntityListSorting 用 @ModifyVariable 注入
 * renderLevel（slice: bufferSource → shouldRender 之间找 Iterable.iterator()）。
 * 当 fix_levelrenderer_embeddium 修改 renderLevel 的调用名（renderChunkLayer →
 * m_172993_ / setupRender → m_194338_）后，该 @ModifyVariable 的 apply 阶段
 * 隐式变量分析（findImplicitLocal）确定性失败（InvalidImplicitDiscriminatorException:
 * Found 0 candidate variables）→ 游戏启动崩溃。EntityListSorting 只是 oculus
 * 实体渲染的排序优化（dev 环境禁用无碍），移除其注入注解使其空转。
 */
function initializeCoreMod() {
    var INJECTION_PATTERN = /org\/spongepowered\/asm\/mixin\/injection/;
    return {
        'gtgcore_disable_oculus_entitylist_sorting': {
            'target': {
                'type': 'CLASS',
                'name': 'net/irisshaders/batchedentityrendering/mixin/MixinLevelRenderer_EntityListSorting'
            },
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
