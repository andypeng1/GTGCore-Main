package com.andypeng1.gtgcore.mixin.client;

import mezz.jei.api.gui.builder.ITooltipBuilder;
import net.minecraftforge.fluids.FluidStack;
import net.minecraft.world.item.TooltipFlag;
import org.spongepowered.asm.mixin.Mixin;

/**
 * 开发环境兼容 mixin（随 devcompat jar 加载，由 GTDevCompatMixinPlugin 门控，仅 dev 生效）。
 * <p>
 * GTCEu 7.5.3 的 jei.FluidHelperMixin 用 {@code @Inject} 注入
 * {@code FluidHelper.getTooltip(ITooltipBuilder, FluidStack, TooltipFlag)}（新 JEI API 签名），
 * 但 1.20.1 现役 JEI（15.48/15.49）的 FluidHelper.getTooltip 只有 List 签名。
 * dev 禁用 refmap 后 handler 的 ITooltipBuilder 参数与 List 方法不匹配而崩溃。
 * 这里在 dev 往 FluidHelper 补一个 ITooltipBuilder 签名的 getTooltip（GTCEu 的注入目标），
 * 让 mixin 能精确匹配。该方法是 GTCEu 兼容扩展，JEI 自身不会调用，空实现即可。
 */
@Mixin(mezz.jei.forge.platform.FluidHelper.class)
public abstract class FluidHelperCompatMixin {

    public void getTooltip(ITooltipBuilder tooltipBuilder, FluidStack fluidStack, TooltipFlag flag) {
        // dev 兼容：GTCEu 的注入目标方法，JEI 不会调用
    }
}
