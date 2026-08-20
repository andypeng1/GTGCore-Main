/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * Oculus 的 texture.SimpleTextureAccessor 用 @Accessor 引用 SRG 字段 f_118129_
 * （官方名 SimpleTexture.location，类型 ResourceLocation），其 refmap 无此条目，
 * 且 @Accessor 的查找基于 ClassInfo（mixin 动态添加的字段不可见），
 * 只能通过 CoreMod 在类转换阶段直接写入字节码。
 */
function initializeCoreMod() {
    return {
        'gtgcore_simple_texture_location': {
            'target': {
                'type': 'CLASS',
                'name': 'net.minecraft.client.renderer.texture.SimpleTexture'
            },
            'transformer': function (classNode) {
                var Opcodes = Java.type('org.objectweb.asm.Opcodes');
                var FieldNode = Java.type('org.objectweb.asm.tree.FieldNode');

                var fields = classNode.fields;
                for (var i = 0; i < fields.size(); i++) {
                    if (fields.get(i).name === 'f_118129_') {
                        return classNode;
                    }
                }
                // 对应官方字段 SimpleTexture.location
                fields.add(new FieldNode(Opcodes.ACC_PUBLIC, 'f_118129_',
                    'Lnet/minecraft/resources/ResourceLocation;', null, null));
                return classNode;
            }
        }
    };
}
