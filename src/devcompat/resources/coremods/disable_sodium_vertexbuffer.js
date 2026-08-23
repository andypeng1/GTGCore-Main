/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * sodium（embeddium）的 VertexBufferMixin.setSamplersManually（@ModifyExpressionValue
 * 注入 _drawWithShader）在 dev 环境（MCP 域）handler 参数解析错位——shader 参数
 * 拿到 null → ShaderInstance.m_173350_ NPE → 渲染崩溃。strip 方法级注解使
 * mixin 空转（dev 环境禁用该优化，正式环境不受影响）。
 */
function initializeCoreMod() {
    var ANN_PATTERN = /org\/spongepowered\/asm\/mixin|com\/llamalad7\/mixinextras/;
    return {
        'gtgcore_disable_sodium_vertexbuffer': {
            'target': { 'type': 'CLASS', 'name': 'me/jellysquid/mods/sodium/mixin/features/render/immediate/buffer_builder/VertexBufferMixin' },
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
                                if (ANN_PATTERN.test(list.get(j).desc)) { list.remove(j); }
                            }
                        }
                    }
                }
                return classNode;
            }
        }
    };
}
