package com.andypeng1.gtgcore.machines;

import com.gregtechceu.gtceu.api.machine.IMachineBlockEntity;
import com.gregtechceu.gtceu.api.machine.multiblock.WorkableElectricMultiblockMachine;
import com.gregtechceu.gtceu.api.recipe.GTRecipeType;
import com.gregtechceu.gtceu.common.data.GTRecipeTypes;

public class LargeGasCollector extends WorkableElectricMultiblockMachine {

    public LargeGasCollector(IMachineBlockEntity holder, Object... args) {
        super(holder, args);
    }

    @Override
    public GTRecipeType getRecipeType() {
        return GTRecipeTypes.GAS_COLLECTOR_RECIPES;
    }

}