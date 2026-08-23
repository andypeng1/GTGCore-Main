/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * 发布版 mod（SRG 域）的 lambda 实现原版接口（MCP 域）时，lambda 合成类
 * （运行时由 LambdaMetafactory 生成，CoreMod 转换不到）只实现 SRG 名方法，
 * 与 MCP 域接口方法不匹配 → AbstractMethodError（如 PatternBetter 的
 * MyPack$$Lambda 实现 RepositorySource.loadPacks）。
 * 把这类接口方法改成 default 空实现：lambda 类继承 default 不崩
 * （功能失效可接受，正式环境不受影响——该 jar 仅 dev 存在）。
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');

    function defaultify(classNode, name, desc) {
        var methods = classNode.methods;
        for (var i = 0; i < methods.size(); i++) {
            var m = methods.get(i);
            if (m.name === name && m.desc === desc && (m.access & Opcodes.ACC_ABSTRACT) !== 0) {
                m.access = m.access & ~Opcodes.ACC_ABSTRACT;
                m.instructions.clear();
                m.instructions.add(new InsnNode(Opcodes.RETURN));
                return true;
            }
        }
        return false;
    }

    return {
        'gtgcore_fix_repository_source': {
            'target': { 'type': 'CLASS', 'name': 'net/minecraft/server/packs/repository/RepositorySource' },
            'transformer': function (classNode) {
                defaultify(classNode, 'loadPacks', '(Ljava/util/function/Consumer;)V');
                return classNode;
            }
        }
    };
}
