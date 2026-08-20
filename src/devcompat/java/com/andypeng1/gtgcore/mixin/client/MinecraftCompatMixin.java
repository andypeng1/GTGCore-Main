package com.andypeng1.gtgcore.mixin.client;

import net.minecraft.client.Minecraft;
import net.minecraft.client.gui.screens.Screen;
import org.jetbrains.annotations.Nullable;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.Shadow;

/**
 * 开发环境兼容 mixin（随 devcompat jar 加载，由 GTDevCompatMixinPlugin 门控，仅 dev 生效）。
 * <p>
 * Configuration（dev.toma）的 MinecraftMixin 通过 refmap 把 @Inject 目标解析为
 * SRG 名 m_91320_（即 Minecraft.setScreen），dev 类名是官方名所以找不到。
 * 这里补一个 m_91320_(Screen) 方法（委托 setScreen），让注入能解析成功。
 */
@Mixin(Minecraft.class)
public abstract class MinecraftCompatMixin {

    @Shadow
    public abstract void setScreen(@Nullable Screen screen);

    @Shadow
    public abstract boolean shouldEntityAppearGlowing(net.minecraft.world.entity.Entity entity);

    @Shadow
    public abstract void createSearchTrees();

    @Shadow
    public abstract void setLevel(net.minecraft.client.multiplayer.ClientLevel level);

    @Shadow
    public abstract void updateLevelInEngines(net.minecraft.client.multiplayer.ClientLevel level);

    @Shadow
    public abstract String createTitle();

    @Shadow
    public abstract void onGameLoadFinished();

    @Shadow
    abstract void setInitialScreen(com.mojang.realmsclient.client.RealmsClient realmsClient,
                                   net.minecraft.server.packs.resources.ReloadInstance reloadInstance,
                                   net.minecraft.client.main.GameConfig.QuickPlayData quickPlayData);

    /**
     * 补出的方法：对应 Embeddium core.MinecraftClientMixin 的 @Inject 目标
     * （setInitialScreen，SRG 名 m_278684_）。
     */
    public void m_278684_(com.mojang.realmsclient.client.RealmsClient realmsClient,
                          net.minecraft.server.packs.resources.ReloadInstance reloadInstance,
                          net.minecraft.client.main.GameConfig.QuickPlayData quickPlayData) {
        this.setInitialScreen(realmsClient, reloadInstance, quickPlayData);
    }

    /**
     * 补出的方法：对应 EndingLibrary time.MinecraftMixin 的 @Inject 目标
     * （runTick，SRG 名 m_91383_，由 chloride_run_tick.js CoreMod 提供）。
     */

    /**
     * 补出的方法：对应 AE2 PickColorMixin 的 @Inject 目标
     * （pickBlock，SRG 名 m_91280_）。
     */
    @Shadow
    public abstract void pickBlock();

    @Shadow
    public abstract boolean allowsTelemetry();

    /**
     * 补出的方法：对应 ModernFix remove_telemetry MinecraftMixin 的 @Inject 目标
     * （allowsTelemetry，SRG 名 m_261210_）。
     */
    public boolean m_261210_() {
        return this.allowsTelemetry();
    }

    @Shadow
    public abstract java.util.concurrent.CompletableFuture<java.lang.Void> reloadResourcePacks();

    /**
     * 补出的方法：对应 Embeddium core.MinecraftClientMixin 的 @Inject 目标
     * （reloadResourcePacks 无参版，SRG 名 m_91391_）。
     */
    public java.util.concurrent.CompletableFuture<java.lang.Void> m_91391_() {
        return this.reloadResourcePacks();
    }

    public void m_91280_() {
        this.pickBlock();
    }

    /**
     * 补出的方法：对应 Configuration MinecraftMixin 的 @Inject 目标
     * （onGameLoadFinished，SRG 名 m_286052_）。
     */
    public void m_286052_() {
        this.onGameLoadFinished();
    }

    @Shadow
    abstract java.util.concurrent.CompletableFuture<java.lang.Void> reloadResourcePacks(boolean b);

    /**
     * 补出的方法：对应 KubeJS MinecraftClientMixin 的 @Inject 目标
     * （createTitle，SRG 名 m_91270_）。
     */
    public String m_91270_() {
        return this.createTitle();
    }

    /**
     * 补出的方法：对应 Architectury MixinMinecraft 的 @Inject 目标
     * （run，SRG 名 m_91374_，由 architectury_minecraft_run.js CoreMod 提供）。
     */

    /**
     * 补出的方法：对应 Oculus MixinMinecraft_PipelineManagement 的 @Inject 目标
     * （setLevel，SRG 名 m_91156_）。
     */
    public void m_91156_(net.minecraft.client.multiplayer.ClientLevel level) {
        this.setLevel(level);
    }

    /**
     * 补出的方法：对应 Oculus MixinMinecraft_PipelineManagement 的 @Inject 目标
     * （updateLevelInEngines，SRG 名 m_91324_）。
     */
    public void m_91324_(net.minecraft.client.multiplayer.ClientLevel level) {
        this.updateLevelInEngines(level);
    }

    /**
     * 补出的方法：对应 Goety MinecraftMixin 的 @Inject 目标
     * （shouldEntityAppearGlowing，SRG 名 m_91314_）。
     */
    public boolean m_91314_(net.minecraft.world.entity.Entity entity) {
        return this.shouldEntityAppearGlowing(entity);
    }

    /**
     * 补出的方法：对应 ModernFix blast_search_trees MinecraftMixin 的 @Inject 目标
     * （createSearchTrees，SRG 名 m_91271_）。
     */
    public void m_91271_() {
        this.createSearchTrees();
    }
}
