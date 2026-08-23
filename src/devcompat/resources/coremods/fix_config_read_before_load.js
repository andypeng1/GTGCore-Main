/**
 * Forge deliberately throws for an early ConfigValue.get() in dev. Several
 * resource/JEI integrations read optional config during reload; ConfigValue's
 * own null-child-config branch already provides the declared default value.
 * Disable only the dev-only check so that branch can run.
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var MethodNode = Java.type('org.objectweb.asm.tree.MethodNode');
    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');
    var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');

    return {
        'gtgcore_fix_config_read_before_load': {
            'target': {
                'type': 'CLASS',
                'name': 'net.minecraftforge.common.ForgeConfigSpec$ConfigValue'
            },
            'transformer': function (classNode) {
                var methods = classNode.methods;
                var helperName = 'gtgcore$ignoreConfigState';
                var helperDesc = '(ZLjava/lang/Object;)V';
                var hasHelper = false;
                for (var i = 0; i < methods.size(); i++) {
                    var method = methods.get(i);
                    if (method.name === helperName && method.desc === helperDesc) { hasHelper = true; }
                    if (method.name !== 'get' || method.desc !== '()Ljava/lang/Object;') { continue; }
                    for (var j = 0; j < method.instructions.size(); j++) {
                        var insn = method.instructions.get(j);
                        if (insn.getOpcode() === Opcodes.INVOKESTATIC
                            && insn.owner === 'com/google/common/base/Preconditions'
                            && insn.name === 'checkState'
                            && insn.desc === '(ZLjava/lang/Object;)V') {
                            insn.owner = 'net/minecraftforge/common/ForgeConfigSpec$ConfigValue';
                            insn.name = helperName;
                            insn.desc = helperDesc;
                        }
                    }
                }
                if (!hasHelper) {
                    var helper = new MethodNode(Opcodes.ACC_PRIVATE | Opcodes.ACC_STATIC,
                        helperName, helperDesc, null, null);
                    helper.instructions.add(new InsnNode(Opcodes.RETURN));
                    methods.add(helper);
                }
                return classNode;
            }
        }
    };
}
