package com.andypeng1.gtgcore;

import com.andypeng1.gtgcore.machines.LargeGasCollector;
import com.gregtechceu.gtceu.GTCEu;
import com.gregtechceu.gtceu.api.data.RotationState;
import com.gregtechceu.gtceu.api.machine.MultiblockMachineDefinition;
import com.gregtechceu.gtceu.api.machine.multiblock.PartAbility;
import com.gregtechceu.gtceu.api.pattern.FactoryBlockPattern;
import com.gregtechceu.gtceu.api.pattern.util.RelativeDirection;
import com.gregtechceu.gtceu.api.pattern.Predicates;
import com.gregtechceu.gtceu.api.registry.registrate.GTRegistrate;
import com.gregtechceu.gtceu.common.data.GTBlocks;
import com.gregtechceu.gtceu.common.data.GTMachines;
import com.gregtechceu.gtceu.common.data.GTRecipeModifiers;
import com.gregtechceu.gtceu.common.data.GTRecipeTypes;
import net.minecraft.ChatFormatting;
import net.minecraft.network.chat.Component;

import static com.gregtechceu.gtceu.api.pattern.Predicates.blocks;
import static com.gregtechceu.gtceu.api.pattern.Predicates.controller;

public class MachineRegistrate {
    public static final GTRegistrate REGISTRATE = GtgCore.REGISTRATE;
    public static MultiblockMachineDefinition LARGE_GAS_COLLECTOR = null;
    static {
        REGISTRATE.creativeModeTab(() -> GtgCore.GTG_CORE_TAB);
    }
    static {
        LARGE_GAS_COLLECTOR = REGISTRATE
                .multiblock("large_gas_collector", LargeGasCollector::new)
                .langValue("Large Gas Collector")
                .tooltips(
                        Component.literal("超频不会损失能效").withStyle(ChatFormatting.GOLD),
                        Component.literal("通过并行控制仓让机器同时处理多个相同配方"),
                        Component.literal("可用配方类型：集气室"))
                .recipeType(GTRecipeTypes.GAS_COLLECTOR_RECIPES)
                .recipeModifiers(GTRecipeModifiers.OC_PERFECT, GTRecipeModifiers.PARALLEL_HATCH)
                .appearanceBlock(GTBlocks.CASING_STEEL_SOLID)

                .rotationState(RotationState.NON_Y_AXIS)
                .pattern(definition -> FactoryBlockPattern.start(RelativeDirection.LEFT, RelativeDirection.FRONT, RelativeDirection.UP)
                        .aisle("XXXXX", "XXXXX", "XXXXX", "XXXXX", "XXXXX")
                        .aisle("XVVVX", "VGGGV", "VGGGV", "VGGGV", "XVVVX")
                        .aisle("XVVVX", "VGGGV", "VGSGV", "VGGGV", "XVVVX")
                        .aisle("XVVVX", "VGGGV", "VGGGV", "VGGGV", "XVVVX")
                        .aisle("XXXXX", "XXXXX", "XXCXX", "XXXXX", "XXXXX")
                        .where('C', controller(blocks(definition.get())))
                        .where("X", Predicates.blocks(GTBlocks.CASING_STEEL_SOLID.get())
                                .setMinGlobalLimited(40)
                                .or(Predicates.abilities(PartAbility.MAINTENANCE).setExactLimit(1))
                                .or(Predicates.abilities(PartAbility.INPUT_ENERGY)
                                        .setMinGlobalLimited(1)
                                        .setMaxGlobalLimited(2))
                                .or(Predicates.abilities(PartAbility.EXPORT_FLUIDS).setExactLimit(1))
                                .or(Predicates.abilities(PartAbility.IMPORT_ITEMS).setMaxGlobalLimited(1))
                                .or(Predicates.abilities(PartAbility.PARALLEL_HATCH).setMaxGlobalLimited(1)))
                        .where("V", blocks(GTBlocks.CASING_GRATE.get()))
                        .where("G", blocks(GTBlocks.CASING_TUNGSTENSTEEL_PIPE.get()))
                        .where("S", blocks(GTBlocks.HERMETIC_CASING_IV.get()))
                        .build())
                .workableCasingModel(
                        GTCEu.id("block/casings/solid/machine_casing_solid_steel"),
                        GtgCore.id("block/machine/large_gas_collector")
                )
                .register();
    }
    public static void init() {}
}