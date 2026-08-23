/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * FerriteCore 的 FastMapStateHolderMixin.getNeighborFromFastMap 是 @Redirect handler，
 * 无条件解引用 ferritecore_globalTable——dev 环境 map.size()==1 的 StateHolder
 * 不初始化 globalTable（populateNeighbors 直接 setNeighborTable 返回），导致 NPE。
 * 重写 handler：globalTable 为 null 时 fallback 到 table.get（与原版一致），
 * 否则走 FastMap 路径（与正式环境行为一致）。正式环境不受影响。
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
    var FieldInsnNode = Java.type('org.objectweb.asm.tree.FieldInsnNode');
    var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
    var TypeInsnNode = Java.type('org.objectweb.asm.tree.TypeInsnNode');
    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');
    var JumpInsnNode = Java.type('org.objectweb.asm.tree.JumpInsnNode');
    var LabelNode = Java.type('org.objectweb.asm.tree.LabelNode');
    var InsnList = Java.type('org.objectweb.asm.tree.InsnList');

    var CLS = 'malte0811/ferritecore/mixin/fastmap/FastMapStateHolderMixin';

    function buildFallbackHandler() {
        var il = new InsnList();
        var lUseFast = new LabelNode();
        // if (this.ferritecore_globalTable != null) goto lUseFast;
        il.add(new VarInsnNode(Opcodes.ALOAD, 0));
        il.add(new FieldInsnNode(Opcodes.GETFIELD, CLS, 'ferritecore_globalTable', 'Lmalte0811/ferritecore/fastmap/FastMap;'));
        il.add(new JumpInsnNode(Opcodes.IFNONNULL, lUseFast));
        // return table.get(rowKey, columnKey);  （与原版 StateHolder.setValue 一致）
        il.add(new VarInsnNode(Opcodes.ALOAD, 1));
        il.add(new VarInsnNode(Opcodes.ALOAD, 2));
        il.add(new VarInsnNode(Opcodes.ALOAD, 3));
        il.add(new MethodInsnNode(Opcodes.INVOKEINTERFACE, 'com/google/common/collect/Table', 'get',
            '(Ljava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;', true));
        il.add(new InsnNode(Opcodes.ARETURN));
        // lUseFast: return this.ferritecore_globalTable.withUnsafe(this.ferritecore_globalTableIndex, (Property) rowKey, columnKey);
        il.add(lUseFast);
        il.add(new VarInsnNode(Opcodes.ALOAD, 0));
        il.add(new FieldInsnNode(Opcodes.GETFIELD, CLS, 'ferritecore_globalTable', 'Lmalte0811/ferritecore/fastmap/FastMap;'));
        il.add(new VarInsnNode(Opcodes.ALOAD, 0));
        il.add(new FieldInsnNode(Opcodes.GETFIELD, CLS, 'ferritecore_globalTableIndex', 'I'));
        il.add(new VarInsnNode(Opcodes.ALOAD, 2));
        il.add(new TypeInsnNode(Opcodes.CHECKCAST, 'net/minecraft/world/level/block/state/properties/Property'));
        il.add(new VarInsnNode(Opcodes.ALOAD, 3));
        il.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL, 'malte0811/ferritecore/fastmap/FastMap', 'withUnsafe',
            '(ILnet/minecraft/world/level/block/state/properties/Property;Ljava/lang/Object;)Ljava/lang/Object;', false));
        il.add(new InsnNode(Opcodes.ARETURN));
        return il;
    }

    return {
        'gtgcore_fix_ferritecore_handler': {
            'target': { 'type': 'CLASS', 'name': CLS },
            'transformer': function (classNode) {
                var methods = classNode.methods;
                for (var i = 0; i < methods.size(); i++) {
                    var m = methods.get(i);
                    if (m.name === 'getNeighborFromFastMap') {
                        m.instructions = buildFallbackHandler();
                        m.tryCatchBlocks.clear();
                        m.localVariables.clear();
                        break;
                    }
                }
                return classNode;
            }
        }
    };
}
