/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * Architectury 的 MixinMinecraft 的 @Inject 目标 m_91374_（run）要求方法体内有
 * Minecraft.gameThread 字段访问（@At(FIELD, target="...gameThread:...Thread;", shift=AFTER)），
 * 且 mixin 注入不能进入低 priority mixin 合并的方法，因此用 CoreMod 添加真实字节码方法。
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var MethodNode = Java.type('org.objectweb.asm.tree.MethodNode');
    var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
    var FieldInsnNode = Java.type('org.objectweb.asm.tree.FieldInsnNode');
    var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');

    return {
        'gtgcore_architectury_minecraft_run': {
            'target': {
                'type': 'CLASS',
                'name': 'net.minecraft.client.Minecraft'
            },
            'transformer': function (classNode) {
                var methods = classNode.methods;
                var desc = '()V';
                for (var i = 0; i < methods.size(); i++) {
                    var m = methods.get(i);
                    if (m.name === 'm_91374_' && m.desc === desc) { return classNode; }
                }
                var method = new MethodNode(Opcodes.ACC_PUBLIC, 'm_91374_', desc, null, null);
                // this.gameThread = Thread.currentThread();（architectury @At(FIELD) 注入点要求）
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                method.instructions.add(new MethodInsnNode(Opcodes.INVOKESTATIC,
                    'java/lang/Thread', 'currentThread', '()Ljava/lang/Thread;', false));
                method.instructions.add(new FieldInsnNode(Opcodes.PUTFIELD,
                    'net/minecraft/client/Minecraft', 'gameThread', 'Ljava/lang/Thread;'));
                // this.run();
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                method.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL,
                    'net/minecraft/client/Minecraft', 'run', desc, false));
                method.instructions.add(new InsnNode(Opcodes.RETURN));
                methods.add(method);
                return classNode;
            }
        }
    };
}
