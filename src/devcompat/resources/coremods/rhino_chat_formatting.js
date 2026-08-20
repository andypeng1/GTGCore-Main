/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * Rhino 的 ChatFormattingMixin 用 @Shadow 引用 SRG 字段 f_126595_
 * （官方名 ChatFormatting.color，Integer），refmap 无条目且 @Shadow 基于 ClassInfo，
 * 只能走 CoreMod 补字段。
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var FieldNode = Java.type('org.objectweb.asm.tree.FieldNode');

    return {
        'gtgcore_rhino_chat_formatting': {
            'target': {
                'type': 'CLASS',
                'name': 'net.minecraft.ChatFormatting'
            },
            'transformer': function (classNode) {
                var fields = classNode.fields;
                for (var i = 0; i < fields.size(); i++) {
                    if (fields.get(i).name === 'f_126595_') { return classNode; }
                }
                fields.add(new FieldNode(Opcodes.ACC_PUBLIC, 'f_126595_', 'Ljava/lang/Integer;', null, null));
                return classNode;
            }
        }
    };
}
