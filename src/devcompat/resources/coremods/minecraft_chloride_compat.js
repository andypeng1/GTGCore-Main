/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * Chloride 的 OverlayMixin 用 @Shadow 引用 Minecraft 的 SRG 字段（refmap 无条目）：
 * - f_91021_ → fps（static int）
 * - f_91066_ → options（Options）
 * - f_91073_ → level（已在 goety coremod 补充）
 * - f_167846_ → metricsRecorder（MetricsRecorder）
 * - f_231341_ → gpuUtilization（double）
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var FieldNode = Java.type('org.objectweb.asm.tree.FieldNode');

    return {
        'gtgcore_minecraft_chloride_compat': {
            'target': {
                'type': 'CLASS',
                'name': 'net.minecraft.client.Minecraft'
            },
            'transformer': function (classNode) {
                var fields = classNode.fields;
                function addField(name, desc, extra) {
                    for (var i = 0; i < fields.size(); i++) {
                        if (fields.get(i).name === name) { return; }
                    }
                    fields.add(new FieldNode(Opcodes.ACC_PUBLIC + (extra || 0), name, desc, null, null));
                }
                addField('f_91021_', 'I', Opcodes.ACC_STATIC);
                addField('f_91066_', 'Lnet/minecraft/client/Options;');
                addField('f_167846_', 'Lnet/minecraft/util/profiling/metrics/profiling/MetricsRecorder;');
                addField('f_231341_', 'D');
                return classNode;
            }
        }
    };
}
