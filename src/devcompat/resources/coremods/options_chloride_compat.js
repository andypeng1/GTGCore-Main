/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * Chloride 的 OverlayMixin 用 @Shadow 引用 Options 的 SRG 字段：
 * - f_92063_ → Options.renderDebug（boolean）
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var FieldNode = Java.type('org.objectweb.asm.tree.FieldNode');

    return {
        'gtgcore_options_chloride_compat': {
            'target': {
                'type': 'CLASS',
                'name': 'net.minecraft.client.Options'
            },
            'transformer': function (classNode) {
                var fields = classNode.fields;
                for (var i = 0; i < fields.size(); i++) {
                    if (fields.get(i).name === 'f_92063_') { return classNode; }
                }
                fields.add(new FieldNode(Opcodes.ACC_PUBLIC, 'f_92063_', 'Z', null, null));
                return classNode;
            }
        }
    };
}
