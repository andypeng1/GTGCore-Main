/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * Jade 的 JadeClient.onGui（主菜单 + isDevEnv 时）断言所有插件配置项都有翻译：
 * "Missing config translation: config.jade.plugin_pipez.pipe"——jade 的 lang 文件
 * 缺少 pipez 插件配置翻译（正式环境 isDevEnv=false 不检查）。把
 * CommonProxy.isDevEnv() 调用替换为 false，跳过该检查（dev 环境，正式环境
 * 不受影响）。
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');
    return {
        'gtgcore_disable_jade_translation_check': {
            'target': { 'type': 'CLASS', 'name': 'snownee/jade/JadeClient' },
            'transformer': function (classNode) {
                var methods = classNode.methods;
                for (var i = 0; i < methods.size(); i++) {
                    var m = methods.get(i);
                    if (m.name !== 'onGui') { continue; }
                    var insns = m.instructions;
                    for (var j = 0; j < insns.size(); j++) {
                        var insn = insns.get(j);
                        if (insn.getOpcode() === Opcodes.INVOKESTATIC
                            && insn.owner === 'snownee/jade/util/CommonProxy'
                            && insn.name === 'isDevEnv' && insn.desc === '()Z') {
                            insns.set(insn, new InsnNode(Opcodes.ICONST_0));
                        }
                    }
                }
                return classNode;
            }
        }
    };
}
