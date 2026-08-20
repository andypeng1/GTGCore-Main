package com.andypeng1.gtgcore;

import com.mojang.logging.LogUtils;
import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.eventbus.api.IEventBus;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.config.ModConfig;
import net.minecraftforge.fml.event.lifecycle.FMLCommonSetupEvent;
import net.minecraftforge.fml.javafmlmod.FMLJavaModLoadingContext;
import org.slf4j.Logger;

/**
 * GTG（格雷科技：银河 / GregTech: Galaxy）整合包核心模组。
 * modid: gtgcore
 */
@Mod(GtgCore.MODID)
public class GtgCore
{
    public static final String MODID = "gtgcore";
    private static final Logger LOGGER = LogUtils.getLogger();

    public GtgCore(FMLJavaModLoadingContext context)
    {
        IEventBus modEventBus = context.getModEventBus();

        modEventBus.addListener(this::commonSetup);

        MachineRegistrate.init();

        // 注册 ForgeConfigSpec，Forge 会负责加载/保存配置文件
        context.registerConfig(ModConfig.Type.COMMON, Config.SPEC);

        MinecraftForge.EVENT_BUS.register(this);
    }

    private void commonSetup(final FMLCommonSetupEvent event)
    {
        LOGGER.info("GTG Core (GregTech: Galaxy) loaded");
    }
}
