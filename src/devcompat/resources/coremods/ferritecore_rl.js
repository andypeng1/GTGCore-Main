/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * FerriteCore 的 ResourceLocationAccess 用 @Accessor 引用 SRG 字段 f_135804_
 * （官方名 ResourceLocation.namespace，String），refmap 无条目且 @Accessor 基于 ClassInfo，
 * 只能走 CoreMod 补字段。
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var FieldNode = Java.type('org.objectweb.asm.tree.FieldNode');

    return {
        'gtgcore_ferritecore_rl': {
            'target': {
                'type': 'CLASS',
                'name': 'net.minecraft.resources.ResourceLocation'
            },
            'transformer': function (classNode) {
                var fields = classNode.fields;
                function addField(name) {
                    for (var i = 0; i < fields.size(); i++) {
                        if (fields.get(i).name === name) { return; }
                    }
                    fields.add(new FieldNode(Opcodes.ACC_PUBLIC, name, 'Ljava/lang/String;', null, null));
                }
                addField('f_135804_'); // namespace
                addField('f_135805_'); // path
                return classNode;
            }
        }
    };
}
