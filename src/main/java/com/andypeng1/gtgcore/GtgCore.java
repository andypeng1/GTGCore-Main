package com.andypeng1.gtgcore;

import com.gregtechceu.gtceu.api.machine.MachineDefinition;
import com.gregtechceu.gtceu.api.registry.GTRegistries;
import com.mojang.logging.LogUtils;
import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.eventbus.api.IEventBus;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.config.ModConfig;
import net.minecraftforge.fml.javafmlmod.FMLJavaModLoadingContext;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.registries.RegisterEvent;
import org.slf4j.Logger;

@Mod(GtgCore.MODID)
@Mod.EventBusSubscriber(modid = GtgCore.MODID, bus = Mod.EventBusSubscriber.Bus.MOD)
public class GtgCore {
    public static final String MODID = "gtgcore";
    private static final Logger LOGGER = LogUtils.getLogger();

    public GtgCore(FMLJavaModLoadingContext context) {
        IEventBus modEventBus = context.getModEventBus();

        // 注册配置
        context.registerConfig(ModConfig.Type.COMMON, Config.SPEC);

        // 注意：不再需要在构造函数中添加监听器，因为 @SubscribeEvent 会处理
        // 但仍需将 Mod 实例注册到 Forge 事件总线（如果有需要的话）
        MinecraftForge.EVENT_BUS.register(this);
    }

    // 改为监听注册表事件，在 GTCEu 的 Machine 注册表解冻之前执行
    @SubscribeEvent
    public static void onRegisterMachine(RegisterEvent event) {
        // 判断是否为 MachineDefinition 注册表
        if (event.getRegistryKey().equals(GTRegistries.MACHINES)) {
            LOGGER.info("GTG Core: Registering custom machines...");
            MachineRegistrate.init();
        }
    }
}