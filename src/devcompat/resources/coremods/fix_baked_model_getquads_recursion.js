/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * 修复 BakedModel.getQuads ↔ m_213637_ 桥接问题（v2）：
 * - 环（StackOverflowError，Mekanism 型）：MCP 域 mod 类自身无 m_213637_，
 *   getQuads 桥接 INVOKESPECIAL 自身 m_213637_ → 解析到生成器 SRG 桥接 →
 *   多态分派回 getQuads 桥接 → 递归。改写委托目标为父类 MCP 真实实现。
 * - 空洞（AbstractMethodError，AE2 型）：SRG 域 mod 类自身有原生 m_213637_，
 *   桥接正确（INVOKESPECIAL 自身 m_213637_）；v1 误删导致无实现 → 恢复桥接。
 * <p>
 * 判定：m_213637_ 若为"简单转发形态"（ALOAD0..3 + INVOKEINTERFACE/VIRTUAL
 * getQuads + ARETURN）说明是生成器桥接（自身无真实实现）→ 属 Mekanism 型；
 * 否则是原生实现 → 属 AE2 型（补/留 getQuads 桥接）。
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var MethodNode = Java.type('org.objectweb.asm.tree.MethodNode');
    var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
    var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');
    var LineNumberNode = Java.type('org.objectweb.asm.tree.LineNumberNode');

    var DESC = '(Lnet/minecraft/world/level/block/state/BlockState;Lnet/minecraft/core/Direction;Lnet/minecraft/util/RandomSource;)Ljava/util/List;';

    function findMethod(methods, name, desc) {
        for (var i = 0; i < methods.size(); i++) {
            var m = methods.get(i);
            if (m.name === name && m.desc === desc) return m;
        }
        return null;
    }

    // 生成器桥接无行号表；原生编译（含原生简单转发）有行号。
    function hasLineNumbers(m) {
        if (m == null) return false;
        for (var j = 0; j < m.instructions.size(); j++) {
            if (m.instructions.get(j) instanceof LineNumberNode) return true;
        }
        return false;
    }

    function fixModel(classNode) {
        var methods = classNode.methods;
        var gq = findMethod(methods, 'getQuads', DESC);
        var srg = findMethod(methods, 'm_213637_', DESC);
        var srgIsBridge = !hasLineNumbers(srg);
        var name = classNode.name;

        if (gq != null) {
            // 找桥接体内的 INVOKESPECIAL 自身 m_213637_
            var insnToFix = null;
            for (var j = 0; j < gq.instructions.size(); j++) {
                var insn = gq.instructions.get(j);
                if (insn.getOpcode() === Opcodes.INVOKESPECIAL
                    && insn.owner === name && insn.name === 'm_213637_' && insn.desc === DESC) {
                    insnToFix = insn; break;
                }
            }
            if (insnToFix != null) {
                if (srgIsBridge && classNode.superName !== 'java/lang/Object') {
                    // Mekanism 型：委托目标改为父类 MCP 真实实现（super 语义）
                    insnToFix.owner = classNode.superName;
                    insnToFix.name = 'getQuads';
                    insnToFix.setOpcode(Opcodes.INVOKESPECIAL);
                    print('[BQM2-FIX] ' + name + '.getQuads -> INVOKESPECIAL ' + classNode.superName + '.getQuads (parent impl)');
                } else {
                    // AE2 型：桥接本来就正确（自身有原生 m_213637_），保留
                    print('[BQM2-FIX] ' + name + '.getQuads bridge OK (native m_213637_)');
                }
            } else if ((gq.access & Opcodes.ACC_ABSTRACT) !== 0) {
                // 抽象占位 → 补实现（委托父类 MCP getQuads）
                gq.access = gq.access & ~Opcodes.ACC_ABSTRACT;
                gq.instructions.clear();
                gq.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                gq.instructions.add(new VarInsnNode(Opcodes.ALOAD, 1));
                gq.instructions.add(new VarInsnNode(Opcodes.ALOAD, 2));
                gq.instructions.add(new VarInsnNode(Opcodes.ALOAD, 3));
                gq.instructions.add(new MethodInsnNode(Opcodes.INVOKESPECIAL,
                    classNode.superName, 'getQuads', DESC, false));
                gq.instructions.add(new InsnNode(Opcodes.ARETURN));
                print('[BQM2-FIX] ' + name + '.getQuads abstract -> delegate ' + classNode.superName + '.getQuads');
            }
        } else if (srg != null && !srgIsBridge) {
            // AE2 型（v1 误删后恢复）：补 getQuads 桥接 INVOKESPECIAL 自身 m_213637_
            var m = new MethodNode(Opcodes.ACC_PUBLIC, 'getQuads', DESC, null, null);
            m.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
            m.instructions.add(new VarInsnNode(Opcodes.ALOAD, 1));
            m.instructions.add(new VarInsnNode(Opcodes.ALOAD, 2));
            m.instructions.add(new VarInsnNode(Opcodes.ALOAD, 3));
            m.instructions.add(new MethodInsnNode(Opcodes.INVOKESPECIAL, name, 'm_213637_', DESC, false));
            m.instructions.add(new InsnNode(Opcodes.ARETURN));
            methods.add(m);
            print('[BQM2-FIX] restored ' + name + '.getQuads -> m_213637_');
        }
        return classNode;
    }

    var classes = [
        'mekanism/client/model/baked/ExtensionBakedModel$TransformedBakedModel',
        'appeng/client/render/DelegateBakedModel',
        'appeng/client/render/FacadeBakedItemModel',
        'appeng/client/render/model/ColorApplicatorBakedModel',
        'appeng/client/render/model/MemoryCardBakedModel',
        'com/gregtechceu/gtceu/client/renderer/cover/FacadeCoverRenderer$1',
        'com/lowdragmc/lowdraglib/client/model/custommodel/CustomBakedModel',
        'com/lowdragmc/lowdraglib/client/model/forge/LDLRendererModel$RendererBakedModel',
        'com/lowdragmc/lowdraglib/core/mixins/ItemModelShaperMixin$1'
    ];
    var out = {};
    for (var i = 0; i < classes.length; i++) {
        out['gtgcore_bqm2_' + i] = {
            'target': { 'type': 'CLASS', 'name': classes[i] },
            'transformer': fixModel
        };
    }
    return out;
}
