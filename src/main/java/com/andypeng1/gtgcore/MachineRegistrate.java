package com.andypeng1.gtgcore;

import com.andypeng1.gtgcore.machines.LargeGasCollector;
import com.gregtechceu.gtceu.GTCEu;
import com.gregtechceu.gtceu.api.data.RotationState;
import com.gregtechceu.gtceu.api.machine.MultiblockMachineDefinition;
import com.gregtechceu.gtceu.api.machine.multiblock.PartAbility;
import com.gregtechceu.gtceu.api.pattern.FactoryBlockPattern;
import com.gregtechceu.gtceu.api.pattern.Predicates;
import com.gregtechceu.gtceu.api.registry.registrate.GTRegistrate;
import com.gregtechceu.gtceu.common.data.GTBlocks;
import com.gregtechceu.gtceu.common.data.GTMachines;
import com.gregtechceu.gtceu.common.data.GTRecipeModifiers;
import com.gregtechceu.gtceu.common.data.GTRecipeTypes;

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
                .rotationState(RotationState.ALL)
                .recipeType(GTRecipeTypes.GAS_COLLECTOR_RECIPES)
                .recipeModifiers(GTRecipeModifiers.OC_PERFECT)
                .appearanceBlock(GTBlocks.CASING_STEEL_SOLID)
                .rotationState(RotationState.NON_Y_AXIS)
                .pattern(definition -> FactoryBlockPattern.start()
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
                                .or(Predicates.abilities(PartAbility.IMPORT_FLUIDS).setMaxGlobalLimited(0))
                                .or(Predicates.abilities(PartAbility.IMPORT_ITEMS).setMaxGlobalLimited(1))
                                .or(Predicates.abilities(PartAbility.EXPORT_ITEMS).setMaxGlobalLimited(0))
                                .or(Predicates.abilities(PartAbility.MUFFLER).setMaxGlobalLimited(0))
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