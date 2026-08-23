/**
 * Adds the SRG alias used by modded Goal subclasses in the official-mapped
 * development runtime. The bridge lives on Goal so every subclass inherits it.
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var MethodNode = Java.type('org.objectweb.asm.tree.MethodNode');
    var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
    var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');

    return {
        'gtgcore_goal_compat': {
            'target': {
                'type': 'CLASS',
                'name': 'net.minecraft.world.entity.ai.goal.Goal'
            },
            'transformer': function (classNode) {
                var methods = classNode.methods;
                for (var i = 0; i < methods.size(); i++) {
                    var existing = methods.get(i);
                    if (existing.name === 'm_7021_' && existing.desc === '(Ljava/util/EnumSet;)V') {
                        return classNode;
                    }
                }
                var bridge = new MethodNode(Opcodes.ACC_PUBLIC, 'm_7021_', '(Ljava/util/EnumSet;)V', null, null);
                bridge.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                bridge.instructions.add(new VarInsnNode(Opcodes.ALOAD, 1));
                bridge.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL,
                    'net/minecraft/world/entity/ai/goal/Goal', 'setFlags', '(Ljava/util/EnumSet;)V', false));
                bridge.instructions.add(new InsnNode(Opcodes.RETURN));
                methods.add(bridge);
                return classNode;
            }
        }
    };
}
