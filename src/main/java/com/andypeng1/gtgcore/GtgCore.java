package com.andypeng1.gtgcore;

import com.andypeng1.gtgcore.recipes.ModRecipeProvider;
import com.andypeng1.gtgcore.recipes.ModRecipeRegistrate;
import com.gregtechceu.gtceu.api.recipe.GTRecipeType;
import com.gregtechceu.gtceu.api.registry.registrate.GTRegistrate;
import com.gregtechceu.gtceu.common.data.GTCreativeModeTabs;
import com.gregtechceu.gtceu.common.data.GTItems;
import com.mojang.logging.LogUtils;
import com.tterrag.registrate.util.entry.RegistryEntry;
import net.minecraft.data.DataGenerator;
import net.minecraft.data.PackOutput;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.world.item.CreativeModeTab;
import com.gregtechceu.gtceu.api.GTCEuAPI;
import com.gregtechceu.gtceu.api.machine.MachineDefinition;
import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.common.data.ExistingFileHelper;
import net.minecraftforge.eventbus.api.IEventBus;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.config.ModConfig;
import net.minecraftforge.fml.javafmlmod.FMLJavaModLoadingContext;
import org.slf4j.Logger;

@Mod(GtgCore.MOD_ID)
public class GtgCore {
    public static final String MOD_ID = "gtgcore";
    private static final Logger LOGGER = LogUtils.getLogger();

    // 1. 创建 GTRegistrate 实例
    public static final GTRegistrate REGISTRATE = GTRegistrate.create(MOD_ID);

    // 2. 创造模式标签页（使用 GTRegistrate 的 defaultCreativeTab 方式）
    public static RegistryEntry<CreativeModeTab> GTG_CORE_TAB = null;

    static {
        // 3. 在静态块中创建标签页
        GTG_CORE_TAB = REGISTRATE
                .defaultCreativeTab(MOD_ID,
                        builder -> builder
                                .displayItems(new GTCreativeModeTabs.RegistrateDisplayItemsGenerator(MOD_ID, REGISTRATE))
                                .title(REGISTRATE.addLang("itemGroup", id("creative_tab"), "GTG Core"))
                                .icon(GTItems.QUANTUM_COMPUTER_LuV::asStack)
                                .build())
                .register();

        // 5. 提交所有注册对象到 Forge 注册表
        REGISTRATE.registerRegistrate();
    }

    // 6. 工具方法
    public static ResourceLocation id(String path) {
        return ResourceLocation.parse(MOD_ID + ":" + path);
    }

    public GtgCore(FMLJavaModLoadingContext context) {
        IEventBus modEventBus = context.getModEventBus();

        modEventBus.addGenericListener(GTRecipeType.class, this::registerRecipeTypes);
        modEventBus.addGenericListener(MachineDefinition.class, this::registerMachines);
        // 7. 注册配置
        context.registerConfig(ModConfig.Type.COMMON, Config.SPEC);

        MinecraftForge.EVENT_BUS.register(this);
    }

    private void registerRecipeTypes(GTCEuAPI.RegisterEvent<ResourceLocation, GTRecipeType> event) {
        // init recipes
    }

    private void registerMachines(GTCEuAPI.RegisterEvent<ResourceLocation, MachineDefinition> event) {
        // 4. 机器注册（也在静态块中执行）
        MachineRegistrate.init();
    }
}