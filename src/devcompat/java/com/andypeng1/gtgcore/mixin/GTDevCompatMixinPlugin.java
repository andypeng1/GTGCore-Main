package com.andypeng1.gtgcore.mixin;

import net.minecraftforge.fml.loading.FMLEnvironment;
import org.objectweb.asm.tree.ClassNode;
import org.spongepowered.asm.mixin.extensibility.IMixinConfigPlugin;
import org.spongepowered.asm.mixin.extensibility.IMixinInfo;

import java.util.List;
import java.util.Set;

/**
 * 仅开发环境生效的 mixin 插件（随 devcompat jar 加载，正式环境不存在该 jar）。
 * <p>
 * GTCEu 7.5.3 的 GuiGraphicsMixin 通过 refmap 把目标解析为 SRG 名 m_280405_，
 * 正式环境运行时类名是 SRG 名所以没问题；dev 环境类名是官方名 renderItem，
 * refmap 解析出的 m_280405_ 在 dev 类里不存在，导致 mixin 崩溃。
 * 本插件让兼容 mixin（添加 m_280405_ 方法）只在 dev 环境应用。
 */
public class GTDevCompatMixinPlugin implements IMixinConfigPlugin {

    @Override
    public void onLoad(String mixinPackage) {
    }

    @Override
    public String getRefMapperConfig() {
        return null;
    }

    @Override
    public boolean shouldApplyMixin(String targetClassName, String mixinClassName) {
        return !FMLEnvironment.production;
    }

    @Override
    public void acceptTargets(Set<String> myTargets, Set<String> otherTargets) {
    }

    @Override
    public List<String> getMixins() {
        return null;
    }

    @Override
    public void preApply(String targetClassName, ClassNode targetClass, String mixinClassName, IMixinInfo mixinInfo) {
        // dev 调试（临时）：打印 mixin 视角的 Player 方法状态 + 模拟 @Inject(method="tick") 的 selector 匹配
        if (targetClassName.equals("net.minecraft.world.entity.player.Player")) {
            StringBuilder sb = new StringBuilder("=== MIXIN VIEW Player methods=" + targetClass.methods.size() + " ===\n");
            for (org.objectweb.asm.tree.MethodNode m : targetClass.methods) {
                sb.append("  ").append(m.name).append(" ").append(m.desc)
                  .append(" insns=").append(m.instructions.size())
                  .append(" access=0x").append(Integer.toHexString(m.access)).append("\n");
            }
            System.out.println(sb);
            try {
                // 模拟 remapRefMap 反查后的 selector（MCP 域全名）
                org.spongepowered.asm.mixin.injection.struct.MemberInfo mi =
                    org.spongepowered.asm.mixin.injection.struct.MemberInfo.parse(
                        "Lnet/minecraft/world/entity/player/Player;tick()V", null);
                System.out.println("=== SELECTOR: owner=" + mi.getOwner() + " name=" + mi.getName() + " desc=" + mi.getDesc() + " ===");
                for (org.objectweb.asm.tree.MethodNode m : targetClass.methods) {
                    org.spongepowered.asm.mixin.injection.selectors.MatchResult r =
                        mi.match(org.spongepowered.asm.mixin.injection.selectors.ElementNode.of(targetClass, m));
                    if (r != org.spongepowered.asm.mixin.injection.selectors.MatchResult.NONE) {
                        System.out.println("  MATCH: " + m.name + " " + m.desc + " insns=" + m.instructions.size() + " => " + r);
                    }
                }
                // 用真实的 RemappingReferenceMapper 模拟 endinglib 的 remap 查询
                try {
                    java.io.InputStream is = getClass().getClassLoader().getResourceAsStream("ending_library.refmap.json");
                    if (is == null) {
                        System.out.println("=== REAL REMAP: refmap resource not found ===");
                    } else {
                        org.spongepowered.asm.mixin.refmap.IReferenceMapper base = null;
                        try {
                            base = org.spongepowered.asm.mixin.refmap.ReferenceMapper.read(
                                new java.io.InputStreamReader(is), "ending_library.refmap.json");
                        } catch (Throwable t) {
                            System.out.println("=== REAL REMAP: read failed: " + t);
                        }
                        if (base != null) {
                            base.setContext("com/mega/endinglib/mixin/personal_rule/PlayerMixin");
                            org.spongepowered.asm.mixin.refmap.IReferenceMapper real =
                                org.spongepowered.asm.mixin.refmap.RemappingReferenceMapper.of(
                                    org.spongepowered.asm.mixin.MixinEnvironment.getDefaultEnvironment(), base);
                            String r1 = real.remap("com/mega/endinglib/mixin/personal_rule/PlayerMixin", "tick");
                            String r2 = real.remap("com/mega/endinglib/mixin/personal_rule/PlayerMixin", "getDisplayName");
                            System.out.println("=== REAL REMAP tick => " + r1);
                            System.out.println("=== REAL REMAP getDisplayName => " + r2);
                            org.spongepowered.asm.mixin.injection.struct.MemberInfo mreal =
                                org.spongepowered.asm.mixin.injection.struct.MemberInfo.parse(r1, null);
                            System.out.println("=== REAL SELECTOR: owner=" + mreal.getOwner() + " name=" + mreal.getName() + " desc=" + mreal.getDesc() + " ===");
                            for (org.objectweb.asm.tree.MethodNode m : targetClass.methods) {
                                org.spongepowered.asm.mixin.injection.selectors.MatchResult r =
                                    mreal.match(org.spongepowered.asm.mixin.injection.selectors.ElementNode.of(targetClass, m));
                                if (r != org.spongepowered.asm.mixin.injection.selectors.MatchResult.NONE) {
                                    System.out.println("  REAL MATCH: " + m.name + " " + m.desc + " insns=" + m.instructions.size() + " => " + r);
                                }
                            }
                        }
                    }
                } catch (Throwable t) {
                    System.out.println("=== REAL REMAP FAILED: " + t);
                }
            } catch (Throwable t) {
                System.out.println("=== SELECTOR SIM FAILED: " + t);
            }
        }
    }

    @Override
    public void postApply(String targetClassName, ClassNode targetClass, String mixinClassName, IMixinInfo mixinInfo) {
    }
}
