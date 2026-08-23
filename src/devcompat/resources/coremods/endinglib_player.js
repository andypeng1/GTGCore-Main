/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * EndingLibrary 的 personal_rule.PlayerMixin 用 @Shadow 引用 SRG 方法 m_36218_
 * （官方名 Player.decorateDisplayNameComponent(MutableComponent)），refmap 无条目且
 * @Shadow 基于 ClassInfo，只能走 CoreMod 补方法（委托官方实现）。
 * <p>
 * 另外（2026-08-21 修复）：remapRefMap 会把 @Inject(method="tick") 按 refmap 反查成
 * MCP 域名（tick / getDisplayName），而 mixin 处理时类为 SRG 域（m_8119_ / m_5446_），
 * 匹配失败导致 mixin 0.8.5 内部 NPE（insnNode is null）。因此补 MCP 名委托方法
 * （仅当 MCP 名不存在且 SRG 名存在时），任何名字域下注入都能命中非空方法体。
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var MethodNode = Java.type('org.objectweb.asm.tree.MethodNode');
    var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
    var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');

    function hasMethod(methods, name, desc) {
        for (var i = 0; i < methods.size(); i++) {
            var m = methods.get(i);
            if (m.name === name && m.desc === desc) { return true; }
        }
        return false;
    }

    return {
        'gtgcore_endinglib_player': {
            'target': {
                'type': 'CLASS',
                'name': 'net.minecraft.world.entity.player.Player'
            },
            'transformer': function (classNode) {
                var methods = classNode.methods;

                // remapRefMap 反查后的 MCP 域注入目标：tick / getDisplayName（委托 SRG 原方法）
                if (!hasMethod(methods, 'tick', '()V') && hasMethod(methods, 'm_8119_', '()V')) {
                    var mTick = new MethodNode(Opcodes.ACC_PUBLIC, 'tick', '()V', null, null);
                    mTick.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                    mTick.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL,
                        'net/minecraft/world/entity/player/Player', 'm_8119_', '()V', false));
                    mTick.instructions.add(new InsnNode(Opcodes.RETURN));
                    methods.add(mTick);
                }
                var descDn = '()Lnet/minecraft/network/chat/Component;';
                if (!hasMethod(methods, 'getDisplayName', descDn) && hasMethod(methods, 'm_5446_', descDn)) {
                    var mDn = new MethodNode(Opcodes.ACC_PUBLIC, 'getDisplayName', descDn, null, null);
                    mDn.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                    mDn.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL,
                        'net/minecraft/world/entity/player/Player', 'm_5446_', descDn, false));
                    mDn.instructions.add(new InsnNode(Opcodes.ARETURN));
                    methods.add(mDn);
                }

                // EndingLibrary personal_rule.PlayerMixin 的 @Shadow 目标 m_36218_ → decorateDisplayNameComponent
                // 注意：该方法是 mixin 的 @Overwrite（protected），补丁必须同为 protected，
                // 否则报 "cannot reduce visibility of PUBLIC target method"
                var desc = '(Lnet/minecraft/network/chat/MutableComponent;)Lnet/minecraft/network/chat/MutableComponent;';
                if (!hasMethod(methods, 'm_36218_', desc)) {
                    var method = new MethodNode(Opcodes.ACC_PROTECTED, 'm_36218_', desc, null, null);
                    method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                    method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 1));
                    method.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL,
                        'net/minecraft/world/entity/player/Player', 'decorateDisplayNameComponent', desc, false));
                    method.instructions.add(new InsnNode(Opcodes.ARETURN));
                    methods.add(method);
                }

                // Botania PlayerMixin 的 @Shadow 目标 m_36222_ → awardStat(ResourceLocation, int)
                var desc2 = '(Lnet/minecraft/resources/ResourceLocation;I)V';
                if (!hasMethod(methods, 'm_36222_', desc2)) {
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
                if (!hasMethod(methods, 'm_36403_', desc3)) {
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
                if (!hasMethod(methods, 'm_7500_', desc4)) {
                    var method4 = new MethodNode(Opcodes.ACC_PUBLIC, 'm_7500_', desc4, null, null);
                    method4.instructions.add(new InsnNode(Opcodes.ICONST_0));
                    method4.instructions.add(new InsnNode(Opcodes.IRETURN));
                    methods.add(method4);
                }

                // RevelationFix PlayerMixin 的 @Shadow 目标 m_5833_ → AbstractClientPlayer.isSpectator（补返回 false）
                if (!hasMethod(methods, 'm_5833_', desc4)) {
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
