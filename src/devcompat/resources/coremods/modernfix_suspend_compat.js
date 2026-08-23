/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * ModernFix 的 suspend_integrated_server_during_load.MinecraftMixin 的 @Inject 目标
 * m_261031_（doWorldLoad）要求方法体内有 Thread.yield() 调用
 * （@At(INVOKE, target="Ljava/lang/Thread;yield()V")），且 mixin 注入不能进入
 * 低 priority mixin 合并的方法，因此用 CoreMod 添加真实字节码方法。
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var MethodNode = Java.type('org.objectweb.asm.tree.MethodNode');
    var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
    var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');

    return {
        'gtgcore_modernfix_suspend_compat': {
            'target': {
                'type': 'CLASS',
                'name': 'net.minecraft.client.Minecraft'
            },
            'transformer': function (classNode) {
                var methods = classNode.methods;
                var desc = '(Ljava/lang/String;Lnet/minecraft/world/level/storage/LevelStorageSource$LevelStorageAccess;Lnet/minecraft/server/packs/repository/PackRepository;Lnet/minecraft/server/WorldStem;Z)V';
                for (var i = 0; i < methods.size(); i++) {
                    var m = methods.get(i);
                    if (m.name === 'm_261031_' && m.desc === desc) { return classNode; }
                }
                var method = new MethodNode(Opcodes.ACC_PUBLIC, 'm_261031_', desc, null, null);
                // Thread.yield();（注入点要求）
                method.instructions.add(new MethodInsnNode(Opcodes.INVOKESTATIC, 'java/lang/Thread', 'yield', '()V', false));
                // this.doWorldLoad(levelName, access, packRepository, worldStem, b);
                // 注意：参数 5 是 boolean，必须 ILOAD；其余是引用用 ALOAD
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 1));
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 2));
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 3));
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 4));
                method.instructions.add(new VarInsnNode(Opcodes.ILOAD, 5));
                method.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL,
                    'net/minecraft/client/Minecraft', 'doWorldLoad', desc, false));
                method.instructions.add(new InsnNode(Opcodes.RETURN));
                methods.add(method);
                return classNode;
            }
        }
    };
}
