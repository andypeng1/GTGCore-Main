/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * Chloride 的 OverlayMixin 的 @Inject 目标 m_91383_（runTick）要求方法体内有
 * MetricsRecorder.isRecording() 调用（@At(INVOKE, target="...MetricsRecorder;isRecording()Z")），
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
        'gtgcore_chloride_run_tick': {
            'target': {
                'type': 'CLASS',
                'name': 'net.minecraft.client.Minecraft'
            },
            'transformer': function (classNode) {
                var methods = classNode.methods;
                var desc = '(Z)V';
                for (var i = 0; i < methods.size(); i++) {
                    var m = methods.get(i);
                    if (m.name === 'm_91383_' && m.desc === desc) { return classNode; }
                }
                var method = new MethodNode(Opcodes.ACC_PUBLIC, 'm_91383_', desc, null, null);
                // ForgeEventFactory.onRenderTickStart(0.0F);（EndingLibrary time mixin 的 @At(INVOKE) 注入点要求）
                method.instructions.add(new InsnNode(Opcodes.FCONST_0));
                method.instructions.add(new MethodInsnNode(Opcodes.INVOKESTATIC,
                    'net/minecraftforge/event/ForgeEventFactory', 'onRenderTickStart', '(F)V', false));
                // this.metricsRecorder.isRecording();（Chloride @At(INVOKE) 注入点要求）
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                method.instructions.add(new FieldInsnNode(Opcodes.GETFIELD,
                    'net/minecraft/client/Minecraft', 'metricsRecorder',
                    'Lnet/minecraft/util/profiling/metrics/profiling/MetricsRecorder;'));
                method.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL,
                    'net/minecraft/util/profiling/metrics/profiling/MetricsRecorder', 'isRecording', '()Z', false));
                method.instructions.add(new InsnNode(Opcodes.POP));
                // this.runTick(b);
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                method.instructions.add(new VarInsnNode(Opcodes.ILOAD, 1));
                method.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL,
                    'net/minecraft/client/Minecraft', 'runTick', desc, false));
                method.instructions.add(new InsnNode(Opcodes.RETURN));
                methods.add(method);
                return classNode;
            }
        }
    };
}
