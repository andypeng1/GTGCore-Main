package com.andypeng1.gtgcore.machines; // 替换成你自己的包名

import com.gregtechceu.gtceu.api.machine.IMachineBlockEntity;
import com.gregtechceu.gtceu.api.machine.multiblock.WorkableElectricMultiblockMachine;

import javax.annotation.ParametersAreNonnullByDefault;

@ParametersAreNonnullByDefault
public class LargeGasCollector extends WorkableElectricMultiblockMachine {

    // ① 基础构造函数：用于创建机器实例
    public LargeGasCollector(IMachineBlockEntity info) {
        super(info);
    }

}