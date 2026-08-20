/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * ProbeJS 的 TranslatableMixin 用 @Shadow 引用 TranslatableContents 的 SRG 字段
 * （refmap 无条目，@Shadow 基于 ClassInfo，只能走 CoreMod）：
 * - f_237497_ → key（String）
 * - f_263792_ → fallback（String）
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var FieldNode = Java.type('org.objectweb.asm.tree.FieldNode');

    return {
        'gtgcore_probejs_translatable': {
            'target': {
                'type': 'CLASS',
                'name': 'net.minecraft.network.chat.contents.TranslatableContents'
            },
            'transformer': function (classNode) {
                var fields = classNode.fields;
                function addField(name) {
                    for (var i = 0; i < fields.size(); i++) {
                        if (fields.get(i).name === name) { return; }
                    }
                    fields.add(new FieldNode(Opcodes.ACC_PUBLIC, name, 'Ljava/lang/String;', null, null));
                }
                addField('f_237497_');
                addField('f_263792_');
                return classNode;
            }
        }
    };
}
