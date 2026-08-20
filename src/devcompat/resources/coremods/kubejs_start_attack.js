/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * KubeJS 的 MinecraftClientMixin 的 @Inject 目标 m_202354_（startAttack）要求方法体内有
 * PackRepository.openAllSelected() 调用（@At(INVOKE, target="...PackRepository;openAllSelected()...")），
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
        'gtgcore_kubejs_start_attack': {
            'target': {
                'type': 'CLASS',
                'name': 'net.minecraft.client.Minecraft'
            },
            'transformer': function (classNode) {
                var methods = classNode.methods;
                var desc = '()Z';
                for (var i = 0; i < methods.size(); i++) {
                    var m = methods.get(i);
                    if (m.name === 'm_202354_' && m.desc === desc) { return classNode; }
                }
                var method = new MethodNode(Opcodes.ACC_PUBLIC, 'm_202354_', desc, null, null);
                // this.resourcePackRepository.openAllSelected();（@At(INVOKE) 注入点要求）
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                method.instructions.add(new FieldInsnNode(Opcodes.GETFIELD,
                    'net/minecraft/client/Minecraft', 'resourcePackRepository',
                    'Lnet/minecraft/server/packs/repository/PackRepository;'));
                method.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL,
                    'net/minecraft/server/packs/repository/PackRepository', 'openAllSelected',
                    '()Ljava/util/List;', false));
                method.instructions.add(new InsnNode(Opcodes.POP));
                // return this.startAttack();
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                method.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL,
                    'net/minecraft/client/Minecraft', 'startAttack', desc, false));
                method.instructions.add(new InsnNode(Opcodes.IRETURN));
                methods.add(method);
                return classNode;
            }
        }
    };
}
