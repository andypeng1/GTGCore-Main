/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * Embeddium 的 VertexConsumerMixin 用 @Shadow 引用 SRG 方法（refmap 无条目，
 * 且 @Shadow 方法查找基于 ClassInfo，mixin 动态添加的方法不可见），只能走 CoreMod：
 * - m_5601_ (FFF)LVertexConsumer;  → 官方名 normal
 * - m_5483_ (DDD)LVertexConsumer;  → 官方名 vertex
 * <p>
 * 目标是接口：添加 default 方法（带方法体，实现类自动继承，避免 AbstractMethodError）。
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var MethodNode = Java.type('org.objectweb.asm.tree.MethodNode');
    var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');
    var VC = 'com/mojang/blaze3d/vertex/VertexConsumer';

    function addDefaultMethod(classNode, name, desc) {
        var methods = classNode.methods;
        for (var i = 0; i < methods.size(); i++) {
            var m = methods.get(i);
            if (m.name === name && m.desc === desc) {
                return;
            }
        }
        // default 方法体：return this;
        var method = new MethodNode(Opcodes.ACC_PUBLIC, name, desc, null, null);
        method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
        method.instructions.add(new InsnNode(Opcodes.ARETURN));
        methods.add(method);
    }

    return {
        'gtgcore_vertex_consumer_compat': {
            'target': {
                'type': 'CLASS',
                'name': VC
            },
            'transformer': function (classNode) {
                addDefaultMethod(classNode, 'm_5601_', '(FFF)L' + VC + ';');
                addDefaultMethod(classNode, 'm_5483_', '(DDD)L' + VC + ';');
                addDefaultMethod(classNode, 'm_252986_', '(Lorg/joml/Matrix4f;FFF)L' + VC + ';');
                addDefaultMethod(classNode, 'm_252939_', '(Lorg/joml/Matrix3f;FFF)L' + VC + ';');
                return classNode;
            }
        }
    };
}
