/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * Goety 的 MinecraftMixin 用 @Shadow 引用 Minecraft 的 SRG 成员（refmap 无条目）：
 * - f_91073_ → level（ClientLevel 字段）
 * - f_91074_ → player（LocalPlayer 字段）
 * - f_91077_ → hitResult（HitResult 字段）
 * - m_91087_ → getInstance()（静态方法）
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var FieldNode = Java.type('org.objectweb.asm.tree.FieldNode');
    var MethodNode = Java.type('org.objectweb.asm.tree.MethodNode');
    var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
    var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');

    return {
        'gtgcore_minecraft_goety_compat': {
            'target': {
                'type': 'CLASS',
                'name': 'net.minecraft.client.Minecraft'
            },
            'transformer': function (classNode) {
                var fields = classNode.fields;
                function addField(name, desc) {
                    for (var i = 0; i < fields.size(); i++) {
                        if (fields.get(i).name === name) { return; }
                    }
                    fields.add(new FieldNode(Opcodes.ACC_PUBLIC, name, desc, null, null));
                }
                addField('f_91073_', 'Lnet/minecraft/client/multiplayer/ClientLevel;');
                addField('f_91074_', 'Lnet/minecraft/client/player/LocalPlayer;');
                addField('f_91077_', 'Lnet/minecraft/world/phys/HitResult;');
                // Botania MinecraftAccessor 的 @Accessor 字段 f_91041_ → itemColors
                addField('f_91041_', 'Lnet/minecraft/client/color/item/ItemColors;');
                // EndingLibrary AccessorMC 的 @Accessor 字段 f_91045_ → fontManager
                addField('f_91045_', 'Lnet/minecraft/client/gui/font/FontManager;');
                // Embeddium MinecraftAccessor 的 @Accessor 字段 f_91018_ → gameThread
                addField('f_91018_', 'Ljava/lang/Thread;');

                var methods = classNode.methods;
                var exists = false;
                for (var j = 0; j < methods.size(); j++) {
                    var m = methods.get(j);
                    if (m.name === 'm_91087_' && m.desc === '()Lnet/minecraft/client/Minecraft;') { exists = true; break; }
                }
                if (!exists) {
                    // public static Minecraft m_91087_() { return Minecraft.getInstance(); }
                    var method = new MethodNode(Opcodes.ACC_PUBLIC + Opcodes.ACC_STATIC, 'm_91087_',
                        '()Lnet/minecraft/client/Minecraft;', null, null);
                    method.instructions.add(new MethodInsnNode(Opcodes.INVOKESTATIC,
                        'net/minecraft/client/Minecraft', 'getInstance', '()Lnet/minecraft/client/Minecraft;', false));
                    method.instructions.add(new InsnNode(Opcodes.ARETURN));
                    methods.add(method);
                }
                return classNode;
            }
        }
    };
}
