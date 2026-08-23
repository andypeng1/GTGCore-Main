/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * KubeJS 与 ModernFix 的 @Inject 目标 m_168019_（reloadResourcePacks(boolean)）要求方法体内有
 * getResourceReloadExecutor() 调用（ModernFix 的 @At(INVOKE) 注入点），
 * 且 mixin 注入不能进入低 priority mixin 合并的方法，因此用 CoreMod 添加真实字节码方法。
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var MethodNode = Java.type('org.objectweb.asm.tree.MethodNode');
    var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
    var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
    var FieldInsnNode = Java.type('org.objectweb.asm.tree.FieldInsnNode');
    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');

    return {
        'gtgcore_reload_resource_packs': {
            'target': {
                'type': 'CLASS',
                'name': 'net.minecraft.client.Minecraft'
            },
            'transformer': function (classNode) {
                var methods = classNode.methods;
                var desc = '(Z)Ljava/util/concurrent/CompletableFuture;';
                for (var i = 0; i < methods.size(); i++) {
                    var m = methods.get(i);
                    if (m.name === 'm_168019_' && m.desc === desc) { return classNode; }
                }
                var method = new MethodNode(Opcodes.ACC_PUBLIC, 'm_168019_', desc, null, null);
                // this.getResourceReloadExecutor();（ModernFix @At(INVOKE) 注入点要求）
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                method.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL,
                    'net/minecraft/client/Minecraft', 'getResourceReloadExecutor', '()Ljava/util/concurrent/Executor;', false));
                method.instructions.add(new InsnNode(Opcodes.POP));
                // this.resourcePackRepository.openAllSelected();（KubeJS @ModifyExpressionValue 注入点要求）
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                method.instructions.add(new FieldInsnNode(Opcodes.GETFIELD,
                    'net/minecraft/client/Minecraft', 'resourcePackRepository',
                    'Lnet/minecraft/server/packs/repository/PackRepository;'));
                method.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL,
                    'net/minecraft/server/packs/repository/PackRepository', 'openAllSelected', '()Ljava/util/List;', false));
                method.instructions.add(new InsnNode(Opcodes.POP));
                // return this.reloadResourcePacks(b);
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                method.instructions.add(new VarInsnNode(Opcodes.ILOAD, 1));
                method.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL,
                    'net/minecraft/client/Minecraft', 'reloadResourcePacks', desc, false));
                method.instructions.add(new InsnNode(Opcodes.ARETURN));
                methods.add(method);
                return classNode;
            }
        }
    };
}
