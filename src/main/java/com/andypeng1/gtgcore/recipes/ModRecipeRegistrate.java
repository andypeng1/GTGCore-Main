package com.andypeng1.gtgcore.recipes;

import com.gregtechceu.gtceu.api.recipe.GTRecipeType;
import com.gregtechceu.gtceu.common.data.GTMaterials;
import com.gregtechceu.gtceu.common.data.GTRecipeTypes;
import net.minecraft.data.recipes.FinishedRecipe;
import java.util.function.Consumer;
import net.minecraft.world.level.Level;

public class ModRecipeRegistrate {
    public static void init(Consumer<FinishedRecipe> provider){
        GTRecipeType recipeType = GTRecipeTypes.GAS_COLLECTOR_RECIPES;
        recipeType.recipeBuilder("overworld_air")
                .outputFluids(GTMaterials.Air.getFluid(100 * 1000))
                .duration(200).EUt(120)
                .addData("dimension", Level.OVERWORLD.location().toString())
                .circuitMeta(1)
                .save(provider);

        recipeType.recipeBuilder("nether_air")
                .outputFluids(GTMaterials.NetherAir.getFluid(100 * 1000))
                .duration(200).EUt(120)
                .addData("dimension", Level.NETHER.location().toString())
                .circuitMeta(1)
                .save(provider);

        recipeType.recipeBuilder("the_end")
                .outputFluids(GTMaterials.EnderAir.getFluid(100 * 1000))
                .duration(200).EUt(120)
                .addData("dimension", Level.END.location().toString())
                .circuitMeta(1)
                .save(provider);

        recipeType.recipeBuilder("liquid_overworld_air")
                .outputFluids(GTMaterials.LiquidAir.getFluid(100 * 1000))
                .duration(200).EUt(120)
                .addData("dimension", Level.OVERWORLD.location().toString())
                .circuitMeta(2)
                .save(provider);

        recipeType.recipeBuilder("liquid_nether_air")
                .outputFluids(GTMaterials.LiquidEnderAir.getFluid(100 * 1000))
                .duration(200).EUt(120)
                .addData("dimension", Level.NETHER.location().toString())
                .circuitMeta(2)
                .save(provider);

        recipeType.recipeBuilder("liquid_the_end")
                .outputFluids(GTMaterials.LiquidEnderAir.getFluid(100 * 1000))
                .duration(200).EUt(120)
                .addData("dimension", Level.END.location().toString())
                .circuitMeta(2)
                .save(provider);

    }
}
