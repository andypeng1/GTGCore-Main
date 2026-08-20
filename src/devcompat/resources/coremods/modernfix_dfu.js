/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * ModernFix 的 dynamic_dfu.DataFixTypesMixin 的 @Inject 目标 m_264080_（update）要求方法体内有
 * DataFixer.update(DSL$TypeReference, Dynamic, int, int) 调用（@At(INVOKE) 注入点），
 * 且 mixin 注入不能进入低 priority mixin 合并的方法，因此用 CoreMod 添加真实字节码方法。
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var MethodNode = Java.type('org.objectweb.asm.tree.MethodNode');
    var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
    var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');

    return {
        'gtgcore_modernfix_dfu': {
            'target': {
                'type': 'CLASS',
                'name': 'net.minecraft.util.datafix.DataFixTypes'
            },
            'transformer': function (classNode) {
                var methods = classNode.methods;
                var desc = '(Lcom/mojang/datafixers/DataFixer;Lcom/mojang/serialization/Dynamic;II)Lcom/mojang/serialization/Dynamic;';
                for (var i = 0; i < methods.size(); i++) {
                    var m = methods.get(i);
                    if (m.name === 'm_264080_' && m.desc === desc) { return classNode; }
                }
                var method = new MethodNode(Opcodes.ACC_PUBLIC, 'm_264080_', desc, null, null);
                // fixer.update(null, dynamic, versionKey, dataVersion);（ModernFix @At(INVOKE) 注入点要求）
                method.instructions.add(new InsnNode(Opcodes.ACONST_NULL));
                method.instructions.add(new InsnNode(Opcodes.ACONST_NULL));
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 2));
                method.instructions.add(new VarInsnNode(Opcodes.ILOAD, 3));
                method.instructions.add(new VarInsnNode(Opcodes.ILOAD, 4));
                method.instructions.add(new MethodInsnNode(Opcodes.INVOKEINTERFACE,
                    'com/mojang/datafixers/DataFixer', 'update',
                    '(Lcom/mojang/datafixers/DSL$TypeReference;Lcom/mojang/serialization/Dynamic;II)Lcom/mojang/serialization/Dynamic;', true));
                method.instructions.add(new InsnNode(Opcodes.POP));
                // return this.update(fixer, dynamic, versionKey, dataVersion);
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 1));
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 2));
                method.instructions.add(new VarInsnNode(Opcodes.ILOAD, 3));
                method.instructions.add(new VarInsnNode(Opcodes.ILOAD, 4));
                method.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL,
                    'net/minecraft/util/datafix/DataFixTypes', 'update', desc, false));
                method.instructions.add(new InsnNode(Opcodes.ARETURN));
                methods.add(method);
                return classNode;
            }
        }
    };
}
