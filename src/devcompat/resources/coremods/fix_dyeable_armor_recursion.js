/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * 修复 DyeableArmorItem.getColor ↔ m_41121_ 桥接无限递归（StackOverflowError:
 * Rendering item，ad_astra CustomDyeableArmorItem 太空服渲染触发）。
 * <p>
 * 环：MCP getColor → CustomDyeableArmorItem.getColor（auto_srg MCP 桥接，
 * INVOKESPECIAL 自身 m_41121_）→ CustomDyeableArmorItem.m_41121_（真实
 * override，内部 super.m_41121_ → INVOKESPECIAL DyeableArmorItem.m_41121_）
 * → DyeableArmorItem.m_41121_（auto_srg SRG 桥接，INVOKEVIRTUAL getColor
 * 多态分派）→ dispatch 回 CustomDyeableArmorItem.getColor → 循环。
 * <p>
 * 修复：DyeableArmorItem.m_41121_ 桥接体 INVOKEVIRTUAL → INVOKESPECIAL。
 * SRG 桥接本质是"本类 MCP 实现的别名"，super 调用语义应执行父类真实实现；
 * 外部 SRG 调用方（INVOKEVIRTUAL m_41121_）仍会先命中子类真实 override，
 * 不受影响。生成器 M 桥接体一律 INVOKEVIRTUAL 是缺陷（同类环风险普遍存在），
 * 此处先按需修复。
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');

    function fixBridge(classNode) {
        var methods = classNode.methods;
        for (var i = 0; i < methods.size(); i++) {
            var m = methods.get(i);
            if (m.name !== 'm_41121_' || m.desc !== '(Lnet/minecraft/world/item/ItemStack;)I') { continue; }
            for (var j = 0; j < m.instructions.size(); j++) {
                var insn = m.instructions.get(j);
                if (insn.getOpcode() === Opcodes.INVOKEVIRTUAL
                    && insn.owner === 'net/minecraft/world/item/DyeableArmorItem'
                    && insn.name === 'getColor'
                    && insn.desc === '(Lnet/minecraft/world/item/ItemStack;)I') {
                    insn.setOpcode(Opcodes.INVOKESPECIAL);
                    print('[DYE-FIX] DyeableArmorItem.m_41121_ -> INVOKESPECIAL getColor');
                }
            }
        }
        return classNode;
    }

    return {
        'gtgcore_fix_dyeable_armor_recursion': {
            'target': { 'type': 'CLASS', 'name': 'net/minecraft/world/item/DyeableArmorItem' },
            'transformer': fixBridge
        }
    };
}
