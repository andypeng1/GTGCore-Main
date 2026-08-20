package com.andypeng1.gtgcore.machines; // 替换成你自己的包名

import com.gregtechceu.gtceu.api.machine.IMachineBlockEntity;
import com.gregtechceu.gtceu.api.machine.TickableSubscription;
import com.gregtechceu.gtceu.api.machine.multiblock.WorkableElectricMultiblockMachine;

import net.minecraft.core.BlockPos;
import net.minecraft.world.entity.item.ItemEntity;
import net.minecraft.world.level.levelgen.structure.BoundingBox;
import net.minecraft.world.phys.AABB;
import net.minecraftforge.items.IItemHandler;
import net.minecraftforge.items.ItemHandlerHelper;

import org.jetbrains.annotations.NotNull;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.ParametersAreNonnullByDefault;

@ParametersAreNonnullByDefault
public class LargeGasCollector extends WorkableElectricMultiblockMachine {

    // ① 基础构造函数：用于创建机器实例
    public LargeGasCollector(IMachineBlockEntity info) {
        super(info);
    }

    // ② 如果你有自定义的方块实体 (BlockEntity)，需要这个构造函数
    // 如果你的机器没有特殊的 BlockEntity 需求，可以省略
    // public LargeMacerationTowerMachine(IMachineBlockEntity holder) {
    //     super(holder);
    // }
}