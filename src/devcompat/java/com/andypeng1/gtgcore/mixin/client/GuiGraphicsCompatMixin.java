package com.andypeng1.gtgcore.mixin.client;

import net.minecraft.client.gui.GuiGraphics;
import net.minecraft.world.entity.LivingEntity;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.level.Level;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.Shadow;

/**
 * 开发环境兼容 mixin（随 devcompat jar 加载，由 GTDevCompatMixinPlugin 门控，仅 dev 生效）。
 * <p>
 * GTCEu 7.5.3 的两个 GuiGraphics mixin 通过 refmap 把目标解析为 SRG 名，
 * 正式环境类名是 SRG 名所以没问题；dev 环境类名是官方名，refmap 解析出的 SRG 名不存在：
 * <ul>
 *   <li>GuiGraphicsMixin 的 {@code @WrapMethod} 目标：renderItem(LivingEntity, Level, ItemStack, int x4) → m_280405_</li>
 *   <li>GuiGraphicsAccessor 的 {@code @Invoker} 目标：flushIfUnmanaged() → m_286081_</li>
 * </ul>
 * 这里在 dev 往 GuiGraphics 补这两个 SRG 名方法（委托给官方实现），让 GTCEu 的 mixin 能解析成功。
 */
@Mixin(GuiGraphics.class)
public abstract class GuiGraphicsCompatMixin {

    @Shadow
    public abstract void renderItem(LivingEntity entity, ItemStack stack, int x, int y, int seed);

    @Shadow
    abstract void flushIfUnmanaged();

    /**
     * 补出的方法：签名与 GTCEu 目标完全一致（LivingEntity, Level, ItemStack, int x4）。
     * 参数含义按新 MC 的 renderItem 推断：(entity, level, stack, x, y, seed, 忽略)。
     */
    public void m_280405_(LivingEntity entity, Level level, ItemStack stack, int x, int y, int seed, int ignored) {
        this.renderItem(entity, stack, x, y, seed);
    }

    /**
     * 补出的方法：对应 GTCEu GuiGraphicsAccessor 的 @Invoker 目标（flushIfUnmanaged）。
     */
    public void m_286081_() {
        this.flushIfUnmanaged();
    }
}
