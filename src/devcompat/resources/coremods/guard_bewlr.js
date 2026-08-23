/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * BlockEntityWithoutLevelRenderer.onResourceManagerReload 直接 getfield
 * entityModelSet 调 bakeLayer——dev 环境下某些 BEWLR 实例（mod 创建的）构造时
 * entityModelSet 为 null（SRG 域构造参数链路未生效）→ NPE → 资源包重载失败。
 * 在方法开头插入 null 检查：entityModelSet 为 null 时跳过（dev 环境防御，
 * 正式环境 SRG 域构造链路正常，不受影响）。
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var LabelNode = Java.type('org.objectweb.asm.tree.LabelNode');
    var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
    var FieldInsnNode = Java.type('org.objectweb.asm.tree.FieldInsnNode');
    var JumpInsnNode = Java.type('org.objectweb.asm.tree.JumpInsnNode');
    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');
    return {
        'gtgcore_guard_bewlr': {
            'target': { 'type': 'CLASS', 'name': 'net/minecraft/client/renderer/BlockEntityWithoutLevelRenderer' },
            'transformer': function (classNode) {
                var methods = classNode.methods;
                var desc = '(Lnet/minecraft/server/packs/resources/ResourceManager;)V';
                for (var i = 0; i < methods.size(); i++) {
                    var m = methods.get(i);
                    if (m.name === 'onResourceManagerReload' && m.desc === desc) {
                        var insns = m.instructions;
                        var skip = new LabelNode();
                        insns.insertBefore(insns.getFirst(), new VarInsnNode(Opcodes.ALOAD, 0));
                        insns.insertBefore(insns.getFirst(), new FieldInsnNode(Opcodes.GETFIELD,
                            'net/minecraft/client/renderer/BlockEntityWithoutLevelRenderer',
                            'entityModelSet', 'Lnet/minecraft/client/model/geom/EntityModelSet;'));
                        insns.insertBefore(insns.getFirst(), new JumpInsnNode(Opcodes.IFNONNULL, skip));
                        insns.insertBefore(insns.getFirst(), new InsnNode(Opcodes.RETURN));
                        insns.insertBefore(insns.getFirst(), skip);
                        break;
                    }
                }
                return classNode;
            }
        }
    };
}
