/**
 * The dev SRG bridge for Mob.finalizeSpawn is m_6518_. ForgeEventFactory's
 * MCP call must remain finalizeSpawn; rewriting it to the bridge calls back
 * into ForgeEventFactory and overflows the stack.
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');

    return {
        'gtgcore_fix_finalize_spawn_recursion': {
            'target': {
                'type': 'CLASS',
                'name': 'net.minecraftforge.event.ForgeEventFactory'
            },
            'transformer': function (classNode) {
                var methods = classNode.methods;
                for (var i = 0; i < methods.size(); i++) {
                    var method = methods.get(i);
                    for (var j = 0; j < method.instructions.size(); j++) {
                        var insn = method.instructions.get(j);
                        if ((insn.getOpcode() === Opcodes.INVOKEVIRTUAL || insn.getOpcode() === Opcodes.INVOKESTATIC)
                            && insn.owner === 'net/minecraft/world/entity/Mob'
                            && insn.name === 'm_6518_'
                            && insn.desc === '(Lnet/minecraft/world/level/ServerLevelAccessor;Lnet/minecraft/world/DifficultyInstance;Lnet/minecraft/world/entity/MobSpawnType;Lnet/minecraft/world/entity/SpawnGroupData;Lnet/minecraft/nbt/CompoundTag;)Lnet/minecraft/world/entity/SpawnGroupData;') {
                            insn.name = 'finalizeSpawn';
                        }
                    }
                }
                return classNode;
            }
        }
    };
}
