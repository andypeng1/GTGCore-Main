package com.andypeng1.gtgcore;
import com.andypeng1.gtgcore.machines.LargeGasCollector;
import com.gregtechceu.gtceu.api.data.RotationState;
import com.gregtechceu.gtceu.api.machine.MultiblockMachineDefinition;
import com.gregtechceu.gtceu.api.machine.multiblock.PartAbility;
import com.gregtechceu.gtceu.api.machine.multiblock.WorkableElectricMultiblockMachine;
import com.gregtechceu.gtceu.api.pattern.FactoryBlockPattern;
import com.gregtechceu.gtceu.api.pattern.Predicates;
import com.gregtechceu.gtceu.api.recipe.GTRecipeType;
import com.gregtechceu.gtceu.api.registry.registrate.GTRegistrate;
import com.gregtechceu.gtceu.api.machine.multiblock.MultiblockControllerMachine;
import com.gregtechceu.gtceu.api.registry.registrate.GTRegistrate;
import com.gregtechceu.gtceu.common.registry.GTRegistration;
import com.gregtechceu.gtceu.common.data.GTBlocks;
import com.gregtechceu.gtceu.common.data.GTRecipeTypes;
import net.minecraft.world.level.block.Block;
import net.minecraft.world.level.block.Blocks;

import static com.gregtechceu.gtceu.api.pattern.Predicates.blocks;
import static com.gregtechceu.gtceu.api.pattern.Predicates.controller;

public class MachineRegistrate {
    public static void init() {}
    public static final GTRegistrate REGISTRATE = GTRegistrate.create("gtgcore");
    public static final MultiblockMachineDefinition LARGE_GAS_COLLECTOR = REGISTRATE
            .multiblock("large_gas_collector", LargeGasCollector::new)
            .langValue("Large Gas Collector")
            .rotationState(RotationState.ALL)
            .recipeType(GTRecipeTypes.GAS_COLLECTOR_RECIPES)
            .pattern(definition -> FactoryBlockPattern.start()
                    .aisle("XXXXX", "XXXXX", "XXXXX", "XXXXX", "XXXXX")
                    .aisle("XVVVX", "AGGGV", "AGGGV", "VGGGV", "XVVVX")
                    .aisle("XVVVX", "AGGGV", "AGSGV", "VGGGV", "XVVVX")
                    .aisle("XVVVX", "AGGGV", "AGGGV", "VGGGV", "XVVVX")
                    .aisle("XXXXX", "XXXXX", "AGCGV", "AGGGA", "XXXXX")
                    .where('C', controller(blocks(definition.get())))
                    .where("X", Predicates.blocks(GTBlocks.CASING_STEEL_SOLID.get())
                            .or(Predicates.autoAbilities(definition.getRecipeTypes()))
                            .or(Predicates.autoAbilities(true, true, true)))
                    .where("V", blocks(GTBlocks.CASING_ASSEMBLY_LINE.get()))
                    .where("G", blocks(GTBlocks.CASING_TUNGSTENSTEEL_PIPE.get()))
                    .where("S", blocks(GTBlocks.FUSION_CASING_MK3.get()))
                    .build())
            .register();
}
