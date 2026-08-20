/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * Oculus 的 texture.MixinAbstractTexture 引用了 dev 环境不存在的 SRG 名：
 * 1. @Shadow 字段 f_117950_（官方名 AbstractTexture.id，int）
 * 2. @Inject 目标方法 m_117963_()I（官方名 getId）
 * <p>
 * 必须用 CoreMod 在类转换阶段直接写入字节码：
 * - @Shadow 字段校验基于 ClassInfo（类加载时快照），mixin 动态添加的字段不可见
 * - mixin 注入不能进入"由其他 mixin 合并的方法"（priority 规则）
 * 真实字节码成员则两者都兼容。
 */
function initializeCoreMod() {
    return {
        'gtgcore_texture_compat': {
            'target': {
                'type': 'CLASS',
                'name': 'net.minecraft.client.renderer.texture.AbstractTexture'
            },
            'transformer': function (classNode) {
                var Opcodes = Java.type('org.objectweb.asm.Opcodes');
                var FieldNode = Java.type('org.objectweb.asm.tree.FieldNode');
                var MethodNode = Java.type('org.objectweb.asm.tree.MethodNode');
                var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
                var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
                var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');

                // 1. 补字段 f_117950_（int，对应官方字段 id）
                var fields = classNode.fields;
                var hasField = false;
                for (var i = 0; i < fields.size(); i++) {
                    if (fields.get(i).name === 'f_117950_') { hasField = true; break; }
                }
                if (!hasField) {
                    fields.add(new FieldNode(Opcodes.ACC_PUBLIC, 'f_117950_', 'I', null, null));
                }

                // 2. 补方法 m_117963_()I（对应官方方法 getId）
                //    方法体模拟新版 MC 的 getId 实现：内部调用 TextureUtil.generateTextureId() 并写入字段。
                //    Oculus 的 @Inject 注入点要求该方法调用存在且调用后至少 2 条指令
                //    （@At(INVOKE, target=generateTextureId, shift=BY, by=2)）。
                var methods = classNode.methods;
                var hasMethod = false;
                for (var j = 0; j < methods.size(); j++) {
                    if (methods.get(j).name === 'm_117963_' && methods.get(j).desc === '()I') { hasMethod = true; break; }
                }
                if (!hasMethod) {
                    var FieldInsnNode = Java.type('org.objectweb.asm.tree.FieldInsnNode');
                    var method = new MethodNode(Opcodes.ACC_PUBLIC, 'm_117963_', '()I', null, null);
                    // int id = TextureUtil.generateTextureId();
                    method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                    method.instructions.add(new MethodInsnNode(Opcodes.INVOKESTATIC,
                        'com/mojang/blaze3d/platform/TextureUtil', 'generateTextureId', '()I', false));
                    method.instructions.add(new VarInsnNode(Opcodes.ISTORE, 1));
                    // this.f_117950_ = id;
                    method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                    method.instructions.add(new VarInsnNode(Opcodes.ILOAD, 1));
                    method.instructions.add(new FieldInsnNode(Opcodes.PUTFIELD,
                        'net/minecraft/client/renderer/texture/AbstractTexture', 'f_117950_', 'I'));
                    // return id;
                    method.instructions.add(new VarInsnNode(Opcodes.ILOAD, 1));
                    method.instructions.add(new InsnNode(Opcodes.IRETURN));
                    methods.add(method);
                }
                return classNode;
            }
        }
    };
}
