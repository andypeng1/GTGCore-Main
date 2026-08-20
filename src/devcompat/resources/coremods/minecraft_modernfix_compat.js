/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * ModernFix 的 perf.blast_search_trees.MinecraftMixin 用 @Shadow 引用 SRG 成员：
 * - f_90997_ → Minecraft.searchRegistry（SearchRegistry 字段）
 * - m_231374_ → Minecraft.populateSearchTree(SearchRegistry$Key, List)
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var FieldNode = Java.type('org.objectweb.asm.tree.FieldNode');
    var MethodNode = Java.type('org.objectweb.asm.tree.MethodNode');
    var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
    var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');

    return {
        'gtgcore_minecraft_modernfix_compat': {
            'target': {
                'type': 'CLASS',
                'name': 'net.minecraft.client.Minecraft'
            },
            'transformer': function (classNode) {
                var fields = classNode.fields;
                var hasField = false;
                for (var i = 0; i < fields.size(); i++) {
                    if (fields.get(i).name === 'f_90997_') { hasField = true; break; }
                }
                if (!hasField) {
                    fields.add(new FieldNode(Opcodes.ACC_PUBLIC, 'f_90997_',
                        'Lnet/minecraft/client/searchtree/SearchRegistry;', null, null));
                }
                // measure_time.MinecraftMixin 的 @Shadow 字段 f_91081_ → overlay
                var hasOverlay = false;
                for (var k = 0; k < fields.size(); k++) {
                    if (fields.get(k).name === 'f_91081_') { hasOverlay = true; break; }
                }
                if (!hasOverlay) {
                    fields.add(new FieldNode(Opcodes.ACC_PUBLIC, 'f_91081_',
                        'Lnet/minecraft/client/gui/screens/Overlay;', null, null));
                }

                var methods = classNode.methods;
                var hasMethod = false;
                for (var j = 0; j < methods.size(); j++) {
                    var m = methods.get(j);
                    if (m.name === 'm_231374_' && m.desc === '(Lnet/minecraft/client/searchtree/SearchRegistry$Key;Ljava/util/List;)V') { hasMethod = true; break; }
                }
                if (!hasMethod) {
                    // public void m_231374_(SearchRegistry.Key key, List list) { this.populateSearchTree(key, list); }
                    var method = new MethodNode(Opcodes.ACC_PUBLIC, 'm_231374_',
                        '(Lnet/minecraft/client/searchtree/SearchRegistry$Key;Ljava/util/List;)V', null, null);
                    method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                    method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 1));
                    method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 2));
                    method.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL,
                        'net/minecraft/client/Minecraft', 'populateSearchTree',
                        '(Lnet/minecraft/client/searchtree/SearchRegistry$Key;Ljava/util/List;)V', false));
                    method.instructions.add(new InsnNode(Opcodes.RETURN));
                    methods.add(method);
                }
                return classNode;
            }
        }
    };
}
