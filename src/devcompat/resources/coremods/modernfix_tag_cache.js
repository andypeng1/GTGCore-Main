/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * ModernFix 的 perf.tag_id_caching.TagOrElementLocationMixin 用 @Shadow 引用
 * ExtraCodecs$TagOrElementLocation 的 SRG 字段 f_216196_（官方名 tag，boolean），
 * refmap 无条目且 @Shadow 基于 ClassInfo，只能走 CoreMod 补字段。
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var FieldNode = Java.type('org.objectweb.asm.tree.FieldNode');

    return {
        'gtgcore_modernfix_tag_cache': {
            'target': {
                'type': 'CLASS',
                'name': 'net.minecraft.util.ExtraCodecs$TagOrElementLocation'
            },
            'transformer': function (classNode) {
                var fields = classNode.fields;
                function addField(name, desc) {
                    for (var i = 0; i < fields.size(); i++) {
                        if (fields.get(i).name === name) { return; }
                    }
                    fields.add(new FieldNode(Opcodes.ACC_PUBLIC, name, desc, null, null));
                }
                addField('f_216196_', 'Z');
                addField('f_216195_', 'Lnet/minecraft/resources/ResourceLocation;');

                var methods = classNode.methods;
                var hasMethod = false;
                for (var j = 0; j < methods.size(); j++) {
                    var mm = methods.get(j);
                    if (mm.name === 'm_216202_' && mm.desc === '()Ljava/lang/String;') { hasMethod = true; break; }
                }
                if (!hasMethod) {
                    var MethodNode = Java.type('org.objectweb.asm.tree.MethodNode');
                    var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
                    var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
                    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');
                    var method = new MethodNode(Opcodes.ACC_PUBLIC, 'm_216202_', '()Ljava/lang/String;', null, null);
                    method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                    method.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL,
                        'net/minecraft/util/ExtraCodecs$TagOrElementLocation', 'decoratedId',
                        '()Ljava/lang/String;', false));
                    method.instructions.add(new InsnNode(Opcodes.ARETURN));
                    methods.add(method);
                }
                return classNode;
            }
        }
    };
}
