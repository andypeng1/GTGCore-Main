package com.andypeng1.gtgcore.mixin.client;

import net.minecraft.world.entity.player.Player;
import org.spongepowered.asm.mixin.Mixin;

/**
 * dev 调试专用（临时）：空 mixin，仅用于触发 GTDevCompatMixinPlugin.preApply 打印
 * mixin 视角的 Player 类状态（验证 @Inject tick 崩溃根因）。验证完删除。
 */
@Mixin(Player.class)
public class PlayerStateDumpMixin {
}
