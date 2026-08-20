/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * EndingLibrary 的 MinecraftMixin 用 @Shadow 引用 SRG 成员（refmap 无条目）：
 * - f_90981_ → Minecraft.instance（static Minecraft）
 * - f_91063_ → Minecraft.gameRenderer（GameRenderer）
 * - m_109153_ → GameRenderer.getMainCamera()（在 GameRenderer 类，见下方第二个 coremod）
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var FieldNode = Java.type('org.objectweb.asm.tree.FieldNode');

    return {
        'gtgcore_minecraft_endinglib_compat': {
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
                addField('f_90981_', 'Lnet/minecraft/client/Minecraft;', Opcodes.ACC_STATIC);
                addField('f_91063_', 'Lnet/minecraft/client/renderer/GameRenderer;');
                return classNode;
            }
        }
    };
}
