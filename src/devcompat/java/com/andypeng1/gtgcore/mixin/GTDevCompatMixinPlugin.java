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
    }

    @Override
    public void postApply(String targetClassName, ClassNode targetClass, String mixinClassName, IMixinInfo mixinInfo) {
    }
}
