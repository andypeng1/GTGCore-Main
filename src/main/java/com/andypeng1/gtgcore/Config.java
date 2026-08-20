package com.andypeng1.gtgcore;

import com.gregtechceu.gtceu.api.machine.MultiblockMachineDefinition;
import net.minecraftforge.common.ForgeConfigSpec;

/**
 * GTG Core 通用配置骨架（ForgeConfigSpec）。
 * 后续自定义配置项在这里通过 BUILDER 定义。
 */
public class Config
{
    private static final ForgeConfigSpec.Builder BUILDER = new ForgeConfigSpec.Builder();

    static final ForgeConfigSpec SPEC = BUILDER.build();

    public static MultiblockMachineDefinition LARGE_GAS_COLLECTOR;

}
