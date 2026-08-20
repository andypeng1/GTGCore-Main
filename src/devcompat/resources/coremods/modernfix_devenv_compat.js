/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * ModernFix 的 devenv.MinecraftMixin 用 @Overwrite 引用 SRG 方法：
 * - m_193585_ → Minecraft.createUserApiService(YggdrasilAuthenticationService, GameConfig)
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var MethodNode = Java.type('org.objectweb.asm.tree.MethodNode');
    var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
    var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');

    return {
        'gtgcore_modernfix_devenv': {
            'target': {
                'type': 'CLASS',
                'name': 'net.minecraft.client.Minecraft'
            },
            'transformer': function (classNode) {
                var methods = classNode.methods;
                var desc = '(Lcom/mojang/authlib/yggdrasil/YggdrasilAuthenticationService;Lnet/minecraft/client/main/GameConfig;)Lcom/mojang/authlib/minecraft/UserApiService;';
                for (var i = 0; i < methods.size(); i++) {
                    var m = methods.get(i);
                    if (m.name === 'm_193585_' && m.desc === desc) { return classNode; }
                }
                var method = new MethodNode(Opcodes.ACC_PUBLIC, 'm_193585_', desc, null, null);
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 1));
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 2));
                method.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL,
                    'net/minecraft/client/Minecraft', 'createUserApiService', desc, false));
                method.instructions.add(new InsnNode(Opcodes.ARETURN));
                methods.add(method);
                return classNode;
            }
        }
    };
}
