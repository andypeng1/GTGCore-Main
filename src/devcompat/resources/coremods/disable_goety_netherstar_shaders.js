/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * GoetyRevelation 的 NetherStar shader 特效：NetherStarShaderInstance.getUniform
 * 把 ShaderInstance.findUniform 的结果强转 ATAUniform。dev 环境（MCP 域）下
 * ATAUniform 的注册链路（SRG 域构造/替换）未生效，findUniform 返回普通 Uniform
 * → ClassCastException → shader 资源重载失败 → 资源包全被移除（字体/纹理白块）。
 * <p>
 * 不能只 strip @SubscribeEvent：Forge 的 AutomaticEventSubscriber 在转换之前
 * 已扫描并订阅事件（Auto-subscribing 先于 Transforming）。改为重写所有事件
 * handler 方法体为空（事件已注册但空转），shader 特效在 dev 环境完全禁用，
 * 正式环境不受影响。
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');
    return {
        'gtgcore_disable_goety_netherstar_shaders': {
            'target': { 'type': 'CLASS', 'name': 'z1gned/goetyrevelation/client/event/NetherStarShaders' },
            'transformer': function (classNode) {
                var methods = classNode.methods;
                if (methods) {
                    for (var i = 0; i < methods.size(); i++) {
                        var m = methods.get(i);
                        if (m.name === '<init>' || m.name === '<clinit>') { continue; }
                        var isEventHandler = false;
                        var tabs = [m.visibleAnnotations, m.invisibleAnnotations];
                        for (var t = 0; t < tabs.length; t++) {
                            var list = tabs[t];
                            if (!list) { continue; }
                            for (var j = 0; j < list.size(); j++) {
                                var d = list.get(j).desc;
                                if (d.indexOf('net/minecraftforge/eventbus/api/SubscribeEvent') >= 0) {
                                    isEventHandler = true;
                                    break;
                                }
                            }
                            if (isEventHandler) { break; }
                        }
                        if (!isEventHandler) {
                            // onRegisterShaders 没有方法级 @SubscribeEvent（类级注解 +
                            // 内部注册 RegisterShadersEvent 监听）——按方法名兜底清空
                            if (m.name !== 'onRegisterShaders') { continue; }
                        }
                        print('[NSS-DBG] clearing handler ' + m.name + m.desc);
                        // 事件 handler 空转（清空方法体）
                        m.instructions.clear();
                        var rt = m.desc.substring(m.desc.indexOf(')') + 1);
                        if (rt === 'V') {
                            m.instructions.add(new InsnNode(Opcodes.RETURN));
                        } else {
                            m.instructions.add(new InsnNode(Opcodes.ACONST_NULL));
                            m.instructions.add(new InsnNode(Opcodes.ARETURN));
                        }
                    }
                }
                return classNode;
            }
        }
    };
}
