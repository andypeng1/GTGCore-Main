/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * EndingLibrary 的 personal_rule.PlayerMixin 用 @Shadow 引用 SRG 方法 m_36218_
 * （官方名 Player.decorateDisplayNameComponent(MutableComponent)），refmap 无条目且
 * @Shadow 基于 ClassInfo，只能走 CoreMod 补方法（委托官方实现）。
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var MethodNode = Java.type('org.objectweb.asm.tree.MethodNode');
    var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
    var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');

    return {
        'gtgcore_endinglib_player': {
            'target': {
                'type': 'CLASS',
                'name': 'net.minecraft.world.entity.player.Player'
            },
            'transformer': function (classNode) {
                var methods = classNode.methods;
                var desc = '(Lnet/minecraft/network/chat/MutableComponent;)Lnet/minecraft/network/chat/MutableComponent;';
                for (var i = 0; i < methods.size(); i++) {
                    var m = methods.get(i);
                    if (m.name === 'm_36218_' && m.desc === desc) { return classNode; }
                }
                var method = new MethodNode(Opcodes.ACC_PUBLIC, 'm_36218_', desc, null, null);
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 1));
                method.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL,
                    'net/minecraft/world/entity/player/Player', 'decorateDisplayNameComponent', desc, false));
                method.instructions.add(new InsnNode(Opcodes.ARETURN));
                methods.add(method);

                // Botania PlayerMixin 的 @Shadow 目标 m_36222_ → awardStat(ResourceLocation, int)
                var desc2 = '(Lnet/minecraft/resources/ResourceLocation;I)V';
                var has2 = false;
                for (var k = 0; k < methods.size(); k++) {
                    var mk = methods.get(k);
                    if (mk.name === 'm_36222_' && mk.desc === desc2) { has2 = true; break; }
                }
                if (!has2) {
                    var method2 = new MethodNode(Opcodes.ACC_PUBLIC, 'm_36222_', desc2, null, null);
                    method2.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                    method2.instructions.add(new VarInsnNode(Opcodes.ALOAD, 1));
                    method2.instructions.add(new VarInsnNode(Opcodes.ILOAD, 2));
                    method2.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL,
                        'net/minecraft/world/entity/player/Player', 'awardStat', desc2, false));
                    method2.instructions.add(new InsnNode(Opcodes.RETURN));
                    methods.add(method2);
                }

                // ae2lt PlayerPhaseFlightMixin 的 @Shadow 字段 f_36077_ → abilities
                var FieldNode = Java.type('org.objectweb.asm.tree.FieldNode');
                var fields = classNode.fields;
                var hasField = false;
                for (var q = 0; q < fields.size(); q++) {
                    if (fields.get(q).name === 'f_36077_') { hasField = true; break; }
                }
                if (!hasField) {
                    fields.add(new FieldNode(Opcodes.ACC_PUBLIC, 'f_36077_',
                        'Lnet/minecraft/world/entity/player/Abilities;', null, null));
                }

                // EndingLibrary data_expand PlayerMixin 的 @Shadow 目标 m_36403_ → getAttackStrengthScale(float)
                var desc3 = '(F)F';
                var has3 = false;
                for (var r = 0; r < methods.size(); r++) {
                    var mr = methods.get(r);
                    if (mr.name === 'm_36403_' && mr.desc === desc3) { has3 = true; break; }
                }
                if (!has3) {
                    var method3 = new MethodNode(Opcodes.ACC_PUBLIC, 'm_36403_', desc3, null, null);
                    method3.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                    method3.instructions.add(new VarInsnNode(Opcodes.FLOAD, 1));
                    method3.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL,
                        'net/minecraft/world/entity/player/Player', 'getAttackStrengthScale', desc3, false));
                    method3.instructions.add(new InsnNode(Opcodes.FRETURN));
                    methods.add(method3);
                }

                // RevelationFix PlayerMixin 的 @Shadow 目标 m_7500_ → AbstractClientPlayer.isCreative（Player 无此方法，补返回 false）
                var desc4 = '()Z';
                var has4 = false;
                for (var s = 0; s < methods.size(); s++) {
                    var ms = methods.get(s);
                    if (ms.name === 'm_7500_' && ms.desc === desc4) { has4 = true; break; }
                }
                if (!has4) {
                    var method4 = new MethodNode(Opcodes.ACC_PUBLIC, 'm_7500_', desc4, null, null);
                    method4.instructions.add(new InsnNode(Opcodes.ICONST_0));
                    method4.instructions.add(new InsnNode(Opcodes.IRETURN));
                    methods.add(method4);
                }

                // RevelationFix PlayerMixin 的 @Shadow 目标 m_5833_ → AbstractClientPlayer.isSpectator（补返回 false）
                var has5 = false;
                for (var u = 0; u < methods.size(); u++) {
                    var mu = methods.get(u);
                    if (mu.name === 'm_5833_' && mu.desc === desc4) { has5 = true; break; }
                }
                if (!has5) {
                    var method5 = new MethodNode(Opcodes.ACC_PUBLIC, 'm_5833_', desc4, null, null);
                    method5.instructions.add(new InsnNode(Opcodes.ICONST_0));
                    method5.instructions.add(new InsnNode(Opcodes.IRETURN));
                    methods.add(method5);
                }
                return classNode;
            }
        }
    };
}
