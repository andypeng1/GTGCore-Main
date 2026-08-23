/**
 * auto-generated dev compat fix (GenerateFixInjections2):
 * rewrite injection method/target values to full names Lowner;MCPname(desc)
 * so refmap lookup misses and selector stays in MCP domain.
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var Type = Java.type('org.objectweb.asm.Type');
    var fixes = [
        ['appeng/mixins/AbstractContainerScreenMixin', 'X', '', ''],
        ['appeng/mixins/AnvilMenuMixin', 'X', '', ''],
        ['appeng/mixins/EarlyStartupMixin', 'X', '', ''],
        ['appeng/mixins/EnchantmentHelperMixin', 'X', '', ''],
        ['appeng/mixins/GuiGraphicsMixin', 'M', 'Lnet/minecraft/client/gui/GuiGraphics;renderItem(Lnet/minecraft/world/entity/LivingEntity;Lnet/minecraft/world/level/Level;Lnet/minecraft/world/item/ItemStack;IIII)V', 'renderItem(Lnet/minecraft/world/entity/LivingEntity;Lnet/minecraft/world/level/Level;Lnet/minecraft/world/item/ItemStack;IIII)V'],
        ['appeng/mixins/ItemEntityMixin', 'A', 'm_32055_', 'getItem'],
        ['appeng/mixins/ModelBakeryMixin', 'A', 'm_119352_', 'cacheAndQueueDependencies'],
        ['appeng/mixins/PickColorMixin', 'X', '', ''],
        ['appeng/mixins/PonderWorldMixin', 'R', '', ''],
        ['appeng/mixins/ResizableSlotHighlightMixin', 'X', '', ''],
        ['appeng/mixins/StructureTemplateMixin', 'X', '', ''],
        ['appeng/mixins/TextureAtlasMixin', 'X', '', ''],
        ['appeng/mixins/UnbreakingMixin', 'X', '', ''],
        ['appeng/mixins/VariantDeserializerMixin', 'X', '', ''],
        ['appeng/mixins/WrappedGenericStackTooltipModIdMixin', 'X', '', ''],
        ['appeng/mixins/chunkloading/ChunkMapMixin', 'X', '', ''],
        ['appeng/mixins/spatial/MinecraftServerMixin', 'X', '', ''],
        ['appeng/mixins/tests/StructureUtilsMixin', 'X', '', ''],
        ['cn/elytra/mod/gtmqol/mixins/GT_DrumOutput', 'R', '', ''],
        ['cn/elytra/mod/gtmqol/mixins/GT_QuantumTankCapacity', 'R', '', ''],
        ['cn/elytra/mod/gtmqol/mixins/GT_TankPickup', 'R', '', ''],
        ['com/Polarice3/Goety/mixin/AbstractArrowMixin', 'X', '', ''],
        ['com/Polarice3/Goety/mixin/AbstractClientPlayerMixin', 'X', '', ''],
        ['com/Polarice3/Goety/mixin/ApplyBonusCountMixin', 'X', '', ''],
        ['com/Polarice3/Goety/mixin/ArrowItemMixin', 'X', '', ''],
        ['com/Polarice3/Goety/mixin/BaseFireBlockMixin', 'X', '', ''],
        ['com/Polarice3/Goety/mixin/BlockPlaceContextMixin', 'X', '', ''],
        ['com/Polarice3/Goety/mixin/ChorusFlowerBlockMixin', 'A', 'm_51661_', 'placeGrownFlower'],
        ['com/Polarice3/Goety/mixin/ChorusPlantBlockMixin', 'M', 'Lnet/minecraft/world/level/block/ChorusPlantBlock;getStateForPlacement(Lnet/minecraft/world/level/BlockGetter;Lnet/minecraft/core/BlockPos;)Lnet/minecraft/world/level/block/state/BlockState;', 'getStateForPlacement(Lnet/minecraft/world/level/BlockGetter;Lnet/minecraft/core/BlockPos;)Lnet/minecraft/world/level/block/state/BlockState;'],
        ['com/Polarice3/Goety/mixin/EnchantRandomlyFunctionMixin', 'X', '', ''],
        ['com/Polarice3/Goety/mixin/EnchantmentHelperMixin', 'X', '', ''],
        ['com/Polarice3/Goety/mixin/EnderDragonMixin', 'X', '', ''],
        ['com/Polarice3/Goety/mixin/EntityMixin', 'X', '', ''],
        ['com/Polarice3/Goety/mixin/EntityRenderersMixin', 'X', '', ''],
        ['com/Polarice3/Goety/mixin/FlowingFluidMixin', 'X', '', ''],
        ['com/Polarice3/Goety/mixin/FrogMixin', 'X', '', ''],
        ['com/Polarice3/Goety/mixin/GuiGraphicsMixin', 'X', '', ''],
        ['com/Polarice3/Goety/mixin/ItemEntityMixin', 'A', 'm_32055_', 'getItem'],
        ['com/Polarice3/Goety/mixin/LevelRendererMixin', 'X', '', ''],
        ['com/Polarice3/Goety/mixin/LivingEntityMixin', 'A', 'm_21023_', 'hasEffect'],
        ['com/Polarice3/Goety/mixin/LivingEntityMixin', 'A', 'm_21221_', 'getActiveEffectsMap'],
        ['com/Polarice3/Goety/mixin/LivingEntityMixin', 'A', 'm_21233_', 'getMaxHealth'],
        ['com/Polarice3/Goety/mixin/LivingEntityMixin', 'A', 'm_213860_', 'getExperienceReward'],
        ['com/Polarice3/Goety/mixin/LivingEntityMixin', 'A', 'm_217046_', 'wasExperienceConsumed'],
        ['com/Polarice3/Goety/mixin/LivingEntityMixin', 'A', 'm_6124_', 'isAlwaysExperienceDropper'],
        ['com/Polarice3/Goety/mixin/LivingEntityMixin', 'A', 'm_6336_', 'getMobType'],
        ['com/Polarice3/Goety/mixin/LivingEntityRendererMixin', 'X', '', ''],
        ['com/Polarice3/Goety/mixin/LocalPlayerMixin', 'X', '', ''],
        ['com/Polarice3/Goety/mixin/MinecraftMixin', 'X', '', ''],
        ['com/Polarice3/Goety/mixin/MouseHandlerMixin', 'X', '', ''],
        ['com/Polarice3/Goety/mixin/PatrolSpawnerMixin', 'X', '', ''],
        ['com/Polarice3/Goety/mixin/PlayerMixin', 'X', '', ''],
        ['com/Polarice3/Goety/mixin/ProjectileMixin', 'X', '', ''],
        ['com/Polarice3/Goety/mixin/RaidMixin', 'A', 'm_37762_', 'isStopped'],
        ['com/Polarice3/Goety/mixin/RaidMixin', 'A', 'm_37767_', 'isVictory'],
        ['com/Polarice3/Goety/mixin/RaidMixin', 'A', 'm_37773_', 'getBadOmenLevel'],
        ['com/Polarice3/Goety/mixin/RaidMixin', 'A', 'm_37774_', 'stop'],
        ['com/Polarice3/Goety/mixin/RaiderMixin', 'X', '', ''],
        ['com/Polarice3/Goety/mixin/SensorMixin', 'X', '', ''],
        ['com/Polarice3/Goety/mixin/SlimePredicateMixin', 'X', '', ''],
        ['com/Polarice3/Goety/mixin/SpinAttackEffectLayerMixin', 'X', '', ''],
        ['com/Polarice3/Goety/mixin/StructureTemplateMixin', 'X', '', ''],
        ['com/Polarice3/Goety/mixin/VillagerMixin', 'A', 'm_35524_', 'releaseAllPois'],
        ['com/Polarice3/Goety/mixin/compat/SiphonEnchantmentMixin', 'R', '', ''],
        ['com/aewireless/mixin/AEBaseScreenMixin', 'R', '', ''],
        ['com/aewireless/mixin/AETextFieldMixin', 'R', '', ''],
        ['com/aewireless/mixin/PartPlacementMixin', 'R', '', ''],
        ['com/almostreliable/merequester/mixin/compat/JEIItemSlotTargetMixin', 'R', '', ''],
        ['com/almostreliable/merequester/mixin/compat/REIItemSlotTargetMixin', 'R', '', ''],
        ['com/almostreliable/merequester/mixin/registration/AEPartsMixin', 'R', '', ''],
        ['com/almostreliable/merequester/mixin/registration/InitMenuTypesMixin', 'R', '', ''],
        ['com/almostreliable/merequester/mixin/registration/InitScreensMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/advancedae/AdvPatternProviderLogicContainsRedirectMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/advancedae/client/gui/AdvPatternProviderScreenMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/advancedae/client/gui/SmallAdvPatternProviderScreenMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/advancedae/compat/PatternProviderLogicVirtualCompletionMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/advancedae/crafting/AdvCraftingCPULogicManualWaitingMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/advancedae/helpers/AdvPatternProviderLogicAdvancedMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/advancedae/helpers/AdvPatternProviderLogicDoublingMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/advancedae/menu/AdvPatternProviderMenuAdvancedMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/advancedae/menu/AdvPatternProviderMenuDoublingMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/advancedae/menu/CraftingCPUMenuManualStatusAdvancedMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/CraftingCPUClusterMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/CraftingCalculationMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/EncodedPatternItemMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/autopattern/CraftingCalculationMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/autopattern/CraftingServiceGetProvidersMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/autopattern/CraftingSimulationStateMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/autopattern/PatternProviderLogicContainsRedirectMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/client/gui/AEBaseScreenMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/client/gui/CraftConfirmScreenMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/client/gui/CraftingStatusTableRendererMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/client/gui/InterfaceScreenMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/client/gui/PatternEncodingTermScreenMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/client/gui/ProcessingEncodingPanelMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/client/gui/SlotGridLayoutMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/client/gui/patternProvider/PatternProviderHighlightCleanupMixin', 'X', '', ''],
        ['com/extendedae_plus/mixin/ae2/client/gui/patternProvider/PatternProviderScreenMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/client/gui/patternProvider/PatternProviderSmartFeaturesMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/compat/PatternProviderCompatMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/compat/PatternProviderLogicCompatMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/crafting/CraftingCpuLogicManualWaitingMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/helpers/InterfaceLogicChannelCardMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/helpers/InterfaceLogicTickerMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/helpers/InterfaceLogicUpgradesMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/helpers/patternprovider/PatternProviderLogicAdvancedMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/helpers/patternprovider/PatternProviderLogicDoublingMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/helpers/patternprovider/PatternProviderLogicSyncVersionMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/helpers/patternprovider/PatternProviderLogicTickerMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/items/MemoryCardItemMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/items/QuartzCuttingKnifeItemMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/menu/ContainerPatternEncodingTermMenuMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/menu/CraftConfirmMenuForceStartMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/menu/CraftConfirmMenuGoBackMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/menu/CraftingCPUMenuManualStatusMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/menu/MEStorageMenuMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/menu/PatternEncodingTermMenuMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/menu/PatternProviderMenuAdvancedMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/menu/PatternProviderMenuDoublingMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/parts/AEBasePartClientSyncMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/parts/automation/IOBusPartChannelCardMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/parts/automation/IOBusPartTickerChannelCardMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/parts/storagebus/StorageBusPartChannelCardMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2/parts/storagebus/StorageBusPartTickerChannelCardMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/ae2WTlib/ContainerUWirelessExPatternTerminalMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/appflux/AppfluxPatternProviderLogicMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/extendedae/client/HighlightButtonMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/extendedae/client/gui/GuiAssemblerMatrixPatternInfoMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/extendedae/client/gui/GuiExPatternProviderMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/extendedae/client/gui/GuiExPatternTerminalMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/extendedae/common/PartExPatternProviderMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/extendedae/common/TileExPatternProviderMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/extendedae/common/matrix/ClusterAssemblerMatrixMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/extendedae/container/ContainerAssemblerMatrixPatternSlotTrackerMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/extendedae/container/ContainerExPatternProviderMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/extendedae/container/ContainerExPatternTerminalMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/extendedae/container/ContainerWirelessExPatternTerminalMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/guideme/ItemLinkCompilerMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/guideme/MdxAttrsMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/jei/EncodePatternTransferHandlerMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/jei/EncodingHelperMixin', 'R', '', ''],
        ['com/extendedae_plus/mixin/minecraft/ModelBakeryMixin', 'A', 'm_119352_', 'cacheAndQueueDependencies'],
        ['com/extendedae_plus/mixin/minecraft/PickFromWirelessMixin', 'X', '', ''],
        ['com/finshope/gtsecore/mixin/MixinHelpersMixin', 'R', '', ''],
        ['com/glodblock/github/extendedae/mixins/MixinAEBaseMenu', 'R', '', ''],
        ['com/glodblock/github/extendedae/mixins/MixinAEBasePart', 'R', '', ''],
        ['com/glodblock/github/extendedae/mixins/MixinAbstractContainerScreen', 'X', '', ''],
        ['com/glodblock/github/extendedae/mixins/MixinAbstractLevelEmitterPart', 'R', '', ''],
        ['com/glodblock/github/extendedae/mixins/MixinClearPatternAccessTerminalPacket', 'R', '', ''],
        ['com/glodblock/github/extendedae/mixins/MixinGlobalWireNetwork', 'R', '', ''],
        ['com/glodblock/github/extendedae/mixins/MixinPatternAccessTermMenu', 'R', '', ''],
        ['com/glodblock/github/extendedae/mixins/MixinPatternAccessTerminalPacket', 'R', '', ''],
        ['com/glodblock/github/extendedae/mixins/MixinRecipeManager', 'A', 'm_44054_', 'byType'],
        ['com/glodblock/github/extendedae/mixins/MixinRenderBlockOutlineHook', 'R', '', ''],
        ['com/glodblock/github/extendedae/mixins/MixinScreen', 'X', '', ''],
        ['com/gregtechceu/gtceu/core/mixins/ChunkGeneratorMixin', 'X', '', ''],
        ['com/gregtechceu/gtceu/core/mixins/EntityMixin', 'A', 'm_6095_', 'getType'],
        ['com/gregtechceu/gtceu/core/mixins/LevelMixin', 'X', '', ''],
        ['com/gregtechceu/gtceu/core/mixins/LootDataManagerMixin', 'X', '', ''],
        ['com/gregtechceu/gtceu/core/mixins/OreConfigurationMixin', 'X', '', ''],
        ['com/gregtechceu/gtceu/core/mixins/OreVeinifierMixin', 'X', '', ''],
        ['com/gregtechceu/gtceu/core/mixins/RecipeManagerMixin', 'X', '', ''],
        ['com/gregtechceu/gtceu/core/mixins/RepairItemRecipeMixin', 'X', '', ''],
        ['com/gregtechceu/gtceu/core/mixins/ServerChunkProviderMixin', 'A', 'm_8364_', 'getVisibleChunkIfPresent'],
        ['com/gregtechceu/gtceu/core/mixins/SidedRedstoneConnectivityMixin', 'X', '', ''],
        ['com/gregtechceu/gtceu/core/mixins/SmithingTransformRecipeMixin', 'X', '', ''],
        ['com/gregtechceu/gtceu/core/mixins/TagLoaderMixin', 'X', '', ''],
        ['com/gregtechceu/gtceu/core/mixins/client/BiomeColorsMixin', 'X', '', ''],
        ['com/gregtechceu/gtceu/core/mixins/client/HumanoidArmorLayerMixin', 'X', '', ''],
        ['com/gregtechceu/gtceu/core/mixins/client/ItemEntityMixin', 'X', '', ''],
        ['com/gregtechceu/gtceu/core/mixins/client/LevelRendererMixin', 'A', 'm_109782_', 'renderShape'],
        ['com/gregtechceu/gtceu/core/mixins/client/ModelManagerMixin', 'X', '', ''],
        ['com/gregtechceu/gtceu/core/mixins/client/MultiPlayerGameModeMixin', 'X', '', ''],
        ['com/gregtechceu/gtceu/core/mixins/emi/FluidEmiStackMixin', 'R', '', ''],
        ['com/gregtechceu/gtceu/core/mixins/ftbchunks/FTBChunksClientMixin', 'R', '', ''],
        ['com/gregtechceu/gtceu/core/mixins/ftbchunks/LargeMapScreenMixin', 'R', '', ''],
        ['com/gregtechceu/gtceu/core/mixins/ftbchunks/RegionMapPanelMixin', 'R', '', ''],
        ['com/gregtechceu/gtceu/core/mixins/jei/FluidHelperMixin', 'R', '', ''],
        ['com/gregtechceu/gtceu/core/mixins/ldlib/SyncUtilsMixin', 'R', '', ''],
        ['com/gregtechceu/gtceu/core/mixins/rei/FluidEntryRendererMixin', 'R', '', ''],
        ['com/gregtechceu/gtceu/core/mixins/top/ConfigMixin', 'R', '', ''],
        ['com/gregtechceu/gtceu/core/mixins/xaerominimap/HighlighterRegistryMixin', 'R', '', ''],
        ['com/gregtechceu/gtceu/core/mixins/xaerominimap/MinimapFBORendererMixin', 'R', '', ''],
        ['com/gregtechceu/gtceu/core/mixins/xaeroworldmap/GuiMapMixin', 'R', '', ''],
        ['com/gregtechceu/gtceu/core/mixins/xaeroworldmap/MapElementRenderHandlerBuilderMixin', 'R', '', ''],
        ['com/gregtechceu/gtceu/core/mixins/xaeroworldmap/WorldMapSessionMixin', 'R', '', ''],
        ['com/hepdd/gtmthings/mixin/SimpleTieredMachineMixin', 'R', '', ''],
        ['com/hollingsworth/arsnouveau/common/mixin/CrossbowMixin', 'M', 'Lnet/minecraft/world/item/CrossbowItem;performShooting(Lnet/minecraft/world/level/Level;Lnet/minecraft/world/entity/LivingEntity;Lnet/minecraft/world/InteractionHand;Lnet/minecraft/world/item/ItemStack;FF)V', 'performShooting(Lnet/minecraft/world/level/Level;Lnet/minecraft/world/entity/LivingEntity;Lnet/minecraft/world/InteractionHand;Lnet/minecraft/world/item/ItemStack;FF)V'],
        ['com/hollingsworth/arsnouveau/common/mixin/DamageSourceMixin', 'X', '', ''],
        ['com/hollingsworth/arsnouveau/common/mixin/EntityMixin', 'X', '', ''],
        ['com/hollingsworth/arsnouveau/common/mixin/GameRendererMixin', 'X', '', ''],
        ['com/hollingsworth/arsnouveau/common/mixin/camera/ChunkMapMixin', 'A', 'm_183262_', 'getPlayers'],
        ['com/hollingsworth/arsnouveau/common/mixin/camera/ChunkMapMixin', 'A', 'm_183754_', 'updateChunkTracking'],
        ['com/hollingsworth/arsnouveau/common/mixin/camera/ClientChunkCacheMixin', 'A', 'm_104438_', 'isValidChunk'],
        ['com/hollingsworth/arsnouveau/common/mixin/camera/LevelRendererMixin', 'X', '', ''],
        ['com/hollingsworth/arsnouveau/common/mixin/camera/PlayerListMixin', 'X', '', ''],
        ['com/hollingsworth/arsnouveau/common/mixin/camera/TrackedEntityMixin', 'X', '', ''],
        ['com/hollingsworth/arsnouveau/common/mixin/jar/DispenserMixin', 'A', 'm_7216_', 'getDispenseMethod'],
        ['com/hollingsworth/arsnouveau/common/mixin/light/ClientMixin', 'X', '', ''],
        ['com/hollingsworth/arsnouveau/common/mixin/light/EntityRendererMixin', 'X', '', ''],
        ['com/hollingsworth/arsnouveau/common/mixin/light/LevelRendererMixin', 'X', '', ''],
        ['com/hollingsworth/arsnouveau/common/mixin/light/LightEntityMixin', 'A', 'm_20097_', 'getOnPos'],
        ['com/hollingsworth/arsnouveau/common/mixin/light/LightEntityMixin', 'A', 'm_20182_', 'position'],
        ['com/hollingsworth/arsnouveau/common/mixin/light/LightEntityMixin', 'A', 'm_20183_', 'blockPosition'],
        ['com/hollingsworth/arsnouveau/common/mixin/light/LightEntityMixin', 'A', 'm_20185_', 'getX'],
        ['com/hollingsworth/arsnouveau/common/mixin/light/LightEntityMixin', 'A', 'm_20186_', 'getY'],
        ['com/hollingsworth/arsnouveau/common/mixin/light/LightEntityMixin', 'A', 'm_20188_', 'getEyeY'],
        ['com/hollingsworth/arsnouveau/common/mixin/light/LightEntityMixin', 'A', 'm_20189_', 'getZ'],
        ['com/hollingsworth/arsnouveau/common/mixin/light/LightEntityMixin', 'A', 'm_20246_', 'getZ'],
        ['com/hollingsworth/arsnouveau/common/mixin/light/LightEntityMixin', 'A', 'm_213877_', 'isRemoved'],
        ['com/hollingsworth/arsnouveau/common/mixin/light/LightEntityMixin', 'A', 'm_6095_', 'getType'],
        ['com/hollingsworth/arsnouveau/common/mixin/light/LightEntityMixin', 'A', 'm_9236_', 'level'],
        ['com/hollingsworth/arsnouveau/common/mixin/perks/PerkLivingEntity', 'X', '', ''],
        ['com/hollingsworth/arsnouveau/common/mixin/redstone/RedstoneLevelMixin', 'X', '', ''],
        ['com/hollingsworth/arsnouveau/common/mixin/rewind/RewindEntityMixin', 'A', 'm_142687_', 'remove'],
        ['com/hollingsworth/arsnouveau/common/mixin/rewind/RewindEntityMixin', 'A', 'm_20137_', 'removeTag'],
        ['com/hollingsworth/arsnouveau/common/mixin/rewind/RewindEntityMixin', 'A', 'm_20182_', 'position'],
        ['com/hollingsworth/arsnouveau/common/mixin/rewind/RewindEntityMixin', 'A', 'm_20184_', 'getDeltaMovement'],
        ['com/hollingsworth/arsnouveau/common/mixin/rewind/RewindEntityMixin', 'A', 'm_9236_', 'level'],
        ['com/hollingsworth/arsnouveau/common/mixin/structure/StructureTemplateMixin', 'X', '', ''],
        ['com/lowdragmc/lowdraglib/core/mixins/BlockEntityMixin', 'X', '', ''],
        ['com/lowdragmc/lowdraglib/core/mixins/BlockEntityRendererDispatcherMixin', 'X', '', ''],
        ['com/lowdragmc/lowdraglib/core/mixins/BlockModelShaperMixin', 'X', '', ''],
        ['com/lowdragmc/lowdraglib/core/mixins/ClientPacketListenerMixin', 'X', '', ''],
        ['com/lowdragmc/lowdraglib/core/mixins/ItemModelShaperMixin', 'X', '', ''],
        ['com/lowdragmc/lowdraglib/core/mixins/ItemRendererMixin', 'X', '', ''],
        ['com/lowdragmc/lowdraglib/core/mixins/LanguageMixin', 'X', '', ''],
        ['com/lowdragmc/lowdraglib/core/mixins/ModelBakeryMixin', 'A', 'm_119352_', 'cacheAndQueueDependencies'],
        ['com/lowdragmc/lowdraglib/core/mixins/ModelBakeryMixin', 'A', 'm_119364_', 'loadBlockModel'],
        ['com/lowdragmc/lowdraglib/core/mixins/PackConfigMixin', 'X', '', ''],
        ['com/lowdragmc/lowdraglib/core/mixins/ParticleEngineMixin', 'X', '', ''],
        ['com/lowdragmc/lowdraglib/core/mixins/ReloadableResourceManagerMixin', 'X', '', ''],
        ['com/lowdragmc/lowdraglib/core/mixins/SpriteResourceLoaderMixin', 'X', '', ''],
        ['com/lowdragmc/lowdraglib/core/mixins/WorldLoaderMixin', 'X', '', ''],
        ['com/lowdragmc/lowdraglib/core/mixins/WorldRendererMixin', 'X', '', ''],
        ['com/lowdragmc/lowdraglib/core/mixins/emi/EmiRenderHelperMixin', 'R', '', ''],
        ['com/lowdragmc/lowdraglib/core/mixins/emi/RecipeScreenMixin', 'R', '', ''],
        ['com/lowdragmc/lowdraglib/core/mixins/emi/WidgetGroupMixin', 'R', '', ''],
        ['com/lowdragmc/lowdraglib/core/mixins/jei/RecipeSlotMixin', 'R', '', ''],
        ['com/lowdragmc/lowdraglib/forge/core/mixins/BlockRenderDispatcherMixin', 'X', '', ''],
        ['com/lowdragmc/lowdraglib/forge/core/mixins/ModelBakerImplMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/BindingCurseEnchantmentMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/EditBoxMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/EnchantmentMixin', 'A', 'm_6589_', 'isCurse'],
        ['com/mega/endinglib/mixin/ItemEntityMixin', 'A', 'm_32055_', 'getItem'],
        ['com/mega/endinglib/mixin/ItemRendererMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/ItemStackMixin', 'A', 'm_41720_', 'getItem'],
        ['com/mega/endinglib/mixin/MinecraftMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/DisplayMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/EntityDimensionsMixin', 'A', 'm_20388_', 'scale'],
        ['com/mega/endinglib/mixin/advanced/EntityDimensionsMixin', 'A', 'm_20390_', 'scale'],
        ['com/mega/endinglib/mixin/advanced/ExecuteCommandMixin', 'A', 'm_137117_', 'storeData'],
        ['com/mega/endinglib/mixin/advanced/client/LevelRendererMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/client/PlayerRendererMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/client/PostPassMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/client/ShaderInstanceMixin', 'A', 'm_173348_', 'getUniform'],
        ['com/mega/endinglib/mixin/advanced/client/VertexBufferMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/client/custom_style/ChatFormattingMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/client/custom_style/FontMixin', 'A', 'm_92724_', 'width'],
        ['com/mega/endinglib/mixin/advanced/client/custom_style/GuiGraphicsMixin', 'A', 'm_280444_', 'innerBlit'],
        ['com/mega/endinglib/mixin/advanced/client/custom_style/GuiGraphicsMixin', 'A', 'm_280479_', 'innerBlit'],
        ['com/mega/endinglib/mixin/advanced/client/custom_style/StyleMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/client/custom_style/StyleSerializerMixin', 'A', 'm_131205_', 'getOptionalFlag'],
        ['com/mega/endinglib/mixin/advanced/client/custom_style/TextColorMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/client/custom_style/modernui/TooltipRendererMixin', 'R', '', ''],
        ['com/mega/endinglib/mixin/advanced/client/embeddium/LevelRendererMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/client/registry/ClientPacketListenerMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/config/ClientLevelMixin', 'A', 'm_104639_', 'tickNonPassenger'],
        ['com/mega/endinglib/mixin/advanced/config/ClientLevelMixin', 'A', 'm_6907_', 'players'],
        ['com/mega/endinglib/mixin/advanced/config/LevelMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/config/ServerLevelMixin', 'A', 'm_143342_', 'shouldDiscardEntity'],
        ['com/mega/endinglib/mixin/advanced/config/ServerLevelMixin', 'A', 'm_8647_', 'tickNonPassenger'],
        ['com/mega/endinglib/mixin/advanced/data_command/EntityDataAccessorMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/data_command/KeyMappingMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/data_command/ToggleKeyMappingMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/data_expand/InteractionEntityMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/data_expand/LivingEntityMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/data_expand/ServerPlayerMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/AbstractArrowMixin', 'A', 'm_7941_', 'getPickupItem'],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/AbstractPiglinMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/AnimalMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/ArmorItemMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/ArrowItemMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/AxolotlMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/ClientPacketListenerMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/CompoundTagMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/DispenserBlockMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/ElytraItemMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/ForgeGuiMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/ForgeHooksMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/GiveCommandMixin', 'A', 'm_214445_', 'register'],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/HumanoidArmorLayerMixin', 'A', 'm_117080_', 'getArmorLocation'],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/HumanoidArmorLayerMixin', 'A', 'm_117125_', 'setPartVisibility'],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/HumanoidArmorLayerMixin', 'A', 'm_117128_', 'usesInnerModel'],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/ItemEntityMixin', 'A', 'm_32055_', 'getItem'],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/ItemInHandRendererMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/ItemMixin', 'A', 'm_8102_', 'getDestroySpeed'],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/ItemRendererMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/ItemStackMixin', 'A', 'm_41622_', 'hurtAndBreak'],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/ItemStackMixin', 'A', 'm_41720_', 'getItem'],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/ItemStackMixin', 'A', 'm_41777_', 'copy'],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/ItemStackMixin', 'A', 'm_41779_', 'getUseDuration'],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/ItemStackMixin', 'A', 'm_41783_', 'getTag'],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/ItemStackMixin', 'A', 'm_41784_', 'getOrCreateTag'],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/LivingEntityMixin', 'A', 'm_142687_', 'remove'],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/LivingEntityMixin', 'A', 'm_21120_', 'getItemInHand'],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/LivingEntityMixin', 'A', 'm_21153_', 'setHealth'],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/LivingEntityMixin', 'A', 'm_21211_', 'getUseItem'],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/LivingEntityMixin', 'A', 'm_21254_', 'isBlocking'],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/LivingEntityMixin', 'A', 'm_6117_', 'isUsingItem'],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/LivingEntityMixin', 'A', 'm_6728_', 'blockUsingShield'],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/LivingEntityMixin', 'A', 'm_6844_', 'getItemBySlot'],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/LivingEntityMixin', 'A', 'm_7655_', 'getUsedItemHand'],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/LocalPlayerMixin', 'A', 'm_6117_', 'isUsingItem'],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/PlayerMixin', 'A', 'm_36403_', 'getAttackStrengthScale'],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/ShieldItemMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/ThrownTridentMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/TieredItemMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/TrimMaterialsMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/entity_data/ArrowMixin', 'A', 'm_7380_', 'addAdditionalSaveData'],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/loom_menu/LoomMenu4Mixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/loom_menu/LoomMenuMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/tool/DiggerItemMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/tool/ShearsItemMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/tool/SwordItemMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/tool/TridentItemMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/data_expand/dynamic_keys/OptionsMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/data_expand/multi_jump/LocalPlayerMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/data_expand/scoreboard/GuiMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/function/CommandFunctionMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/advanced/function/FunctionCommandMixin', 'A', 'm_137723_', 'runFunction'],
        ['com/mega/endinglib/mixin/advanced/function/ServerFunctionManagerMixin', 'A', 'm_136127_', 'getDispatcher'],
        ['com/mega/endinglib/mixin/advanced/function/ServerFunctionManagerMixin', 'A', 'm_179960_', 'execute'],
        ['com/mega/endinglib/mixin/camera/CameraMixin', 'A', 'm_90566_', 'getMaxZoom'],
        ['com/mega/endinglib/mixin/camera/CameraMixin', 'A', 'm_90572_', 'setRotation'],
        ['com/mega/endinglib/mixin/camera/CameraMixin', 'A', 'm_90584_', 'setPosition'],
        ['com/mega/endinglib/mixin/camera/GameRendererMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/camera/LocalPlayerMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/camera/MouseHandlerMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/camera/OptionInstanceMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/camera/OptionsMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/capability/CapabilityProviderMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/capability/EntityMixin', 'A', 'm_142242_', 'makeBoundingBox'],
        ['com/mega/endinglib/mixin/capability/EntityMixin', 'A', 'm_19879_', 'getId'],
        ['com/mega/endinglib/mixin/capability/LivingEntityMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/capability/LocalPlayerMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/capability/ServerEntityMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/capability/ServerPlayerMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/capability/display/DisplayMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/codec/MobEffectInstanceMixin', 'A', 'm_19557_', 'getDuration'],
        ['com/mega/endinglib/mixin/codec/MobEffectInstanceMixin', 'A', 'm_19564_', 'getAmplifier'],
        ['com/mega/endinglib/mixin/codec/MobEffectInstanceMixin', 'A', 'm_19571_', 'isAmbient'],
        ['com/mega/endinglib/mixin/codec/MobEffectInstanceMixin', 'A', 'm_19572_', 'isVisible'],
        ['com/mega/endinglib/mixin/compat/bettercombat/MinecraftClientInject', 'X', '', ''],
        ['com/mega/endinglib/mixin/compat/ibeeditor/LevelRendererMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/compat/ibeeditor/StandardEditorViewMixin', 'R', '', ''],
        ['com/mega/endinglib/mixin/compat/ibeeditor/StyleFormattingMixin', 'R', '', ''],
        ['com/mega/endinglib/mixin/compat/ibeeditor/StyleTypeMixin', 'R', '', ''],
        ['com/mega/endinglib/mixin/compat/modernui/ModernTextRendererMixin', 'R', '', ''],
        ['com/mega/endinglib/mixin/compat/oculus/CameraPacketActionMixin', 'R', '', ''],
        ['com/mega/endinglib/mixin/compat/oculus/ClientWrappedMixin', 'R', '', ''],
        ['com/mega/endinglib/mixin/dev/ShieldItemMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/ironspellbook/ZapParticleTypeMixin', 'R', '', ''],
        ['com/mega/endinglib/mixin/personal_rule/AbstractClientPlayerMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/personal_rule/EntityRendererDispatcherMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/personal_rule/PlayerMixin', 'A', 'm_36218_', 'decorateDisplayNameComponent'],
        ['com/mega/endinglib/mixin/personal_rule/ServerPlayerMixin', 'A', 'm_240418_', 'sendSystemMessage'],
        ['com/mega/endinglib/mixin/shader/GameRendererMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/shader/LevelRendererMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/time/EntityMixin', 'A', 'm_20272_', 'collide'],
        ['com/mega/endinglib/mixin/time/EntityMixin', 'A', 'm_9236_', 'level'],
        ['com/mega/endinglib/mixin/time/GameRendererMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/time/GuiMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/time/LevelRendererMixin', 'A', 'm_109826_', 'needsUpdate'],
        ['com/mega/endinglib/mixin/time/LevelRendererMixin', 'A', 'm_234304_', 'levelEvent'],
        ['com/mega/endinglib/mixin/time/LivingEntityMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/time/MinecraftMixin', 'A', 'm_91091_', 'hasSingleplayerServer'],
        ['com/mega/endinglib/mixin/time/MinecraftMixin', 'A', 'm_91152_', 'setScreen'],
        ['com/mega/endinglib/mixin/time/MinecraftMixin', 'A', 'm_91279_', 'handleKeybinds'],
        ['com/mega/endinglib/mixin/time/MinecraftMixin', 'A', 'm_91398_', 'tick'],
        ['com/mega/endinglib/mixin/time/ironspellbook/AbstractSpellMixin', 'R', '', ''],
        ['com/mega/endinglib/mixin/time/time/Blaze3DMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/time/time/CameraMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/time/time/ClientLevelMixin', 'A', 'm_104639_', 'tickNonPassenger'],
        ['com/mega/endinglib/mixin/time/time/CollectingNeighborUpdaterMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/time/time/EndermanRendererMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/time/time/InstantNeighborUpdaterMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/time/time/ItemInHandRendererMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/time/time/LevelMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/time/time/LevelRendererMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/time/time/MusicManagerMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/time/time/ParticleManagerMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/time/time/PostChainMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/time/time/ServerLevelMixin', 'A', 'm_142646_', 'getEntities'],
        ['com/mega/endinglib/mixin/time/time/ServerLevelMixin', 'A', 'm_143342_', 'shouldDiscardEntity'],
        ['com/mega/endinglib/mixin/time/time/ServerLevelMixin', 'A', 'm_6815_', 'getEntity'],
        ['com/mega/endinglib/mixin/time/time/ServerLevelMixin', 'A', 'm_6907_', 'players'],
        ['com/mega/endinglib/mixin/time/time/ServerLevelMixin', 'A', 'm_8647_', 'tickNonPassenger'],
        ['com/mega/endinglib/mixin/time/time/ServerLevelMixin', 'A', 'm_8791_', 'getEntity'],
        ['com/mega/endinglib/mixin/time/time/ServerLevelMixin', 'A', 'm_8890_', 'getRandomPlayer'],
        ['com/mega/endinglib/mixin/time/time/ServerMixin', 'A', 'm_129785_', 'getAllLevels'],
        ['com/mega/endinglib/mixin/time/time/ServerMixin', 'A', 'm_7416_', 'getPlayerCount'],
        ['com/mega/endinglib/mixin/time/time/SoundEngineMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/time/time/SoundManagerMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/time/time/TextureManagerMixin', 'X', '', ''],
        ['com/mega/endinglib/mixin/time/time/TutorialMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/AbstractArrowMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/AnvilMenuMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/ArrowMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/AttributeInstanceMixin', 'A', 'm_22115_', 'getBaseValue'],
        ['com/mega/revelationfix/mixin/AttributeInstanceMixin', 'A', 'm_22116_', 'getModifiersOrEmpty'],
        ['com/mega/revelationfix/mixin/ChunkGeneratorStructureStateMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/ClientLevelMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/DamageSourceMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/DamageSourcesMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/EnchantmentHelperMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/EntityMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/EntityRenderDispatcherMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/ExperienceOrbMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/FeDamageReplaceMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/FeatureFixMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/ForgeHooksMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/GameRendererMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/GuiGraphicsMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/HurtByTargetGoalMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/InventoryChangeTriggerMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/InventoryMenuMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/ItemInHandLayerMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/ItemInHandRendererMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/ItemMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/ItemRendererMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/ItemStackMixin', 'A', 'm_204117_', 'is'],
        ['com/mega/revelationfix/mixin/ItemStackMixin', 'A', 'm_41720_', 'getItem'],
        ['com/mega/revelationfix/mixin/ItemStackMixin', 'A', 'm_41782_', 'hasTag'],
        ['com/mega/revelationfix/mixin/ItemStackMixin', 'A', 'm_41783_', 'getTag'],
        ['com/mega/revelationfix/mixin/KillCommandMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/LevelRendererMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/LivingDamageMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/LivingEntityMixin', 'A', 'm_142540_', 'onEffectAdded'],
        ['com/mega/revelationfix/mixin/LivingEntityMixin', 'A', 'm_142687_', 'remove'],
        ['com/mega/revelationfix/mixin/LivingEntityMixin', 'A', 'm_21204_', 'getAttributes'],
        ['com/mega/revelationfix/mixin/LivingEntityMixin', 'A', 'm_21223_', 'getHealth'],
        ['com/mega/revelationfix/mixin/LivingEntityMixin', 'A', 'm_21233_', 'getMaxHealth'],
        ['com/mega/revelationfix/mixin/LivingEntityMixin', 'A', 'm_6336_', 'getMobType'],
        ['com/mega/revelationfix/mixin/LivingEntityMixin', 'A', 'm_7285_', 'onEffectRemoved'],
        ['com/mega/revelationfix/mixin/LocalPlayerMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/MobMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/MonsterMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/NearestAttackableTargetGoalMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/PlayerMixin', 'A', 'm_5833_', 'isSpectator'],
        ['com/mega/revelationfix/mixin/PlayerMixin', 'A', 'm_7500_', 'isCreative'],
        ['com/mega/revelationfix/mixin/PlayerRendererMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/RecipeManagerMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/SculkShriekerBlockEntityMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/SynchedEntityDataMixin', 'A', 'm_135379_', 'getItem'],
        ['com/mega/revelationfix/mixin/TagValueMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/ThornsEnchantmentMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/UseAnimMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/WitherBossMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/curios/CuriosImplMixinHooksMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/curios/DynamicStackHandlerMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/cyclic/DisarmEnchantMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/enigmaticlegacy/CursedScrollMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/enigmaticlegacy/SuperpositionHandlerMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/enigmaticlegacy/bugfix/EtheriumEventHandlerFix', 'R', '', ''],
        ['com/mega/revelationfix/mixin/forge/RevelationBusThrowableFix', 'X', '', ''],
        ['com/mega/revelationfix/mixin/goety/AbstractObsidianMonolithMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/AbstractWraithMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/ApollyonMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/ApollyonMixin', 'A', 'm_213945_', 'populateDefaultEquipmentSlots'],
        ['com/mega/revelationfix/mixin/goety/ApollyonMixin', 'A', 'm_8028_', 'shouldDespawnInPeaceful'],
        ['com/mega/revelationfix/mixin/goety/ApollyonMixin', 'A', 'm_8119_', 'tick'],
        ['com/mega/revelationfix/mixin/goety/BlackIronArmorMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/BossBarEventMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/ClientEventsMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/CuriosFinderMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/DarkAltarBlockEntityMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/DarkArmorMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/DarkWandMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/DeathArrowMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/FocusCooldownMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/GoetyCommandMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/HellBlastMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/HellBoltMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/HereticMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/IceSpearMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/IceSpikeMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/MobUtilMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/ModCreativeTabMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/ModItemsMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/OwnedMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/SEHelperMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/SpellMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/WandUtilMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/brew/BrewCauldronBlockEntityMixin', 'A', 'm_8020_', 'getItem'],
        ['com/mega/revelationfix/mixin/goety/brew/BrewEffectsMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/expand/BulwarkSpellMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/expand/MiscCapHelperMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/expand/WayfarersBeltItemMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/expand/config/BrewConfigMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/expand/config/SpellConfigMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/expand/dark_anvil/DarkAnvil2Mixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/expand/dark_anvil/DarkAnvilMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/modify/WindParticleMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/ritual/CraftRitualMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/ritual/DarkAltarBlockEntityMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/ritual/EnchantItemRitualMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/ritual/GoetyJeiPluginMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/ritual/ModRitualCategoryMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/ritual/RitualRecipeSerializerMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/goety/ritual/SummonRitualMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/gr/ApollyonDeathArrowGoalMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/gr/ApostleGlowLayerMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/gr/ApostleMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/gr/ApostleMixin', 'A', 'm_147207_', 'addEffect'],
        ['com/mega/revelationfix/mixin/gr/ApostleMixin', 'A', 'm_6593_', 'setCustomName'],
        ['com/mega/revelationfix/mixin/gr/ApostleModelMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/gr/ApostleRendererMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/gr/AscensionHaloMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/gr/BarricadeSpellMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/gr/BossLoopMusicMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/gr/BowItemMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/gr/BrokenAscensionHaloMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/gr/ChatFormattingMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/gr/ClientEventsMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/gr/ClientHandlerMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/gr/CycloneSpellMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/gr/DefeatApollyonInNetherStateMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/gr/FireballSpellMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/gr/GhastSpellMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/gr/HaloRendererMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/gr/HellfireMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/gr/LavaballSpellMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/gr/LivingDeathListenerFix', 'R', '', ''],
        ['com/mega/revelationfix/mixin/gr/LivingEntityHurtEventMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/gr/LivingEntityMixin', 'A', 'm_21223_', 'getHealth'],
        ['com/mega/revelationfix/mixin/gr/LivingEntityMixin', 'A', 'm_6121_', 'getSoundVolume'],
        ['com/mega/revelationfix/mixin/gr/LivingEntityMixin', 'A', 'm_7292_', 'addEffect'],
        ['com/mega/revelationfix/mixin/gr/LivingEntityRendererMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/gr/ModConfigMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/gr/ModFocusItemMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/gr/ModItemsMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/gr/ModMainMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/gr/NetherStarBarMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/gr/PhantomServantRendererMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/gr/PlayerMixin', 'A', 'm_142687_', 'remove'],
        ['com/mega/revelationfix/mixin/gr/PlayerMixin', 'A', 'm_5833_', 'isSpectator'],
        ['com/mega/revelationfix/mixin/gr/PlayerMixin', 'A', 'm_8119_', 'tick'],
        ['com/mega/revelationfix/mixin/gr/StringRenderOutputMixin', 'A', 'm_92964_', 'addEffect'],
        ['com/mega/revelationfix/mixin/gr/WitherServantRendererMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/gr/WitherSkullSpellMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/ironspellbooks/AbstractSpellCastingMobMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/ironspellbooks/goety_revelation/SpectreArmorMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/ironspellbooks/goety_revelation/SpectreDarkmageArmorMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/ironspellbooks/goety_revelation/SpiderArmorMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/ironspellbooks/goety_revelation/SpiderDarkmageArmorMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/l2hostility/SealedItemMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/mousetweaks/MouseTweaksForgeFixMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/oculus/xenon/SodiumClientModFixMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/patchouli/BookContentResourceDirectLoaderMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/patchouli/BookContentResourceListenerLoaderMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/patchouli/BrewingCatalystProcessorMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/patchouli/BrewingSacrificeProcessorMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/slashblade/ToBeInjectMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/special/LivingDamageEventMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/special/LivingHurtEventMixin', 'X', '', ''],
        ['com/mega/revelationfix/mixin/tetra/GuiElementMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/tetra/GuiSynergyIndicatorMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/tetra/HammerBaseBlockEntityMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/tetra/HammerBaseBlockMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/tetra/ModularBowItemMixin', 'R', '', ''],
        ['com/mega/revelationfix/mixin/tetra/ScrollScreenMixin', 'R', '', ''],
        ['com/moakiee/ae2lt/mixin/AEBaseMenuManagedSlotClickMixin', 'R', '', ''],
        ['com/moakiee/ae2lt/mixin/AdvCraftingCpuLogicMixin', 'R', '', ''],
        ['com/moakiee/ae2lt/mixin/AnnihilationPlaneFirmamentDustMixin', 'R', '', ''],
        ['com/moakiee/ae2lt/mixin/BlockItemPhasePlacementMixin', 'A', 'm_6652_', 'mustSurvive'],
        ['com/moakiee/ae2lt/mixin/ControllerValidatorMixin', 'R', '', ''],
        ['com/moakiee/ae2lt/mixin/CraftingCpuLogicMixin', 'R', '', ''],
        ['com/moakiee/ae2lt/mixin/EjectGhostBEMixin', 'X', '', ''],
        ['com/moakiee/ae2lt/mixin/EntityPhaseMovementMixin', 'X', '', ''],
        ['com/moakiee/ae2lt/mixin/EntityUndyingMixin', 'X', '', ''],
        ['com/moakiee/ae2lt/mixin/ItemEntityMixin', 'X', '', ''],
        ['com/moakiee/ae2lt/mixin/LightningBoltMixin', 'X', '', ''],
        ['com/moakiee/ae2lt/mixin/LivingEntityShieldHitFeedbackMixin', 'A', 'm_6677_', 'playHurtSound'],
        ['com/moakiee/ae2lt/mixin/LivingEntityUndyingMixin', 'X', '', ''],
        ['com/moakiee/ae2lt/mixin/PatternProviderLogicMixin', 'R', '', ''],
        ['com/moakiee/ae2lt/mixin/PlayerPhaseFlightMixin', 'X', '', ''],
        ['com/moakiee/ae2lt/mixin/RecipeManagerMixin', 'A', 'm_44054_', 'byType'],
        ['com/moakiee/ae2lt/mixin/ServerCommonPacketListenerUndyingMixin', 'X', '', ''],
        ['com/moakiee/ae2lt/mixin/ServerGamePacketListenerPhaseMovementMixin', 'X', '', ''],
        ['com/moakiee/ae2lt/mixin/ServerLevelMixin', 'X', '', ''],
        ['com/moakiee/ae2lt/mixin/ServerPlayerPhaseMovementMixin', 'X', '', ''],
        ['com/moakiee/ae2lt/mixin/ServerPlayerUndyingMixin', 'X', '', ''],
        ['com/moakiee/ae2lt/mixin/ShulkerBulletMixin', 'X', '', ''],
        ['com/moakiee/ae2lt/mixin/ae2wtlib/WTMenuHostMixin', 'R', '', ''],
        ['com/moakiee/ae2lt/mixin/ae2wtlib/client/AEBaseScreenFrequencyTerminalButtonMixin', 'R', '', ''],
        ['com/moakiee/ae2lt/mixin/client/AEBaseScreenFrequencyTerminalButtonMixin', 'R', '', ''],
        ['com/moakiee/ae2lt/mixin/client/CableBusBakedModelMixin', 'R', '', ''],
        ['com/moakiee/ae2lt/mixin/client/CableBusContainerRenderMixin', 'R', '', ''],
        ['com/moakiee/ae2lt/mixin/client/CableBusRenderStateMixin', 'R', '', ''],
        ['com/moakiee/ae2lt/mixin/client/EntityShieldFireVisualMixin', 'X', '', ''],
        ['com/moakiee/ae2lt/mixin/client/LevelRendererPhaseFlightMixin', 'X', '', ''],
        ['com/moakiee/ae2lt/mixin/client/LocalPlayerPhaseMovementMixin', 'X', '', ''],
        ['com/moakiee/ae2lt/mixin/client/LocalPlayerShieldHitFeedbackMixin', 'X', '', ''],
        ['com/moakiee/ae2lt/mixin/client/RailgunHumanoidModelMixin', 'X', '', ''],
        ['com/moakiee/ae2lt/mixin/recipeviewer/emi/EmiEncodePatternTransferMixin', 'R', '', ''],
        ['com/moakiee/ae2lt/mixin/recipeviewer/jei/JeiEncodePatternTransferMixin', 'R', '', ''],
        ['com/moakiee/ae2lt/mixin/recipeviewer/jei/JeiRecipeTransferButtonControllerMixin', 'R', '', ''],
        ['com/moakiee/thunderbolt/ae2/mixin/AdvCraftingCpuLogicMixin', 'R', '', ''],
        ['com/moakiee/thunderbolt/ae2/mixin/Ae2CraftingTreeCompatibilityMixin', 'R', '', ''],
        ['com/moakiee/thunderbolt/ae2/mixin/CraftingCalculationMixin', 'R', '', ''],
        ['com/moakiee/thunderbolt/ae2/mixin/CraftingCpuLogicMixin', 'R', '', ''],
        ['com/moakiee/thunderbolt/ae2/mixin/ECOCraftingCpuLogicMixin', 'R', '', ''],
        ['com/moakiee/thunderbolt/ae2/mixin/EjectCapabilityMixin', 'X', '', ''],
        ['com/moakiee/thunderbolt/ae2/mixin/EjectGhostBlockEntityMixin', 'X', '', ''],
        ['com/moakiee/thunderbolt/ae2/mixin/ExtendedCraftingCpuServiceMixin', 'R', '', ''],
        ['com/moakiee/thunderbolt/ae2/mixin/GridConnectionMaxChannelsMixin', 'R', '', ''],
        ['com/moakiee/thunderbolt/ae2/mixin/GridGetMachineNodesMixin', 'R', '', ''],
        ['com/moakiee/thunderbolt/ae2/mixin/GridNodeMaxChannelsMixin', 'R', '', ''],
        ['com/moakiee/thunderbolt/ae2/mixin/PathingCalculationCapMixin', 'R', '', ''],
        ['com/moakiee/thunderbolt/ae2/mixin/TimeWheelCraftingCPUMenuMixin', 'R', '', ''],
        ['com/moakiee/thunderbolt/ae2/mixin/client/CPUSelectionListStorageMixin', 'R', '', ''],
        ['com/moakiee/thunderbolt/ae2/mixin/client/CraftConfirmScreenCpuStatusMixin', 'R', '', ''],
        ['com/moakiee/thunderbolt/ae2/mixin/client/TooltipsByteAmountMixin', 'R', '', ''],
        ['com/neuvillette/ae2ct/mixin/AE2CraftingPlanSummary', 'R', '', ''],
        ['com/neuvillette/ae2ct/mixin/Ae2CraftConfirmScreen', 'R', '', ''],
        ['com/probejs/mixins/LootTableMixin', 'X', '', ''],
        ['com/probejs/mixins/OnJavaMixin', 'R', '', ''],
        ['com/probejs/mixins/RecipeManagerMixin', 'X', '', ''],
        ['com/probejs/mixins/TranslatableMixin', 'X', '', ''],
        ['com/terraformersmc/mod_menu/mixin/MixinPauseScreen', 'X', '', ''],
        ['com/terraformersmc/mod_menu/mixin/MixinTitleScreen', 'X', '', ''],
        ['com/terraformersmc/mod_menu/mixin/MixinTitleScreenUpdateIndicator', 'X', '', ''],
        ['com/ultimine_rewind/mixin/MixinFTBUltimine', 'R', '', ''],
        ['com/xiaopiao/patternbetter/mixin/ContainerExPatternProviderMixin', 'R', '', ''],
        ['com/xiaopiao/patternbetter/mixin/GuiExPatternProviderMixin', 'R', '', ''],
        ['com/xiaopiao/patternbetter/mixin/PartExPatternProviderMixin', 'R', '', ''],
        ['com/xiaopiao/patternbetter/mixin/PatternProviderMenuMixin', 'R', '', ''],
        ['com/xiaopiao/patternbetter/mixin/PatternProviderScreenMixin', 'R', '', ''],
        ['com/xiaopiao/patternbetter/mixin/TileExPatternProviderMixin', 'R', '', ''],
        ['committee/nova/mods/avaritia/init/mixins/EnchantmentHelperMixin', 'X', '', ''],
        ['committee/nova/mods/avaritia/init/mixins/ItemMixin', 'X', '', ''],
        ['committee/nova/mods/avaritia/init/mixins/ItemRendererMixin', 'X', '', ''],
        ['committee/nova/mods/avaritia/init/mixins/ItemStackMixin', 'X', '', ''],
        ['committee/nova/mods/avaritia/init/mixins/NetherWartBlockMixin', 'X', '', ''],
        ['committee/nova/mods/avaritia/init/mixins/PlayerMixin', 'X', '', ''],
        ['committee/nova/mods/avaritia/init/mixins/PlayerRendererMixin', 'X', '', ''],
        ['committee/nova/mods/avaritia/init/mixins/ReloadableServerResourcesMixin', 'X', '', ''],
        ['de/mari_023/ae2wtlib/mixin/MinecraftMixin', 'X', '', ''],
        ['de/mari_023/ae2wtlib/mixin/RestockRender', 'X', '', ''],
        ['dev/architectury/mixin/MixinLightningBolt', 'X', '', ''],
        ['dev/architectury/mixin/forge/MixinChunkSerializer', 'X', '', ''],
        ['dev/architectury/mixin/forge/MixinClientLevel', 'X', '', ''],
        ['dev/architectury/mixin/forge/MixinFallingBlockEntity', 'X', '', ''],
        ['dev/architectury/mixin/forge/MixinLootDataManager', 'X', '', ''],
        ['dev/architectury/mixin/forge/MixinMinecraft', 'X', '', ''],
        ['dev/architectury/mixin/inject/MixinItem', 'X', '', ''],
        ['dev/beecube31/botaniajei/mixins/MixinManaPoolRecipeCategory', 'R', '', ''],
        ['dev/beecube31/botaniajei/mixins/MixinPureDaisyRecipeCategory', 'R', '', ''],
        ['dev/beecube31/botaniajei/mixins/MixinRuneAltarRecipeCategory', 'R', '', ''],
        ['dev/beecube31/botaniajei/mixins/MixinTerraPlateRecipeCategory', 'R', '', ''],
        ['dev/beecube31/botaniajei/mixins/emi/MixinManaInfusionEmiRecipe', 'R', '', ''],
        ['dev/beecube31/botaniajei/mixins/emi/MixinPureDaisyEmiRecipe', 'R', '', ''],
        ['dev/beecube31/botaniajei/mixins/emi/MixinRuneAltarEmiRecipe', 'R', '', ''],
        ['dev/beecube31/botaniajei/mixins/emi/MixinTerraPlateEmiRecipe', 'R', '', ''],
        ['dev/ftb/mods/ftbchunks/core/mixin/ArmorStandMixin', 'X', '', ''],
        ['dev/ftb/mods/ftbchunks/core/mixin/ChunkMapMixin', 'X', '', ''],
        ['dev/ftb/mods/ftbchunks/core/mixin/ClientPacketListenerMixin', 'X', '', ''],
        ['dev/ftb/mods/ftbchunks/core/mixin/GuiMixin', 'X', '', ''],
        ['dev/ftb/mods/ftbchunks/core/mixin/PistonBaseBlockMixin', 'X', '', ''],
        ['dev/ftb/mods/ftbchunks/core/mixin/UtilMixin', 'X', '', ''],
        ['dev/ftb/mods/ftblibrary/core/mixin/common/ResourceLocationMixin', 'X', '', ''],
        ['dev/ftb/mods/ftbultimine/mixin/BlockMixin', 'X', '', ''],
        ['dev/kosmx/playerAnim/mixin/ArmorFeatureRendererMixin', 'X', '', ''],
        ['dev/kosmx/playerAnim/mixin/BipedEntityModelMixin', 'X', '', ''],
        ['dev/kosmx/playerAnim/mixin/FeatureRendererMixin', 'X', '', ''],
        ['dev/kosmx/playerAnim/mixin/HeldItemMixin', 'X', '', ''],
        ['dev/kosmx/playerAnim/mixin/LivingEntityRenderRedirect_bendOnly', 'X', '', ''],
        ['dev/kosmx/playerAnim/mixin/PlayerEntityMixin', 'X', '', ''],
        ['dev/kosmx/playerAnim/mixin/PlayerModelMixin', 'X', '', ''],
        ['dev/kosmx/playerAnim/mixin/PlayerRendererMixin', 'X', '', ''],
        ['dev/kosmx/playerAnim/mixin/firstPerson/EntityRenderDispatcherMixin', 'X', '', ''],
        ['dev/kosmx/playerAnim/mixin/firstPerson/ItemInHandRendererMixin', 'X', '', ''],
        ['dev/kosmx/playerAnim/mixin/firstPerson/LevelRendererMixin', 'X', '', ''],
        ['dev/kosmx/playerAnim/mixin/firstPerson/LivingEntityRendererMixin', 'X', '', ''],
        ['dev/latvian/mods/kubejs/core/mixin/common/BlockBehaviourMixin', 'X', '', ''],
        ['dev/latvian/mods/kubejs/core/mixin/common/ClientLevelMixin', 'A', 'm_142646_', 'getEntities'],
        ['dev/latvian/mods/kubejs/core/mixin/common/ClientLevelMixin', 'A', 'm_6907_', 'players'],
        ['dev/latvian/mods/kubejs/core/mixin/common/CommandSourceStackMixin', 'A', 'm_288197_', 'sendSuccess'],
        ['dev/latvian/mods/kubejs/core/mixin/common/DamageSourceMixin', 'A', 'm_19385_', 'getMsgId'],
        ['dev/latvian/mods/kubejs/core/mixin/common/DamageSourceMixin', 'A', 'm_7639_', 'getEntity'],
        ['dev/latvian/mods/kubejs/core/mixin/common/DamageSourceMixin', 'A', 'm_7640_', 'getDirectEntity'],
        ['dev/latvian/mods/kubejs/core/mixin/common/EntityMixin', 'A', 'm_142038_', 'isCurrentlyGlowing'],
        ['dev/latvian/mods/kubejs/core/mixin/common/EntityMixin', 'A', 'm_146908_', 'getYRot'],
        ['dev/latvian/mods/kubejs/core/mixin/common/EntityMixin', 'A', 'm_146909_', 'getXRot'],
        ['dev/latvian/mods/kubejs/core/mixin/common/EntityMixin', 'A', 'm_146915_', 'setGlowingTag'],
        ['dev/latvian/mods/kubejs/core/mixin/common/EntityMixin', 'A', 'm_146922_', 'setYRot'],
        ['dev/latvian/mods/kubejs/core/mixin/common/EntityMixin', 'A', 'm_146926_', 'setXRot'],
        ['dev/latvian/mods/kubejs/core/mixin/common/EntityMixin', 'A', 'm_20095_', 'clearFire'],
        ['dev/latvian/mods/kubejs/core/mixin/common/EntityMixin', 'A', 'm_20137_', 'removeTag'],
        ['dev/latvian/mods/kubejs/core/mixin/common/EntityMixin', 'A', 'm_20148_', 'getUUID'],
        ['dev/latvian/mods/kubejs/core/mixin/common/EntityMixin', 'A', 'm_20149_', 'getStringUUID'],
        ['dev/latvian/mods/kubejs/core/mixin/common/EntityMixin', 'A', 'm_20197_', 'getPassengers'],
        ['dev/latvian/mods/kubejs/core/mixin/common/EntityMixin', 'A', 'm_20270_', 'distanceTo'],
        ['dev/latvian/mods/kubejs/core/mixin/common/EntityMixin', 'A', 'm_20275_', 'distanceToSqr'],
        ['dev/latvian/mods/kubejs/core/mixin/common/EntityMixin', 'A', 'm_20280_', 'distanceToSqr'],
        ['dev/latvian/mods/kubejs/core/mixin/common/EntityMixin', 'A', 'm_20334_', 'setDeltaMovement'],
        ['dev/latvian/mods/kubejs/core/mixin/common/EntityMixin', 'A', 'm_5997_', 'push'],
        ['dev/latvian/mods/kubejs/core/mixin/common/EntityMixin', 'A', 'm_6095_', 'getType'],
        ['dev/latvian/mods/kubejs/core/mixin/common/EntityMixin', 'A', 'm_6302_', 'getScoreboardName'],
        ['dev/latvian/mods/kubejs/core/mixin/common/EntityMixin', 'A', 'm_6350_', 'getDirection'],
        ['dev/latvian/mods/kubejs/core/mixin/common/EntityMixin', 'A', 'm_6469_', 'hurt'],
        ['dev/latvian/mods/kubejs/core/mixin/common/EntityMixin', 'A', 'm_7307_', 'isAlliedTo'],
        ['dev/latvian/mods/kubejs/core/mixin/common/EntityMixin', 'A', 'm_7678_', 'moveTo'],
        ['dev/latvian/mods/kubejs/core/mixin/common/EntityMixin', 'A', 'm_9236_', 'level'],
        ['dev/latvian/mods/kubejs/core/mixin/common/GameRulesMixin', 'A', 'm_46170_', 'getRule'],
        ['dev/latvian/mods/kubejs/core/mixin/common/IngredientMixin', 'A', 'm_43908_', 'getItems'],
        ['dev/latvian/mods/kubejs/core/mixin/common/IngredientTagValueMixin', 'X', '', ''],
        ['dev/latvian/mods/kubejs/core/mixin/common/ItemMixin', 'X', '', ''],
        ['dev/latvian/mods/kubejs/core/mixin/common/ItemStackMixin', 'A', 'm_41663_', 'enchant'],
        ['dev/latvian/mods/kubejs/core/mixin/common/ItemStackMixin', 'A', 'm_41751_', 'setTag'],
        ['dev/latvian/mods/kubejs/core/mixin/common/ItemStackMixin', 'A', 'm_41782_', 'hasTag'],
        ['dev/latvian/mods/kubejs/core/mixin/common/ItemStackMixin', 'A', 'm_41783_', 'getTag'],
        ['dev/latvian/mods/kubejs/core/mixin/common/KeyboardHandlerMixin', 'X', '', ''],
        ['dev/latvian/mods/kubejs/core/mixin/common/LevelMixin', 'A', 'm_46467_', 'getGameTime'],
        ['dev/latvian/mods/kubejs/core/mixin/common/LevelMixin', 'A', 'm_46472_', 'dimension'],
        ['dev/latvian/mods/kubejs/core/mixin/common/LivingEntityMixin', 'X', '', ''],
        ['dev/latvian/mods/kubejs/core/mixin/common/LocalPlayerMixin', 'A', 'm_108630_', 'getStats'],
        ['dev/latvian/mods/kubejs/core/mixin/common/LootTablesMixin', 'X', '', ''],
        ['dev/latvian/mods/kubejs/core/mixin/common/MinecraftClientMixin', 'X', '', ''],
        ['dev/latvian/mods/kubejs/core/mixin/common/MinecraftServerMixin', 'A', 'm_129929_', 'invalidateStatus'],
        ['dev/latvian/mods/kubejs/core/mixin/common/MinecraftServerMixin', 'A', 'm_6982_', 'isDedicatedServer'],
        ['dev/latvian/mods/kubejs/core/mixin/common/MinecraftServerMixin', 'A', 'm_7038_', 'initServer'],
        ['dev/latvian/mods/kubejs/core/mixin/common/MinecraftServerMixin', 'A', 'm_7041_', 'stopServer'],
        ['dev/latvian/mods/kubejs/core/mixin/common/OptionsMixin', 'X', '', ''],
        ['dev/latvian/mods/kubejs/core/mixin/common/PlayerListMixin', 'X', '', ''],
        ['dev/latvian/mods/kubejs/core/mixin/common/PlayerMixin', 'A', 'm_6915_', 'closeContainer'],
        ['dev/latvian/mods/kubejs/core/mixin/common/RecipeManagerMixin', 'X', '', ''],
        ['dev/latvian/mods/kubejs/core/mixin/common/RecipeMixin', 'A', 'm_6076_', 'getGroup'],
        ['dev/latvian/mods/kubejs/core/mixin/common/RecipeMixin', 'A', 'm_6671_', 'getType'],
        ['dev/latvian/mods/kubejs/core/mixin/common/ReloadableServerResourcesMixin', 'X', '', ''],
        ['dev/latvian/mods/kubejs/core/mixin/common/ServerLevelMixin', 'A', 'm_142646_', 'getEntities'],
        ['dev/latvian/mods/kubejs/core/mixin/common/ServerLevelMixin', 'A', 'm_6907_', 'players'],
        ['dev/latvian/mods/kubejs/core/mixin/common/ServerPlayerMixin', 'A', 'm_8951_', 'getStats'],
        ['dev/latvian/mods/kubejs/core/mixin/common/TagLoaderMixin', 'X', '', ''],
        ['dev/latvian/mods/kubejs/core/mixin/common/TagManagerMixin', 'X', '', ''],
        ['dev/latvian/mods/kubejs/core/mixin/common/UtilMixin', 'X', '', ''],
        ['dev/latvian/mods/kubejs/core/mixin/common/WorldOpenFlowsMixin', 'X', '', ''],
        ['dev/latvian/mods/kubejs/core/mixin/common/components/ClickEventMixin', 'A', 'm_130622_', 'getAction'],
        ['dev/latvian/mods/kubejs/core/mixin/common/components/ClickEventMixin', 'A', 'm_130623_', 'getValue'],
        ['dev/latvian/mods/kubejs/core/mixin/common/components/MutableComponentMixin', 'A', 'm_130946_', 'append'],
        ['dev/latvian/mods/kubejs/core/mixin/common/inject_resources/MinecraftServerMixin', 'X', '', ''],
        ['dev/latvian/mods/kubejs/core/mixin/common/inject_resources/WorldLoaderPackConfigMixin', 'X', '', ''],
        ['dev/latvian/mods/kubejs/core/mixin/common/mod/ModNameTooltipMixin', 'R', '', ''],
        ['dev/latvian/mods/kubejs/core/mixin/common/mod/REITooltipMixin', 'R', '', ''],
        ['dev/latvian/mods/rhino/mod/core/mixin/common/DirectionMixin', 'A', 'm_122411_', 'get3DDataValue'],
        ['dev/latvian/mods/rhino/mod/core/mixin/common/DirectionMixin', 'A', 'm_122416_', 'get2DDataValue'],
        ['dev/latvian/mods/rhino/mod/core/mixin/common/DirectionMixin', 'A', 'm_122429_', 'getStepX'],
        ['dev/latvian/mods/rhino/mod/core/mixin/common/DirectionMixin', 'A', 'm_122430_', 'getStepY'],
        ['dev/latvian/mods/rhino/mod/core/mixin/common/DirectionMixin', 'A', 'm_122431_', 'getStepZ'],
        ['dev/latvian/mods/rhino/mod/core/mixin/common/DirectionMixin', 'A', 'm_122435_', 'toYRot'],
        ['dev/latvian/mods/rhino/mod/core/mixin/common/NumericTagMixin', 'A', 'm_7061_', 'getAsDouble'],
        ['dev/latvian/mods/rhino/mod/core/mixin/common/NumericTagMixin', 'A', 'm_7063_', 'getAsByte'],
        ['dev/latvian/mods/rhino/mod/core/mixin/common/StringTagMixin', 'A', 'm_7916_', 'getAsString'],
        ['dev/latvian/mods/rhino/mod/core/mixin/common/TextColorMixin', 'A', 'm_131274_', 'serialize'],
        ['dev/mtechlab/manadisplay/mixins/EMIManaWidgetMixin', 'R', '', ''],
        ['dev/mtechlab/manadisplay/mixins/FlowersWandHudMixin', 'R', '', ''],
        ['dev/mtechlab/manadisplay/mixins/HUDHandlerMixin', 'R', '', ''],
        ['dev/mtechlab/manadisplay/mixins/PoolWandHudMixin', 'R', '', ''],
        ['dev/mtechlab/manadisplay/mixins/SpreaderWandHudMixin', 'R', '', ''],
        ['dev/shadowsoffire/fastbench/mixin/MixinBackpackMenu', 'R', '', ''],
        ['dev/shadowsoffire/fastbench/mixin/MixinCraftingMenu', 'X', '', ''],
        ['dev/shadowsoffire/fastbench/mixin/MixinInventoryMenu', 'X', '', ''],
        ['dev/shadowsoffire/fastfurnace/mixin/MixinAbstractFurnaceBlockEntity', 'X', '', ''],
        ['dev/shadowsoffire/fastsuite/mixin/IngredientMixin', 'A', 'm_43908_', 'getItems'],
        ['dev/shadowsoffire/fastsuite/mixin/ItemStackMixin', 'X', '', ''],
        ['dev/shadowsoffire/placebo/mixin/AnvilBlockMixin', 'X', '', ''],
        ['dev/shadowsoffire/placebo/mixin/ItemStackMixin', 'X', '', ''],
        ['dev/shadowsoffire/placebo/mixin/LootTablesMixin', 'X', '', ''],
        ['dev/shadowsoffire/placebo/mixin/ServerResourcesMixin', 'X', '', ''],
        ['dev/shadowsoffire/placebo/mixin/client/ChatComponentMixin', 'X', '', ''],
        ['dev/toma/configuration/mixin/ClientPacketListenerMixin', 'X', '', ''],
        ['dev/toma/configuration/mixin/MinecraftMixin', 'X', '', ''],
        ['dev/toma/configuration/mixin/PlayerListMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_18_fabric/ClientboundCustomPayloadPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_18_fabric/ClientboundCustomQueryPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_18_fabric/ClientboundLevelChunkPacketDataMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_18_fabric/CompressionDecoderMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_18_fabric/ConnectionMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_18_fabric/FriendlyByteBufMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_18_fabric/NbtAccounterMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_18_fabric/PacketEncoderMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_18_fabric/ServerConnectionListenerMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_18_fabric/ServerGamePacketListenerImplMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_18_fabric/ServerLoginPacketListenerImplMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_18_fabric/ServerboundCustomPayloadPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_18_fabric/ServerboundCustomQueryPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_18_fabric/Varint21FrameDecoderMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_18_fabric/Varint21LengthFieldPrependerMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_18_forge/ClientboundCustomPayloadPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_18_forge/ClientboundCustomQueryPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_18_forge/ClientboundLevelChunkPacketDataMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_18_forge/CompressionDecoderMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_18_forge/CompressionEncoderMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_18_forge/ConnectionMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_18_forge/FriendlyByteBufMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_18_forge/NbtAccounterMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_18_forge/PacketEncoderMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_18_forge/ServerConnectionListenerMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_18_forge/ServerGamePacketListenerImplMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_18_forge/ServerLoginPacketListenerImplMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_18_forge/ServerboundCustomPayloadPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_18_forge/ServerboundCustomQueryPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_18_forge/Varint21FrameDecoderMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_18_forge/Varint21LengthFieldPrependerMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_3_fabric/ClientboundCustomPayloadPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_3_fabric/ClientboundCustomQueryPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_3_fabric/ClientboundLevelChunkPacketDataMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_3_fabric/CompressionDecoderMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_3_fabric/ConnectionMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_3_fabric/FriendlyByteBufMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_3_fabric/NbtAccounterMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_3_fabric/PacketEncoderMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_3_fabric/ServerConnectionListenerMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_3_fabric/ServerGamePacketListenerImplMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_3_fabric/ServerLoginPacketListenerImplMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_3_fabric/ServerboundCustomPayloadPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_3_fabric/ServerboundCustomQueryPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_3_fabric/Varint21FrameDecoderMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_3_fabric/Varint21LengthFieldPrependerMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_3_forge/ClientboundCustomPayloadPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_3_forge/ClientboundCustomQueryPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_3_forge/ClientboundLevelChunkPacketDataMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_3_forge/CompressionDecoderMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_3_forge/CompressionEncoderMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_3_forge/ConnectionMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_3_forge/FriendlyByteBufMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_3_forge/NbtAccounterMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_3_forge/PacketEncoderMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_3_forge/ServerConnectionListenerMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_3_forge/ServerGamePacketListenerImplMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_3_forge/ServerLoginPacketListenerImplMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_3_forge/ServerboundCustomPayloadPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_3_forge/ServerboundCustomQueryPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_3_forge/Varint21FrameDecoderMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_3_forge/Varint21LengthFieldPrependerMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_4_forge/ClientboundCustomPayloadPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_4_forge/ClientboundCustomQueryPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_4_forge/ClientboundLevelChunkPacketDataMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_4_forge/CompressionDecoderMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_4_forge/CompressionEncoderMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_4_forge/ConnectionMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_4_forge/FriendlyByteBufMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_4_forge/NbtAccounterMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_4_forge/PacketEncoderMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_4_forge/ServerGamePacketListenerImplMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_4_forge/ServerLoginPacketListenerImplMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_4_forge/ServerboundCustomPayloadPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_4_forge/ServerboundCustomQueryPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_4_forge/Varint21FrameDecoderMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_4_forge/Varint21LengthFieldPrependerMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_fabric/ClientboundCustomPayloadPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_fabric/ClientboundCustomQueryPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_fabric/ClientboundLevelChunkPacketDataMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_fabric/CompressionDecoderMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_fabric/ConnectionMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_fabric/FriendlyByteBufMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_fabric/NbtAccounterMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_fabric/PacketEncoderMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_fabric/ServerConnectionListenerMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_fabric/ServerGamePacketListenerImplMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_fabric/ServerLoginPacketListenerImplMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_fabric/ServerboundCustomPayloadPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_fabric/ServerboundCustomQueryPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_fabric/Varint21FrameDecoderMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_fabric/Varint21LengthFieldPrependerMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_forge/ClientboundCustomPayloadPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_forge/ClientboundCustomQueryPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_forge/ClientboundLevelChunkPacketDataMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_forge/CompressionDecoderMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_forge/CompressionEncoderMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_forge/ConnectionMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_forge/FriendlyByteBufMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_forge/NbtAccounterMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_forge/PacketEncoderMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_forge/ServerConnectionListenerMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_forge/ServerGamePacketListenerImplMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_forge/ServerLoginPacketListenerImplMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_forge/ServerboundCustomPayloadPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_forge/ServerboundCustomQueryPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_forge/Varint21FrameDecoderMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_19_forge/Varint21LengthFieldPrependerMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_fabric/ClientboundCustomPayloadPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_fabric/ClientboundCustomQueryPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_fabric/ClientboundLevelChunkPacketDataMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_fabric/CompressionDecoderMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_fabric/ConnectionMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_fabric/FriendlyByteBufMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_fabric/NbtAccounterMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_fabric/PacketEncoderMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_fabric/PayloadHelperMixin', 'R', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_fabric/ServerCommonPacketListenerImplMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_fabric/ServerConnectionListenerMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_fabric/ServerGamePacketListenerImplMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_fabric/ServerLoginPacketListenerImplMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_fabric/ServerboundCustomPayloadPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_fabric/ServerboundCustomQueryPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_fabric/VarIntMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_fabric/VarLongMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_fabric/Varint21FrameDecoderMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_fabric/Varint21LengthFieldPrependerMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_forge/ClientboundCustomPayloadPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_forge/ClientboundCustomQueryPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_forge/ClientboundLevelChunkPacketDataMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_forge/CompressionDecoderMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_forge/CompressionEncoderMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_forge/ConnectionMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_forge/FriendlyByteBufMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_forge/NbtAccounterMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_forge/PacketEncoderMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_forge/ServerCommonPacketListenerImplMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_forge/ServerGamePacketListenerImplMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_forge/ServerLoginPacketListenerImplMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_forge/ServerboundCustomPayloadPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_forge/ServerboundCustomQueryPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_forge/VarIntMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_forge/VarLongMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_forge/Varint21FrameDecoderMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_forge/Varint21LengthFieldPrependerMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_neoforge/ClientboundCustomPayloadPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_neoforge/ClientboundCustomQueryPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_neoforge/ClientboundLevelChunkPacketDataMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_neoforge/CompressionDecoderMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_neoforge/CompressionEncoderMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_neoforge/ConnectionMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_neoforge/FriendlyByteBufMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_neoforge/NbtAccounterMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_neoforge/PacketEncoderMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_neoforge/ServerCommonPacketListenerImplMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_neoforge/ServerGamePacketListenerImplMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_neoforge/ServerLoginPacketListenerImplMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_neoforge/ServerboundCustomPayloadPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_neoforge/ServerboundCustomQueryPacketMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_neoforge/VarIntMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_neoforge/VarLongMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_neoforge/Varint21FrameDecoderMixin', 'X', '', ''],
        ['dev/tonimatas/packetfixer/mixins/v1_20_2_neoforge/Varint21LengthFieldPrependerMixin', 'X', '', ''],
        ['earth/terrarium/adastra/mixins/client/AbstractContainerScreenMixin', 'X', '', ''],
        ['earth/terrarium/adastra/mixins/client/CameraMixin', 'A', 'm_90566_', 'getMaxZoom'],
        ['earth/terrarium/adastra/mixins/client/CameraMixin', 'A', 'm_90568_', 'move'],
        ['earth/terrarium/adastra/mixins/client/EntityRendererMixin', 'X', '', ''],
        ['earth/terrarium/adastra/mixins/client/HumanoidModelMixin', 'X', '', ''],
        ['earth/terrarium/adastra/mixins/client/ItemInHandRendererMixin', 'A', 'm_109346_', 'renderPlayerArm'],
        ['earth/terrarium/adastra/mixins/client/LevelRendererMixin', 'A', 'm_234261_', 'buildClouds'],
        ['earth/terrarium/adastra/mixins/client/PlayerRendererMixin', 'A', 'm_117818_', 'setModelProperties'],
        ['earth/terrarium/adastra/mixins/client/PlayerRendererMixin', 'A', 'm_7523_', 'setupRotations'],
        ['earth/terrarium/adastra/mixins/client/SoundManagerMixin', 'X', '', ''],
        ['earth/terrarium/adastra/mixins/client/multipart/ClientLevelEntityCallbacksMixin', 'X', '', ''],
        ['earth/terrarium/adastra/mixins/client/multipart/EntityRenderDispatcherMixin', 'X', '', ''],
        ['earth/terrarium/adastra/mixins/common/EntityBelowWorldMixin', 'X', '', ''],
        ['earth/terrarium/adastra/mixins/common/LivingEntityMixin', 'X', '', ''],
        ['earth/terrarium/adastra/mixins/common/MobMixin', 'X', '', ''],
        ['earth/terrarium/adastra/mixins/common/PlayerMixin', 'X', '', ''],
        ['earth/terrarium/adastra/mixins/common/ServerGamePacketListenerImplMixin', 'X', '', ''],
        ['earth/terrarium/adastra/mixins/common/ServerLevelMixin', 'X', '', ''],
        ['earth/terrarium/adastra/mixins/common/entities/CreeperMixin', 'X', '', ''],
        ['earth/terrarium/adastra/mixins/common/entities/HoglinMixin', 'X', '', ''],
        ['earth/terrarium/adastra/mixins/common/entities/ZoglinMixin', 'X', '', ''],
        ['earth/terrarium/adastra/mixins/common/environment/FlowingFluidMixin', 'X', '', ''],
        ['earth/terrarium/adastra/mixins/common/environment/IceBlockMixin', 'X', '', ''],
        ['earth/terrarium/adastra/mixins/common/environment/WeatheringCopperFullBlockMixin', 'X', '', ''],
        ['earth/terrarium/adastra/mixins/common/gravity/AbstractArrowMixin', 'X', '', ''],
        ['earth/terrarium/adastra/mixins/common/gravity/BoatMixin', 'X', '', ''],
        ['earth/terrarium/adastra/mixins/common/gravity/FishingHookMixin', 'X', '', ''],
        ['earth/terrarium/adastra/mixins/common/gravity/GravityEntityMixin', 'X', '', ''],
        ['earth/terrarium/adastra/mixins/common/gravity/ThrowableProjectileMixin', 'X', '', ''],
        ['earth/terrarium/adastra/mixins/common/gravity/ThrownExperienceBottleMixin', 'X', '', ''],
        ['earth/terrarium/adastra/mixins/common/gravity/ThrownPotionMixin', 'X', '', ''],
        ['earth/terrarium/adastra/mixins/common/multipart/ChunkMapMixin', 'X', '', ''],
        ['earth/terrarium/adastra/mixins/common/multipart/ServerLevelEntityCallbacksMixin', 'X', '', ''],
        ['earth/terrarium/adastra/mixins/common/multipart/ServerLevelMixin', 'X', '', ''],
        ['earth/terrarium/adastra/mixins/common/radio/LivingEntityMixin', 'X', '', ''],
        ['earth/terrarium/adastra/mixins/common/radio/ServerPlayerMixin', 'X', '', ''],
        ['earth/terrarium/adastra/mixins/forge/common/DimensionSpecialEffectsMixin', 'X', '', ''],
        ['earth/terrarium/adastra/mixins/forge/common/multipart/LevelMixin', 'X', '', ''],
        ['giselle/jei_mekanism_multiblocks/client/mixin/emi/JemiPluginMixin', 'R', '', ''],
        ['github/aqumpusaxy/mana_jade/mixin/ManaStarBlockEntityMixin', 'R', '', ''],
        ['github/aqumpusaxy/mana_jade/mixin/PureDaisyBlockEntityMixin', 'R', '', ''],
        ['guideme/internal/hooks/mixins/LuceneVectorizationMixin', 'R', '', ''],
        ['icyllis/modernui/mc/mixin/MixinChatScreen', 'X', '', ''],
        ['icyllis/modernui/mc/mixin/MixinClientTelemetryManager', 'X', '', ''],
        ['icyllis/modernui/mc/mixin/MixinCommandSuggestions', 'A', 'm_93912_', 'getLastWordIndex'],
        ['icyllis/modernui/mc/mixin/MixinCommandSuggestions', 'A', 'm_93930_', 'showSuggestions'],
        ['icyllis/modernui/mc/mixin/MixinEditBox', 'X', '', ''],
        ['icyllis/modernui/mc/mixin/MixinFoodData', 'X', '', ''],
        ['icyllis/modernui/mc/mixin/MixinGameRenderer', 'X', '', ''],
        ['icyllis/modernui/mc/mixin/MixinKeyboardHandler', 'X', '', ''],
        ['icyllis/modernui/mc/mixin/MixinLevelLoadingScreen', 'X', '', ''],
        ['icyllis/modernui/mc/mixin/MixinLevelRendererDBG', 'X', '', ''],
        ['icyllis/modernui/mc/mixin/MixinMinecraft', 'A', 'm_91302_', 'isWindowActive'],
        ['icyllis/modernui/mc/mixin/MixinMouseHandler', 'X', '', ''],
        ['icyllis/modernui/mc/mixin/MixinRenderSystem', 'X', '', ''],
        ['icyllis/modernui/mc/mixin/MixinScreen', 'X', '', ''],
        ['icyllis/modernui/mc/mixin/MixinScrollPanel', 'X', '', ''],
        ['icyllis/modernui/mc/mixin/MixinSelectionList', 'A', 'm_93517_', 'getScrollAmount'],
        ['icyllis/modernui/mc/mixin/MixinSelectionList', 'A', 'm_93518_', 'getMaxScroll'],
        ['icyllis/modernui/mc/mixin/MixinStringSplitter', 'X', '', ''],
        ['icyllis/modernui/mc/mixin/MixinTextFieldHelper', 'X', '', ''],
        ['icyllis/modernui/mc/mixin/MixinWindow', 'A', 'm_85441_', 'getWidth'],
        ['icyllis/modernui/mc/mixin/MixinWindow', 'A', 'm_85442_', 'getHeight'],
        ['icyllis/modernui/mc/mixin/MixinWindow', 'A', 'm_85450_', 'findBestMonitor'],
        ['icyllis/modernui/mc/text/mixin/MixinCommandSuggestions', 'X', '', ''],
        ['icyllis/modernui/mc/text/mixin/MixinEditBox', 'A', 'm_94210_', 'getInnerWidth'],
        ['icyllis/modernui/mc/text/mixin/MixinEditBox', 'A', 'm_94216_', 'getMaxLength'],
        ['icyllis/modernui/mc/text/mixin/MixinFontRenderer', 'X', '', ''],
        ['icyllis/modernui/mc/text/mixin/MixinGameRenderer', 'X', '', ''],
        ['icyllis/modernui/mc/text/mixin/MixinIngameGui', 'X', '', ''],
        ['icyllis/modernui/mc/text/mixin/MixinLevelRenderer', 'X', '', ''],
        ['icyllis/modernui/mc/text/mixin/MixinSignEditScreen', 'X', '', ''],
        ['io/github/lounode/ae2cs/mixin/CableBusBlockEntityMixin', 'R', '', ''],
        ['io/github/lounode/ae2cs/mixin/GridNodeMixin', 'R', '', ''],
        ['io/github/lounode/ae2cs/mixin/GrowthAcceleratorBlockEntityMixin', 'R', '', ''],
        ['io/github/lounode/eventwrapper/mixin/ItemCooldownEventPoster', 'X', '', ''],
        ['io/github/lounode/extrabotany/forge/mixin/SimulateDestroyMixinForge', 'A', 'm_9295_', 'isCreative'],
        ['io/github/lounode/extrabotany/mixin/CustomClimbingItemMixin', 'X', '', ''],
        ['io/github/lounode/extrabotany/mixin/DenyJumpMixin', 'X', '', ''],
        ['io/github/lounode/extrabotany/mixin/ElementiumHammerFilter', 'X', '', ''],
        ['io/github/lounode/extrabotany/mixin/ItemCustomEnchantableEnchantTableSupporter', 'X', '', ''],
        ['io/github/lounode/extrabotany/mixin/ItemCustomEnchantableSupporter', 'X', '', ''],
        ['io/github/lounode/extrabotany/mixin/TradeOrchidEditSpecialPrice', 'X', '', ''],
        ['io/github/lounode/extrabotany/mixin/botania/DisplayWindLevel', 'R', '', ''],
        ['io/github/lounode/extrabotany/mixin/botania/GaiaGuardianAdditionalSpawnCheck', 'R', '', ''],
        ['io/github/lounode/extrabotany/mixin/botania/MagicMissileTargetBypassGaiaIII', 'R', '', ''],
        ['io/github/lounode/extrabotany/mixin/botania/WandOfTheForestExtension', 'R', '', ''],
        ['io/github/lounode/extrabotany/mixin/client/HUDHandlerMixin', 'R', '', ''],
        ['io/github/lounode/extrabotany/mixin/client/PatchouliTemplateXModMixin', 'R', '', ''],
        ['io/github/lounode/extrabotany/mixin/client/PatchouliTemplateXModMixinBuilder', 'R', '', ''],
        ['io/github/projectet/ae2things/mixin/CursedInternalSlotMixin', 'A', 'm_142503_', 'setCarried'],
        ['malte0811/ferritecore/mixin/blockstatecache/BlockStateBaseMixin', 'A', 'm_7160_', 'asState'],
        ['malte0811/ferritecore/mixin/dedupbakedquad/SimpleModelBuilderMixin', 'X', '', ''],
        ['malte0811/ferritecore/mixin/dedupmultipart/MixinMultipartBuilder', 'X', '', ''],
        ['malte0811/ferritecore/mixin/dedupmultipart/MixinMultipartModel', 'X', '', ''],
        ['malte0811/ferritecore/mixin/fastmap/FastMapStateHolderMixin', 'X', '', ''],
        ['malte0811/ferritecore/mixin/modelsides/SimpleBakedModelMixin', 'X', '', ''],
        ['malte0811/ferritecore/mixin/mrl/ModelResourceLocationMixin', 'X', '', ''],
        ['malte0811/ferritecore/mixin/threaddetec/PalettedContainerMixin', 'X', '', ''],
        ['me/flashyreese/mods/sodiumextra/mixin/biome_colors/MixinBiomeColors', 'X', '', ''],
        ['me/flashyreese/mods/sodiumextra/mixin/compat/MixinSodiumOptionsGUI', 'R', '', ''],
        ['me/flashyreese/mods/sodiumextra/mixin/fog/MixinBackgroundRenderer', 'A', 'm_234165_', 'getPriorityFogFunction'],
        ['me/flashyreese/mods/sodiumextra/mixin/fog_falloff/MixinBackgroundRenderer', 'X', '', ''],
        ['me/flashyreese/mods/sodiumextra/mixin/instant_sneak/MixinCamera', 'X', '', ''],
        ['me/flashyreese/mods/sodiumextra/mixin/light_updates/MixinLightingProvider', 'X', '', ''],
        ['me/flashyreese/mods/sodiumextra/mixin/optimizations/beacon_beam_rendering/MixinBeaconBlockEntityRenderer', 'X', '', ''],
        ['me/flashyreese/mods/sodiumextra/mixin/optimizations/beacon_beam_rendering/MixinVertexSerializerRegistryImpl', 'R', '', ''],
        ['me/flashyreese/mods/sodiumextra/mixin/optimizations/draw_helpers/MixinDrawContext', 'A', 'm_286081_', 'flushIfUnmanaged'],
        ['me/flashyreese/mods/sodiumextra/mixin/optimizations/fast_weather/MixinWorldRenderer', 'X', '', ''],
        ['me/flashyreese/mods/sodiumextra/mixin/particle/MixinFireworkParticle', 'X', '', ''],
        ['me/flashyreese/mods/sodiumextra/mixin/particle/MixinParticleManager', 'X', '', ''],
        ['me/flashyreese/mods/sodiumextra/mixin/particle/MixinWorldRenderer', 'X', '', ''],
        ['me/flashyreese/mods/sodiumextra/mixin/prevent_shaders/MixinGameRenderer', 'X', '', ''],
        ['me/flashyreese/mods/sodiumextra/mixin/profiler/MixinBlockEntityRenderDispatcher', 'X', '', ''],
        ['me/flashyreese/mods/sodiumextra/mixin/profiler/MixinEntityRenderDispatcher', 'A', 'm_114382_', 'getRenderer'],
        ['me/flashyreese/mods/sodiumextra/mixin/reduce_resolution_on_mac/MixinWindow', 'X', '', ''],
        ['me/flashyreese/mods/sodiumextra/mixin/render/block/entity/MixinBeaconBlockEntityRenderer', 'A', 'm_112176_', 'renderBeaconBeam'],
        ['me/flashyreese/mods/sodiumextra/mixin/render/block/entity/MixinEnchantingTableBlockEntityRenderer', 'X', '', ''],
        ['me/flashyreese/mods/sodiumextra/mixin/render/block/entity/MixinPistonBlockEntityRenderer', 'X', '', ''],
        ['me/flashyreese/mods/sodiumextra/mixin/render/entity/MixinItemFrameEntityRenderer', 'X', '', ''],
        ['me/flashyreese/mods/sodiumextra/mixin/render/entity/MixinLivingEntityRenderer', 'X', '', ''],
        ['me/flashyreese/mods/sodiumextra/mixin/render/entity/MixinPaintingEntityRenderer', 'X', '', ''],
        ['me/flashyreese/mods/sodiumextra/mixin/sky/MixinWorldRenderer', 'X', '', ''],
        ['me/flashyreese/mods/sodiumextra/mixin/sky_colors/MixinBiome', 'X', '', ''],
        ['me/flashyreese/mods/sodiumextra/mixin/sodium/accessibility/MixinSodiumGameOptionPages', 'R', '', ''],
        ['me/flashyreese/mods/sodiumextra/mixin/sodium/cloud/MixinCloudRenderer', 'R', '', ''],
        ['me/flashyreese/mods/sodiumextra/mixin/sodium/fog/MixinOcclusionCuller', 'R', '', ''],
        ['me/flashyreese/mods/sodiumextra/mixin/sodium/resolution/MixinSodiumGameOptionPages', 'R', '', ''],
        ['me/flashyreese/mods/sodiumextra/mixin/sodium/scrollable_page/MixinSodiumOptionsGUI', 'R', '', ''],
        ['me/flashyreese/mods/sodiumextra/mixin/steady_debug_hud/MixinDebugHud', 'X', '', ''],
        ['me/flashyreese/mods/sodiumextra/mixin/sun_moon/MixinWorldRenderer', 'X', '', ''],
        ['me/flashyreese/mods/sodiumextra/mixin/toasts/MixinAdvancementToast', 'X', '', ''],
        ['me/flashyreese/mods/sodiumextra/mixin/toasts/MixinRecipeToast', 'X', '', ''],
        ['me/flashyreese/mods/sodiumextra/mixin/toasts/MixinSystemToast', 'X', '', ''],
        ['me/flashyreese/mods/sodiumextra/mixin/toasts/MixinToastManager', 'X', '', ''],
        ['me/flashyreese/mods/sodiumextra/mixin/toasts/MixinTutorialToast', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/core/CrashReportExtenderMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/core/MinecraftClientMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/core/gui/DownloadingTerrainScreenMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/core/model/SimpleBakedModelBuilderMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/core/model/colors/BlockColorsMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/core/model/colors/ItemColorsMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/core/model/quad/BakedQuadFactoryMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/core/model/quad/BakedQuadMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/core/render/immediate/consumer/BufferBuilderMixin', 'A', 'm_85722_', 'ensureCapacity'],
        ['me/jellysquid/mods/sodium/mixin/core/render/immediate/consumer/OutlineVertexConsumerMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/core/render/immediate/consumer/OverlayVertexConsumerMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/core/render/immediate/consumer/SpriteTexturedVertexConsumerMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/core/render/immediate/consumer/VertexConsumersMixin$DualMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/core/render/immediate/consumer/VertexConsumersMixin$UnionMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/core/render/world/ChunkBuilderMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/core/render/world/WorldRendererMixin', 'A', 'm_109817_', 'shouldShowEntityOutlines'],
        ['me/jellysquid/mods/sodium/mixin/core/world/biome/ClientWorldMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/core/world/chunk/PalettedContainerMixin', 'A', 'm_199931_', 'copy'],
        ['me/jellysquid/mods/sodium/mixin/core/world/map/ClientPlayNetworkHandlerMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/core/world/map/ClientWorldMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/features/gui/hooks/console/GameRendererMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/features/gui/hooks/debug/DebugHudMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/features/gui/hooks/settings/OptionsScreenMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/features/model/ModelBakeryMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/features/model/ModelDataBuilderMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/features/model/MultipartBakedModelMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/features/options/overlays/InGameHudMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/features/options/overlays/VanillaGuiOverlayMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/features/options/render_layers/RenderLayersMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/features/options/weather/WorldRendererMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/features/render/entity/cull/EntityRendererMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/features/render/entity/fast_render/CuboidMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/features/render/entity/fast_render/ModelPartMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/features/render/entity/remove_streams/HierarchicalModelMixin', 'A', 'm_142109_', 'root'],
        ['me/jellysquid/mods/sodium/mixin/features/render/entity/shadows/EntityRenderDispatcherMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/features/render/gui/debug/ForgeGuiMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/features/render/gui/font/FontSetMixin', 'A', 'm_232564_', 'computeBakedGlyph'],
        ['me/jellysquid/mods/sodium/mixin/features/render/gui/font/FontSetMixin', 'A', 'm_243121_', 'computeGlyphInfo'],
        ['me/jellysquid/mods/sodium/mixin/features/render/gui/font/GlyphRendererMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/features/render/gui/outlines/WorldRendererMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/features/render/immediate/buffer_builder/BufferBuilderMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/features/render/immediate/buffer_builder/VertexFormatMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/features/render/immediate/buffer_builder/fast_delegate/BufferSourceMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/features/render/immediate/matrix_stack/VertexConsumerMixin', 'A', 'm_5483_', 'vertex'],
        ['me/jellysquid/mods/sodium/mixin/features/render/immediate/matrix_stack/VertexConsumerMixin', 'A', 'm_5601_', 'normal'],
        ['me/jellysquid/mods/sodium/mixin/features/render/model/ChunkRenderTypeSetMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/features/render/model/block/BlockModelRendererMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/features/render/model/item/ItemRendererMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/features/render/particle/BillboardParticleMixin', 'A', 'm_5902_', 'getQuadSize'],
        ['me/jellysquid/mods/sodium/mixin/features/render/particle/BillboardParticleMixin', 'A', 'm_5950_', 'getV1'],
        ['me/jellysquid/mods/sodium/mixin/features/render/particle/BillboardParticleMixin', 'A', 'm_5951_', 'getV0'],
        ['me/jellysquid/mods/sodium/mixin/features/render/particle/BillboardParticleMixin', 'A', 'm_5952_', 'getU1'],
        ['me/jellysquid/mods/sodium/mixin/features/render/particle/BillboardParticleMixin', 'A', 'm_5970_', 'getU0'],
        ['me/jellysquid/mods/sodium/mixin/features/render/world/ClientLevelMixin', 'A', 'm_104689_', 'trySpawnDripParticles'],
        ['me/jellysquid/mods/sodium/mixin/features/render/world/ClientLevelMixin', 'A', 'm_263888_', 'lambda$doAnimateTick$8'],
        ['me/jellysquid/mods/sodium/mixin/features/render/world/clouds/WorldRendererMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/features/render/world/sky/BackgroundRendererMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/features/render/world/sky/ClientWorldMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/features/render/world/sky/WorldRendererMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/features/shader/uniform/ShaderProgramMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/features/textures/animations/tracking/BlockModelRendererMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/features/textures/animations/tracking/DrawContextMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/features/textures/animations/tracking/SpriteAtlasTextureMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/features/textures/animations/tracking/SpriteBillboardParticleMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/features/textures/animations/tracking/SpriteContentsAnimatorImplMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/features/textures/animations/upload/SpriteContentsInterpolationMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/features/textures/mipmaps/SpriteContentsMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/features/world/biome/BiomeMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/modcompat/brandonscore/BCClientEventHandlerMixin', 'R', '', ''],
        ['me/jellysquid/mods/sodium/mixin/modcompat/fabric_renderer_indigo/ItemRenderContextMixin', 'R', '', ''],
        ['me/jellysquid/mods/sodium/mixin/workarounds/context_creation/WindowMixin', 'X', '', ''],
        ['me/jellysquid/mods/sodium/mixin/workarounds/event_loop/RenderSystemMixin', 'X', '', ''],
        ['me/srrapero720/chloride/mixins/impl/BorderlessMixin$KeyboardHandlerMixin', 'X', '', ''],
        ['me/srrapero720/chloride/mixins/impl/BorderlessMixin$WindowMixin', 'X', '', ''],
        ['me/srrapero720/chloride/mixins/impl/CloudHeightMixin', 'X', '', ''],
        ['me/srrapero720/chloride/mixins/impl/EntityDistanceCullingMixin$EntityDispatcherMixin', 'X', '', ''],
        ['me/srrapero720/chloride/mixins/impl/EntityDistanceCullingMixin$EntityTypeMixin', 'A', 'm_20674_', 'getCategory'],
        ['me/srrapero720/chloride/mixins/impl/EntityDistanceCullingMixin$LevelRendererEntityMixin', 'X', '', ''],
        ['me/srrapero720/chloride/mixins/impl/EntityDistanceCullingMixin$TileDispatcherMixin', 'X', '', ''],
        ['me/srrapero720/chloride/mixins/impl/FastBlocksMixins$BedMixin', 'X', '', ''],
        ['me/srrapero720/chloride/mixins/impl/FastBlocksMixins$ChestsMixin', 'X', '', ''],
        ['me/srrapero720/chloride/mixins/impl/FastBlocksMixins$TileRenderMixin', 'X', '', ''],
        ['me/srrapero720/chloride/mixins/impl/FogAndBandMixin', 'X', '', ''],
        ['me/srrapero720/chloride/mixins/impl/FontShadowMixin', 'X', '', ''],
        ['me/srrapero720/chloride/mixins/impl/FontShadowMixin$StringRenderOutputMixin', 'X', '', ''],
        ['me/srrapero720/chloride/mixins/impl/OverlayMixin', 'X', '', ''],
        ['me/srrapero720/chloride/mixins/impl/ParticlesMixins$EngineMixin', 'X', '', ''],
        ['me/srrapero720/chloride/mixins/impl/ParticlesMixins$FireworkStarterMixin', 'X', '', ''],
        ['me/srrapero720/chloride/mixins/impl/ParticlesMixins$LevelRendererMixin', 'X', '', ''],
        ['me/srrapero720/chloride/mixins/impl/darkness/DimensionEffectsMixin$EndMixin', 'X', '', ''],
        ['me/srrapero720/chloride/mixins/impl/darkness/DimensionEffectsMixin$NetherMixin', 'X', '', ''],
        ['me/srrapero720/chloride/mixins/impl/darkness/DimensionTypeMixin', 'X', '', ''],
        ['me/srrapero720/chloride/mixins/impl/darkness/DynamicTextureMixin', 'X', '', ''],
        ['me/srrapero720/chloride/mixins/impl/darkness/GameRendererMixin', 'X', '', ''],
        ['me/srrapero720/chloride/mixins/impl/darkness/LightTextureMixin', 'X', '', ''],
        ['me/srrapero720/chloride/mixins/impl/jei_rei_emi/JeiOverlayMixin', 'R', '', ''],
        ['net/celsiusqc/ad_astra_rocketed/mixins/TittleScreenMixin', 'X', '', ''],
        ['net/creeperhost/polylib/forge/mixins/AbstractContainerScreenMixin', 'X', '', ''],
        ['net/creeperhost/polylib/mixins/MixinClientLevelData', 'A', 'm_5472_', 'getDifficulty'],
        ['net/creeperhost/polylib/mixins/MixinLevelSettings', 'X', '', ''],
        ['net/irisshaders/batchedentityrendering/mixin/MixinBannerRenderer_Disabled', 'M', 'Lnet/minecraft/client/renderer/blockentity/BannerRenderer;renderPatterns(Lcom/mojang/blaze3d/vertex/PoseStack;Lnet/minecraft/client/renderer/MultiBufferSource;IILnet/minecraft/client/model/geom/ModelPart;Lnet/minecraft/client/resources/model/Material;ZLjava/util/List;Z)V', 'renderPatterns(Lcom/mojang/blaze3d/vertex/PoseStack;Lnet/minecraft/client/renderer/MultiBufferSource;IILnet/minecraft/client/model/geom/ModelPart;Lnet/minecraft/client/resources/model/Material;ZLjava/util/List;Z)V'],
        ['net/irisshaders/batchedentityrendering/mixin/MixinBufferBuilder_SegmentRendering', 'A', 'm_85665_', 'ensureVertexCapacity'],
        ['net/irisshaders/batchedentityrendering/mixin/MixinCompositeRenderType', 'X', '', ''],
        ['net/irisshaders/batchedentityrendering/mixin/MixinDebugScreenOverlay', 'X', '', ''],
        ['net/irisshaders/batchedentityrendering/mixin/MixinFishingHookRenderer', 'X', '', ''],
        ['net/irisshaders/batchedentityrendering/mixin/MixinLevelRenderer', 'X', '', ''],
        ['net/irisshaders/batchedentityrendering/mixin/MixinLevelRenderer_EntityListSorting', 'X', '', ''],
        ['net/irisshaders/batchedentityrendering/mixin/MixinRenderBuffers', 'X', '', ''],
        ['net/irisshaders/batchedentityrendering/mixin/MixinSheets', 'X', '', ''],
        ['net/irisshaders/iris/compat/indigo/mixin/MixinAbstractBlockRenderContext', 'R', '', ''],
        ['net/irisshaders/iris/compat/indium/mixin/MixinAbstractBlockRenderContext', 'R', '', ''],
        ['net/irisshaders/iris/compat/pixelmon/mixin/MixinNormalizedFace', 'R', '', ''],
        ['net/irisshaders/iris/compat/sodium/mixin/block_id/MixinChunkBuildBuffers', 'R', '', ''],
        ['net/irisshaders/iris/compat/sodium/mixin/block_id/MixinChunkRenderRebuildTask', 'R', '', ''],
        ['net/irisshaders/iris/compat/sodium/mixin/clouds/MixinCloudRenderer', 'R', '', ''],
        ['net/irisshaders/iris/compat/sodium/mixin/copyEntity/CuboidMixin', 'X', '', ''],
        ['net/irisshaders/iris/compat/sodium/mixin/copyEntity/ModelPartMixin', 'X', '', ''],
        ['net/irisshaders/iris/compat/sodium/mixin/copyEntity/cull/EntityRendererMixin', 'X', '', ''],
        ['net/irisshaders/iris/compat/sodium/mixin/copyEntity/shadows/EntityRenderDispatcherMixin', 'X', '', ''],
        ['net/irisshaders/iris/compat/sodium/mixin/directional_shading/MixinFlatLightPipeline', 'R', '', ''],
        ['net/irisshaders/iris/compat/sodium/mixin/directional_shading/MixinSmoothLightPipeline', 'R', '', ''],
        ['net/irisshaders/iris/compat/sodium/mixin/font/MixinGlyphRenderer', 'X', '', ''],
        ['net/irisshaders/iris/compat/sodium/mixin/options/MixinOptionImpl', 'R', '', ''],
        ['net/irisshaders/iris/compat/sodium/mixin/options/MixinRenderSectionManager', 'R', '', ''],
        ['net/irisshaders/iris/compat/sodium/mixin/options/MixinSodiumGameOptionPages', 'R', '', ''],
        ['net/irisshaders/iris/compat/sodium/mixin/options/MixinSodiumGameOptions', 'R', '', ''],
        ['net/irisshaders/iris/compat/sodium/mixin/options/MixinSodiumOptionsGUI', 'R', '', ''],
        ['net/irisshaders/iris/compat/sodium/mixin/pbr_animation/MixinSpriteContents', 'X', '', ''],
        ['net/irisshaders/iris/compat/sodium/mixin/shader_overrides/MixinChunkBuilderMeshingTask', 'R', '', ''],
        ['net/irisshaders/iris/compat/sodium/mixin/shader_overrides/MixinGlProgram', 'R', '', ''],
        ['net/irisshaders/iris/compat/sodium/mixin/shader_overrides/MixinGlRenderDevice', 'R', '', ''],
        ['net/irisshaders/iris/compat/sodium/mixin/shader_overrides/MixinRegionChunkRenderer', 'R', '', ''],
        ['net/irisshaders/iris/compat/sodium/mixin/shader_overrides/MixinShaderChunkRenderer', 'R', '', ''],
        ['net/irisshaders/iris/compat/sodium/mixin/shadow_map/MixinDefaultChunkRenderer', 'R', '', ''],
        ['net/irisshaders/iris/compat/sodium/mixin/shadow_map/MixinRenderSectionManager', 'R', '', ''],
        ['net/irisshaders/iris/compat/sodium/mixin/shadow_map/MixinSodiumWorldRenderer', 'R', '', ''],
        ['net/irisshaders/iris/compat/sodium/mixin/sky/MixinLevelRenderer', 'X', '', ''],
        ['net/irisshaders/iris/compat/sodium/mixin/vertex_format/MixinGlVertexFormatBuilder', 'R', '', ''],
        ['net/irisshaders/iris/compat/sodium/mixin/vertex_format/MixinRegionChunkRenderer', 'R', '', ''],
        ['net/irisshaders/iris/compat/sodium/mixin/vertex_format/MixinRenderRegionArenas', 'R', '', ''],
        ['net/irisshaders/iris/compat/sodium/mixin/vertex_format/MixinRenderSectionManager', 'R', '', ''],
        ['net/irisshaders/iris/compat/sodium/mixin/vertex_format/MixinSodiumBufferBuilder', 'R', '', ''],
        ['net/irisshaders/iris/compat/sodium/mixin/vertex_format/MixinVertexFormatDescriptionImpl', 'R', '', ''],
        ['net/irisshaders/iris/compat/sodium/mixin/vertex_format/MixinVertexSerializerCache', 'R', '', ''],
        ['net/irisshaders/iris/compat/sodium/mixin/vertex_format/entity/MixinModelVertex', 'R', '', ''],
        ['net/irisshaders/iris/mixin/MixinBiomes', 'X', '', ''],
        ['net/irisshaders/iris/mixin/MixinBlockStateBehavior', 'A', 'm_60734_', 'getBlock'],
        ['net/irisshaders/iris/mixin/MixinBlockStateBehavior', 'A', 'm_7160_', 'asState'],
        ['net/irisshaders/iris/mixin/MixinBooleanState', 'X', '', ''],
        ['net/irisshaders/iris/mixin/MixinChainedJsonException', 'X', '', ''],
        ['net/irisshaders/iris/mixin/MixinChunkRenderDispatcherRebuildTask', 'X', '', ''],
        ['net/irisshaders/iris/mixin/MixinClientLanguage', 'X', '', ''],
        ['net/irisshaders/iris/mixin/MixinClientPacketListener', 'X', '', ''],
        ['net/irisshaders/iris/mixin/MixinDebugScreenOverlay', 'X', '', ''],
        ['net/irisshaders/iris/mixin/MixinEntityRenderDispatcher', 'X', '', ''],
        ['net/irisshaders/iris/mixin/MixinFogRenderer', 'X', '', ''],
        ['net/irisshaders/iris/mixin/MixinGameRenderer', 'X', '', ''],
        ['net/irisshaders/iris/mixin/MixinGameRenderer_NightVisionCompat', 'X', '', ''],
        ['net/irisshaders/iris/mixin/MixinGlStateManager', 'X', '', ''],
        ['net/irisshaders/iris/mixin/MixinGlStateManager_BlendOverride', 'X', '', ''],
        ['net/irisshaders/iris/mixin/MixinGlStateManager_DepthColorOverride', 'X', '', ''],
        ['net/irisshaders/iris/mixin/MixinGlStateManager_FramebufferBinding', 'X', '', ''],
        ['net/irisshaders/iris/mixin/MixinItemBlockRenderTypes', 'X', '', ''],
        ['net/irisshaders/iris/mixin/MixinItemInHandRenderer', 'X', '', ''],
        ['net/irisshaders/iris/mixin/MixinLevelRenderer', 'M', 'Lnet/minecraft/client/renderer/LevelRenderer;renderClouds(Lcom/mojang/blaze3d/vertex/PoseStack;Lorg/joml/Matrix4f;FDDD)V', 'renderClouds(Lcom/mojang/blaze3d/vertex/PoseStack;Lorg/joml/Matrix4f;FDDD)V'],
        ['net/irisshaders/iris/mixin/MixinLevelRenderer', 'M', 'Lnet/minecraft/client/renderer/LevelRenderer;renderLevel(Lcom/mojang/blaze3d/vertex/PoseStack;FJZLnet/minecraft/client/Camera;Lnet/minecraft/client/renderer/GameRenderer;Lnet/minecraft/client/renderer/LightTexture;Lorg/joml/Matrix4f;)V', 'renderLevel(Lcom/mojang/blaze3d/vertex/PoseStack;FJZLnet/minecraft/client/Camera;Lnet/minecraft/client/renderer/GameRenderer;Lnet/minecraft/client/renderer/LightTexture;Lorg/joml/Matrix4f;)V'],
        ['net/irisshaders/iris/mixin/MixinLevelRenderer', 'M', 'Lnet/minecraft/client/renderer/LevelRenderer;renderSky(Lcom/mojang/blaze3d/vertex/PoseStack;Lorg/joml/Matrix4f;FLnet/minecraft/client/Camera;ZLjava/lang/Runnable;)V', 'renderSky(Lcom/mojang/blaze3d/vertex/PoseStack;Lorg/joml/Matrix4f;FLnet/minecraft/client/Camera;ZLjava/lang/Runnable;)V'],
        ['net/irisshaders/iris/mixin/MixinLevelRenderer', 'M', 'Lnet/minecraft/client/renderer/LevelRenderer;renderSnowAndRain(Lnet/minecraft/client/renderer/LightTexture;FDDD)V', 'renderSnowAndRain(Lnet/minecraft/client/renderer/LightTexture;FDDD)V'],
        ['net/irisshaders/iris/mixin/MixinLightTexture', 'X', '', ''],
        ['net/irisshaders/iris/mixin/MixinLightningBoltRenderer', 'X', '', ''],
        ['net/irisshaders/iris/mixin/MixinMaxFpsCrashFix', 'X', '', ''],
        ['net/irisshaders/iris/mixin/MixinMinecraft_PipelineManagement', 'X', '', ''],
        ['net/irisshaders/iris/mixin/MixinModelViewBobbing', 'X', '', ''],
        ['net/irisshaders/iris/mixin/MixinOptions_Entrypoint', 'X', '', ''],
        ['net/irisshaders/iris/mixin/MixinParticleEngine', 'M', 'Lnet/minecraft/client/particle/ParticleEngine;render(Lcom/mojang/blaze3d/vertex/PoseStack;Lnet/minecraft/client/renderer/MultiBufferSource$BufferSource;Lnet/minecraft/client/renderer/LightTexture;Lnet/minecraft/client/Camera;FLnet/minecraft/client/renderer/culling/Frustum;)V', 'render(Lcom/mojang/blaze3d/vertex/PoseStack;Lnet/minecraft/client/renderer/MultiBufferSource$BufferSource;Lnet/minecraft/client/renderer/LightTexture;Lnet/minecraft/client/Camera;FLnet/minecraft/client/renderer/culling/Frustum;)V'],
        ['net/irisshaders/iris/mixin/MixinProgram', 'X', '', ''],
        ['net/irisshaders/iris/mixin/MixinProgramManager', 'X', '', ''],
        ['net/irisshaders/iris/mixin/MixinRenderSystem', 'X', '', ''],
        ['net/irisshaders/iris/mixin/MixinRenderTarget', 'X', '', ''],
        ['net/irisshaders/iris/mixin/MixinScreenEffectRenderer', 'X', '', ''],
        ['net/irisshaders/iris/mixin/MixinShaderInstance', 'A', 'm_108943_', 'getId'],
        ['net/irisshaders/iris/mixin/MixinSystemReport', 'A', 'm_143522_', 'setDetail'],
        ['net/irisshaders/iris/mixin/MixinTheEndPortalRenderer', 'A', 'm_142489_', 'getOffsetDown'],
        ['net/irisshaders/iris/mixin/MixinTheEndPortalRenderer', 'A', 'm_142491_', 'getOffsetUp'],
        ['net/irisshaders/iris/mixin/MixinTitleScreen', 'X', '', ''],
        ['net/irisshaders/iris/mixin/MixinTweakFarPlane', 'A', 'm_172790_', 'getDepthFar'],
        ['net/irisshaders/iris/mixin/MixinUniform', 'X', '', ''],
        ['net/irisshaders/iris/mixin/MixinVertexBuffer', 'A', 'm_85921_', 'bind'],
        ['net/irisshaders/iris/mixin/MixinWindow', 'X', '', ''],
        ['net/irisshaders/iris/mixin/bettermipmaps/MixinTextureAtlasSprite', 'X', '', ''],
        ['net/irisshaders/iris/mixin/entity_render_context/MixinBlockEntityRenderDispatcher', 'X', '', ''],
        ['net/irisshaders/iris/mixin/entity_render_context/MixinCapeLayer', 'X', '', ''],
        ['net/irisshaders/iris/mixin/entity_render_context/MixinElytraLayer', 'X', '', ''],
        ['net/irisshaders/iris/mixin/entity_render_context/MixinEntityRenderDispatcher', 'X', '', ''],
        ['net/irisshaders/iris/mixin/entity_render_context/MixinHorseArmorLayer', 'X', '', ''],
        ['net/irisshaders/iris/mixin/entity_render_context/MixinHumanoidArmorLayer', 'X', '', ''],
        ['net/irisshaders/iris/mixin/entity_render_context/MixinItemRenderer', 'X', '', ''],
        ['net/irisshaders/iris/mixin/entity_render_context/MixinRenderFlame', 'R', '', ''],
        ['net/irisshaders/iris/mixin/entity_render_context/MixinRenderMekasuit', 'R', '', ''],
        ['net/irisshaders/iris/mixin/fabulous/MixinDisableFabulousGraphics', 'X', '', ''],
        ['net/irisshaders/iris/mixin/fantastic/MixinLevelRenderer', 'X', '', ''],
        ['net/irisshaders/iris/mixin/fantastic/MixinParticleEngine', 'X', '', ''],
        ['net/irisshaders/iris/mixin/fantastic/MixinStationaryItemParticle', 'X', '', ''],
        ['net/irisshaders/iris/mixin/fantastic/MixinTerrainParticle', 'X', '', ''],
        ['net/irisshaders/iris/mixin/gui/MixinForgeGui', 'X', '', ''],
        ['net/irisshaders/iris/mixin/gui/MixinGui', 'X', '', ''],
        ['net/irisshaders/iris/mixin/gui/MixinVideoSettingsScreen', 'X', '', ''],
        ['net/irisshaders/iris/mixin/integrationtest/MixinRenderTarget_StencilBufferTest', 'X', '', ''],
        ['net/irisshaders/iris/mixin/shadows/MixinBeaconRenderer', 'X', '', ''],
        ['net/irisshaders/iris/mixin/sky/MixinClientLevelData_DisableVoidPlane', 'X', '', ''],
        ['net/irisshaders/iris/mixin/sky/MixinDimensionSpecialEffects', 'X', '', ''],
        ['net/irisshaders/iris/mixin/sky/MixinLevelRenderer_SunMoonToggle', 'X', '', ''],
        ['net/irisshaders/iris/mixin/sky/MixinOptions_CloudsOverride', 'X', '', ''],
        ['net/irisshaders/iris/mixin/state_tracking/MixinRenderTarget', 'X', '', ''],
        ['net/irisshaders/iris/mixin/statelisteners/MixinGlStateManager', 'X', '', ''],
        ['net/irisshaders/iris/mixin/statelisteners/MixinRenderSystem', 'X', '', ''],
        ['net/irisshaders/iris/mixin/texture/MixinAbstractTexture', 'X', '', ''],
        ['net/irisshaders/iris/mixin/texture/MixinGlStateManager', 'X', '', ''],
        ['net/irisshaders/iris/mixin/texture/MixinResourceLocation', 'X', '', ''],
        ['net/irisshaders/iris/mixin/texture/MixinSpriteContents', 'X', '', ''],
        ['net/irisshaders/iris/mixin/texture/MixinTextureManager', 'X', '', ''],
        ['net/irisshaders/iris/mixin/texture/pbr/MixinSpriteContents', 'X', '', ''],
        ['net/irisshaders/iris/mixin/texture/pbr/MixinTextureAtlas', 'X', '', ''],
        ['net/irisshaders/iris/mixin/vertices/MixinBufferBuilder', 'A', 'm_166779_', 'begin'],
        ['net/irisshaders/iris/mixin/vertices/MixinBufferBuilder', 'A', 'm_5586_', 'putShort'],
        ['net/irisshaders/iris/mixin/vertices/MixinBufferBuilder', 'A', 'm_5751_', 'nextElement'],
        ['net/irisshaders/iris/mixin/vertices/MixinVertexFormat', 'X', '', ''],
        ['net/irisshaders/iris/mixin/vertices/MixinVertexFormatElement', 'X', '', ''],
        ['net/irisshaders/iris/mixin/vertices/block_rendering/MixinBufferBuilder_SeparateAo', 'X', '', ''],
        ['net/irisshaders/iris/mixin/vertices/block_rendering/MixinChunkRebuildTask', 'M', 'Lnet/minecraft/client/renderer/chunk/ChunkRenderDispatcher$RenderChunk$RebuildTask;compile(FFFLnet/minecraft/client/renderer/ChunkBufferBuilderPack;)Lnet/minecraft/client/renderer/chunk/ChunkRenderDispatcher$RenderChunk$RebuildTask$CompileResults;', 'compile(FFFLnet/minecraft/client/renderer/ChunkBufferBuilderPack;)Lnet/minecraft/client/renderer/chunk/ChunkRenderDispatcher$RenderChunk$RebuildTask$CompileResults;'],
        ['net/irisshaders/iris/mixin/vertices/block_rendering/MixinClientLevel', 'X', '', ''],
        ['net/irisshaders/iris/mixin/vertices/immediate/MixinBufferSource', 'X', '', ''],
        ['net/irisshaders/iris/mixin/vertices/immediate/MixinLevelRenderer', 'X', '', ''],
        ['net/p3pp3rf1y/sophisticatedcore/mixin/MixinAllay', 'X', '', ''],
        ['net/p3pp3rf1y/sophisticatedcore/mixin/MixinParrot', 'X', '', ''],
        ['net/p3pp3rf1y/sophisticatedcore/mixin/MixinVanillaInventoryCodeHooks', 'X', '', ''],
        ['net/p3pp3rf1y/sophisticatedcore/mixin/create/MixinAbstractContraptionEntity', 'R', '', ''],
        ['org/embeddedt/modernfix/common/mixin/bugfix/buffer_builder_leak/BufferBuilderMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/bugfix/buffer_builder_leak/RenderBuffersMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/bugfix/chunk_deadlock/ChunkMapLoadMixin', 'A', 'm_140327_', 'getVisibleChunkIfPresent'],
        ['org/embeddedt/modernfix/common/mixin/bugfix/chunk_deadlock/ServerChunkCache_CurrentLoadingMixin', 'A', 'm_8364_', 'getVisibleChunkIfPresent'],
        ['org/embeddedt/modernfix/common/mixin/bugfix/cofh_core_crash/FlagManagerMixin', 'R', '', ''],
        ['org/embeddedt/modernfix/common/mixin/bugfix/concurrency/MappedRegistryMixin', 'A', 'm_211067_', 'createTag'],
        ['org/embeddedt/modernfix/common/mixin/bugfix/concurrency/NamespacedWrapperMixin', 'A', 'm_211067_', 'createTag'],
        ['org/embeddedt/modernfix/common/mixin/bugfix/concurrency/ReloadableResourceManagerMixin', 'A', 'm_7217_', 'registerReloadListener'],
        ['org/embeddedt/modernfix/common/mixin/bugfix/ctm_resourceutil_cme/ResourceUtilMixin', 'R', '', ''],
        ['org/embeddedt/modernfix/common/mixin/bugfix/ender_dragon_leak/EnderDragonRendererMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/bugfix/entity_pose_stack/LivingEntityRendererMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/bugfix/entity_pose_stack/PlayerRendererMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/bugfix/extra_experimental_screen/CreateWorldScreenMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/bugfix/forge_vehicle_packets/ServerGamePacketListenerImplMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/bugfix/missing_block_entities/LevelChunkMixin', 'A', 'm_5685_', 'getBlockEntity'],
        ['org/embeddedt/modernfix/common/mixin/bugfix/model_data_manager_cme/ModelDataManagerMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/bugfix/paper_chunk_patches/ChunkMapMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/bugfix/recipe_book_type_desync/RecipeBookSettingsMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/bugfix/registry_ops_cme/RegistryOpsMemoizedMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/bugfix/removed_dimensions/LevelStorageSourceMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/bugfix/restore_old_dragon_movement/EnderDragonMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/bugfix/unsafe_modded_shape_caches/ShapeCacheCyclicMixin', 'R', '', ''],
        ['org/embeddedt/modernfix/common/mixin/bugfix/unsafe_modded_shape_caches/ShapeCacheRSMixin', 'R', '', ''],
        ['org/embeddedt/modernfix/common/mixin/bugfix/world_leaks/MinecraftMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/bugfix/world_screen_skipped/WorldSelectionListMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/core/BootstrapClientMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/core/BootstrapMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/core/CrashReportAnalyserMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/core/GameDataMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/core/MinecraftServerMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/core/NetworkHooksMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/core/WorldLoaderMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/devenv/GameDataMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/feature/blockentity_incorrect_thread/ChunkAccessMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/feature/branding/BrandingControlMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/feature/cause_lag_by_disabling_threads/ChunkRenderDispatcherMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/feature/mcfunction_profiling/ServerFunctionManagerMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/feature/measure_time/BootstrapMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/feature/measure_time/ConnectScreenMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/feature/measure_time/MinecraftMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/feature/measure_time/MinecraftMixin_Forge', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/feature/measure_time/ProfiledReloadInstanceMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/feature/measure_time/SimpleReloadInstanceMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/feature/measure_time/WorldLoaderMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/feature/registry_event_progress/GameDataMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/feature/remove_chat_signing/ChatTrustLevelMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/feature/remove_telemetry/ClientTelemetryManagerMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/feature/remove_telemetry/MinecraftMixin_Telemetry', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/feature/spark_profile_world_join/ConnectionMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/feature/spark_profile_world_join/MinecraftMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/feature/spark_profile_world_join/WorldLoaderMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/attribute_supplier_dedup/AttributeSupplierBuilderMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/attribute_supplier_dedup/AttributeSupplierMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/blast_search_trees/MinecraftMixin', 'A', 'm_231374_', 'populateSearchTree'],
        ['org/embeddedt/modernfix/common/mixin/perf/cache_blockstate_cache_arrays/AbstractBlockStateCacheMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/cache_profile_texture_url/SkinManagerMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/cache_strongholds/ChunkGeneratorMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/cache_strongholds/ConcentricRingsStructurePlacementMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/chunk_meshing/RebuildTaskMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/compact_bit_storage/PalettedContainerMixin', 'A', 'm_188051_', 'createOrReuseData'],
        ['org/embeddedt/modernfix/common/mixin/perf/compact_imposterprotochunks/ImposterProtoChunkMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/compact_mojang_registries/BlockStateDataMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/compact_mojang_registries/MappedRegistryMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/compress_unihex_font/UnihexProviderByteContentsMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/compress_unihex_font/UnihexProviderShortContentsMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/datapack_reload_exceptions/RecipeManagerMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/dedicated_reload_executor/CreateWorldScreenMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/dedicated_reload_executor/MinecraftMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/dedicated_reload_executor/MinecraftServerMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/dedicated_reload_executor/WorldOpenFlowsMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/deduplicate_wall_shapes/WallBlockMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/dynamic_dfu/BlockEntityTypeMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/dynamic_dfu/DataFixTypesMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/dynamic_dfu/DataFixersMixin', 'A', 'm_274588_', 'createFixerUpper'],
        ['org/embeddedt/modernfix/common/mixin/perf/dynamic_dfu/EntityTypeBuilderMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/dynamic_languages/ClientLanguageMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/dynamic_resources/BlockModelShaperMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/dynamic_resources/ForgeHooksClientMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/dynamic_resources/ItemModelMesherForgeMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/dynamic_resources/ItemModelShaperMixin', 'A', 'm_109393_', 'getModelManager'],
        ['org/embeddedt/modernfix/common/mixin/perf/dynamic_resources/ItemRendererMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/dynamic_resources/ModelBakerImplMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/dynamic_resources/ModelBakeryMixin', 'A', 'm_119306_', 'loadTopLevel'],
        ['org/embeddedt/modernfix/common/mixin/perf/dynamic_resources/ModelBakeryMixin', 'A', 'm_119341_', 'getModel'],
        ['org/embeddedt/modernfix/common/mixin/perf/dynamic_resources/ModelBakeryMixin', 'A', 'm_119362_', 'loadModel'],
        ['org/embeddedt/modernfix/common/mixin/perf/dynamic_resources/ModelBakeryMixin', 'A', 'm_119364_', 'loadBlockModel'],
        ['org/embeddedt/modernfix/common/mixin/perf/dynamic_resources/ModelManagerMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/dynamic_resources/ctm/TextureMetadataHandlerMixin', 'R', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/dynamic_resources/ldlib/ClientProxyImplMixin', 'R', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/dynamic_resources/supermartijncore/ClientRegistrationHandlerMixin', 'R', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/dynamic_structure_manager/StructureManagerMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/fast_forge_dummies/NamespacedHolderHelperMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/fast_registry_validation/ForgeRegistryMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/faster_capabilities/CapabilityDispatcherMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/faster_ingredients/ForgeHooksMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/faster_ingredients/IngredientMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/faster_item_rendering/GameRendererMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/faster_item_rendering/ItemRendererMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/faster_loot_loading/LootDataManagerMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/faster_texture_stitching/StitcherMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/fix_handshake_stall/HandshakeHandlerMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/forge_cap_retrieval/LivingEntityMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/forge_registry_alloc/DebugLevelSourceMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/forge_registry_alloc/ForgeRegistryMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/ingredient_item_deduplication/IngredientMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/kubejs/RecipeEventJSMixin', 'R', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/lazy_search_tree_registry/SearchRegistryMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/memoize_creative_tab_build/CreativeModeTabMixin', 'A', 'm_257962_', 'getType'],
        ['org/embeddedt/modernfix/common/mixin/perf/model_optimizations/BooleanPropertyMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/model_optimizations/MultiVariantMixin', 'A', 'm_111848_', 'getVariants'],
        ['org/embeddedt/modernfix/common/mixin/perf/model_optimizations/PropertyMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/model_optimizations/SelectorMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/mojang_registry_size/MappedRegistryMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/mojang_registry_size/StateHolderMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/object_holder_cleanup/GameDataMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/optimize_surface_rules/BiomeConditionSourceMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/optimize_surface_rules/NamespacedSurfaceRuleSourceMixin', 'R', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/optimize_surface_rules/NoiseBasedChunkGeneratorMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/optimize_surface_rules/SurfaceSystemMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/patchouli_deduplicate_books/ClientBookRegistryMixin', 'R', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/potential_spawns_alloc/ForgeEventFactoryMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/potential_spawns_alloc/PotentialSpawnsMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/reduce_blockstate_cache_rebuilds/BlockCallbacksMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/reduce_blockstate_cache_rebuilds/BlockStateBaseMixin', 'A', 'm_60611_', 'initCache'],
        ['org/embeddedt/modernfix/common/mixin/perf/reduce_blockstate_cache_rebuilds/BlockStateBaseMixin', 'A', 'm_7160_', 'asState'],
        ['org/embeddedt/modernfix/common/mixin/perf/reduce_blockstate_cache_rebuilds/BlocksMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/release_protochunks/ChunkHolderMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/release_protochunks/ChunkMapMixin', 'A', 'm_202998_', 'lambda$scheduleUnload$14'],
        ['org/embeddedt/modernfix/common/mixin/perf/remove_biome_temperature_cache/BiomeMixin', 'A', 'm_47528_', 'getHeightAdjustedTemperature'],
        ['org/embeddedt/modernfix/common/mixin/perf/remove_spawn_chunks/MinecraftServerMixin', 'A', 'm_129880_', 'getLevel'],
        ['org/embeddedt/modernfix/common/mixin/perf/remove_spawn_chunks/MinecraftServerMixin', 'A', 'm_129910_', 'getWorldData'],
        ['org/embeddedt/modernfix/common/mixin/perf/remove_spawn_chunks/MinecraftServerMixin', 'A', 'm_6982_', 'isDedicatedServer'],
        ['org/embeddedt/modernfix/common/mixin/perf/remove_spawn_chunks/PlayerListMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/remove_spawn_chunks/ServerLevelMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/resourcefullib_highlight_deduplication/HighlightHandlerMixin', 'R', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/resourcepacks/FilePackResourcesMixin', 'A', 'm_10247_', 'getOrCreateZipFile'],
        ['org/embeddedt/modernfix/common/mixin/perf/resourcepacks/ForgePathPackResourcesMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/smart_ingredient_sync/ClientPacketListenerMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/smart_ingredient_sync/IngredientMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/smart_ingredient_sync/PlayerListMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/state_definition_construct/StateDefinitionMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/suspend_integrated_server_during_load/ClientPacketListenerMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/suspend_integrated_server_during_load/IntegratedServerMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/suspend_integrated_server_during_load/MinecraftMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/suspend_integrated_server_during_load/PlayerListMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/thread_priorities/IntegratedServerMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/thread_priorities/UtilMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/ticking_chunk_alloc/BatMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/ticking_chunk_alloc/ChunkHolderMixin', 'A', 'm_140026_', 'getTickingChunkFuture'],
        ['org/embeddedt/modernfix/common/mixin/perf/ticking_chunk_alloc/ChunkHolderMixin', 'A', 'm_140082_', 'getFullChunkFuture'],
        ['org/embeddedt/modernfix/common/mixin/perf/worldgen_allocation/ClimateParameterListMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/perf/worldgen_allocation/NoiseChunkMixin', 'A', 'm_209233_', 'wrapNew'],
        ['org/embeddedt/modernfix/common/mixin/safety/BlockColorsMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/safety/ItemColorsMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/safety/ItemPropertiesMixin', 'X', '', ''],
        ['org/embeddedt/modernfix/common/mixin/safety/LivingEntityRendererMixin', 'A', 'm_115326_', 'addLayer'],
        ['org/leodreamer/wildcard_pattern/mixin/MEPatternBufferPartMachineMixin', 'R', '', ''],
        ['org/leodreamer/wildcard_pattern/mixin/PatternDetailsHelperMixin', 'R', '', ''],
        ['snownee/jade/mixin/FullTextSearchTreeMixin', 'X', '', ''],
        ['snownee/jade/mixin/StringRenderOutputMixin', 'X', '', ''],
        ['software/bernie/geckolib/mixin/client/TextureManagerMixin', 'A', 'm_118495_', 'register'],
        ['stone/mae2/mixins/CraftingCPUClusterMixin', 'R', '', ''],
        ['stone/mae2/mixins/ModelBakeryMixin', 'A', 'm_119352_', 'cacheAndQueueDependencies'],
        ['stone/mae2/mixins/PatternProviderLogicCLMixin', 'R', '', ''],
        ['stone/mae2/mixins/PatternProviderLogicMixin', 'R', '', ''],
        ['studio/fantasyit/ars_botania/mixin/AENetworkStorageTypeMixin', 'R', '', ''],
        ['studio/fantasyit/ars_botania/mixin/ArsManaCap', 'R', '', ''],
        ['studio/fantasyit/ars_botania/mixin/ArsRelayCollectorTile', 'R', '', ''],
        ['studio/fantasyit/ars_botania/mixin/ArsRelayDepositTile', 'R', '', ''],
        ['studio/fantasyit/ars_botania/mixin/ArsRelayTile', 'R', '', ''],
        ['studio/fantasyit/ars_botania/mixin/ArsSourceUtilTake', 'R', '', ''],
        ['top/ialdaiaxiariyay/bettergtae/mixin/ae/TooltipsMixin', 'R', '', ''],
        ['top/theillusivec4/curios/mixin/core/MixinApplyBonusCount', 'X', '', ''],
        ['top/theillusivec4/curios/mixin/core/MixinCuriosApi', 'R', '', ''],
        ['top/theillusivec4/curios/mixin/core/MixinCuriosDataProvider', 'R', '', ''],
        ['top/theillusivec4/curios/mixin/core/MixinCuriosTriggers', 'R', '', ''],
        ['top/theillusivec4/curios/mixin/core/MixinCuriosTriggersEquip', 'R', '', ''],
        ['top/theillusivec4/curios/mixin/core/MixinInventory', 'X', '', ''],
        ['top/theillusivec4/curios/mixin/core/MixinLivingEntity', 'X', '', ''],
        ['top/theillusivec4/curios/mixin/core/MixinNbtPredicate', 'X', '', ''],
        ['top/theillusivec4/curios/mixin/core/MixinPiglinAi', 'X', '', ''],
        ['top/theillusivec4/curios/mixin/core/MixinPowderSnowBlock', 'X', '', ''],
        ['top/theillusivec4/curios/mixin/core/MixinShearsItem', 'X', '', ''],
        ['top/theillusivec4/curios/mixin/core/MixinSlotAttribute', 'R', '', ''],
        ['vazkii/botania/mixin/AbstractMinecartMixin', 'X', '', ''],
        ['vazkii/botania/mixin/BaseSpawnerMixin', 'X', '', ''],
        ['vazkii/botania/mixin/BeeMixin', 'X', '', ''],
        ['vazkii/botania/mixin/BushBlockMixin', 'X', '', ''],
        ['vazkii/botania/mixin/CollectingNeighborUpdaterMixin', 'A', 'm_230645_', 'runUpdates'],
        ['vazkii/botania/mixin/CreeperMixin', 'X', '', ''],
        ['vazkii/botania/mixin/EntityMixin', 'A', 'm_6095_', 'getType'],
        ['vazkii/botania/mixin/FarmBlockMixin', 'X', '', ''],
        ['vazkii/botania/mixin/HurtByTargetGoalMixin', 'X', '', ''],
        ['vazkii/botania/mixin/InventoryMixin', 'X', '', ''],
        ['vazkii/botania/mixin/ItemEntityMixin', 'X', '', ''],
        ['vazkii/botania/mixin/ItemMixin', 'X', '', ''],
        ['vazkii/botania/mixin/LoomMenuMixin', 'X', '', ''],
        ['vazkii/botania/mixin/LoomMenuPatternSlotMixin', 'X', '', ''],
        ['vazkii/botania/mixin/LootTableMixin', 'X', '', ''],
        ['vazkii/botania/mixin/MobMixin', 'X', '', ''],
        ['vazkii/botania/mixin/NaturalSpawnerMixin', 'X', '', ''],
        ['vazkii/botania/mixin/PistonBaseBlockMixin', 'X', '', ''],
        ['vazkii/botania/mixin/PistonStructureResolverMixin', 'X', '', ''],
        ['vazkii/botania/mixin/PlacementContextMixin', 'X', '', ''],
        ['vazkii/botania/mixin/PlayerMixin', 'A', 'm_36222_', 'awardStat'],
        ['vazkii/botania/mixin/PollinateGoalMixin', 'X', '', ''],
        ['vazkii/botania/mixin/ProtectionEnchantmentMixin', 'X', '', ''],
        ['vazkii/botania/mixin/ServerLevelMixin', 'X', '', ''],
        ['vazkii/botania/mixin/ServerPlayerMixin', 'X', '', ''],
        ['vazkii/botania/mixin/SpawnPlacementsMixin', 'X', '', ''],
        ['vazkii/botania/mixin/ThrowableProjectileMixin', 'X', '', ''],
        ['vazkii/botania/mixin/VibrationSystemListenerMixin', 'X', '', ''],
        ['vazkii/botania/mixin/client/BlockRenderDispatcherMixin', 'X', '', ''],
        ['vazkii/botania/mixin/client/ClientLevelDataMixin', 'X', '', ''],
        ['vazkii/botania/mixin/client/ItemInHandRendererMixin', 'X', '', ''],
        ['vazkii/botania/mixin/client/LevelRendererMixin', 'X', '', ''],
        ['vazkii/botania/mixin/client/RecipeBookComponentMixin', 'X', '', ''],
        ['vazkii/botania/mixin/client/SkullBlockRendererMixin', 'X', '', ''],
        ['vazkii/botania/mixin/client/SoundEngineMixin', 'X', '', ''],
        ['vazkii/botania/mixin/client/SplashManagerMixin', 'X', '', ''],
        ['vazkii/patchouli/mixin/client/MixinClientAdvancements', 'X', '', ''],
        ['vazkii/patchouli/mixin/client/MixinInventoryScreen', 'X', '', ''],
        ['vazkii/patchouli/mixin/client/MixinLevelRenderer', 'X', '', ''],
        ['vazkii/patchouli/mixin/client/MixinSystemReport', 'X', '', ''],
        ['z1gned/goetyrevelation/mixin/AbstractBeamMixin', 'R', '', ''],
        ['z1gned/goetyrevelation/mixin/AbstractSpellCloudMixin', 'R', '', ''],
        ['z1gned/goetyrevelation/mixin/ApostleMixin', 'R', '', ''],
        ['z1gned/goetyrevelation/mixin/ApostleMixin', 'A', 'm_147207_', 'addEffect'],
        ['z1gned/goetyrevelation/mixin/ApostleMixin', 'A', 'm_6593_', 'setCustomName'],
        ['z1gned/goetyrevelation/mixin/ApostleModelMixin', 'R', '', ''],
        ['z1gned/goetyrevelation/mixin/ApostleRendererMixin', 'R', '', ''],
        ['z1gned/goetyrevelation/mixin/BarricadeSpellMixin', 'R', '', ''],
        ['z1gned/goetyrevelation/mixin/BlazeSpellMixin', 'R', '', ''],
        ['z1gned/goetyrevelation/mixin/BossBarEventMixin', 'R', '', ''],
        ['z1gned/goetyrevelation/mixin/BossLoopMusicMixin', 'R', '', ''],
        ['z1gned/goetyrevelation/mixin/BowItemMixin', 'X', '', ''],
        ['z1gned/goetyrevelation/mixin/ChatFormattingMixin', 'X', '', ''],
        ['z1gned/goetyrevelation/mixin/ClientEventsMixin', 'R', '', ''],
        ['z1gned/goetyrevelation/mixin/CycloneSpellMixin', 'R', '', ''],
        ['z1gned/goetyrevelation/mixin/DarkWandMixin', 'R', '', ''],
        ['z1gned/goetyrevelation/mixin/DeathArrowMixin', 'R', '', ''],
        ['z1gned/goetyrevelation/mixin/EntityMixin', 'X', '', ''],
        ['z1gned/goetyrevelation/mixin/FireBlastTrapMixin', 'R', '', ''],
        ['z1gned/goetyrevelation/mixin/FireballSpellMixin', 'R', '', ''],
        ['z1gned/goetyrevelation/mixin/FontMixin', 'A', 'm_168645_', 'drawInBatch8xOutline'],
        ['z1gned/goetyrevelation/mixin/GhastSpellMixin', 'R', '', ''],
        ['z1gned/goetyrevelation/mixin/HailSpellMixin', 'R', '', ''],
        ['z1gned/goetyrevelation/mixin/HauntedSkullSpellMixin', 'R', '', ''],
        ['z1gned/goetyrevelation/mixin/HellCloudMixin', 'R', '', ''],
        ['z1gned/goetyrevelation/mixin/HellfireMixin', 'R', '', ''],
        ['z1gned/goetyrevelation/mixin/ItemEntityMixin', 'A', 'm_32055_', 'getItem'],
        ['z1gned/goetyrevelation/mixin/LavaballSpellMixin', 'R', '', ''],
        ['z1gned/goetyrevelation/mixin/LayerDefinitionsMixin', 'X', '', ''],
        ['z1gned/goetyrevelation/mixin/LivingEntityMixin', 'A', 'm_21223_', 'getHealth'],
        ['z1gned/goetyrevelation/mixin/LivingEntityMixin', 'A', 'm_6121_', 'getSoundVolume'],
        ['z1gned/goetyrevelation/mixin/LivingEntityMixin', 'A', 'm_7292_', 'addEffect'],
        ['z1gned/goetyrevelation/mixin/LivingEntityRendererMixin', 'X', '', ''],
        ['z1gned/goetyrevelation/mixin/PlayerMixin', 'X', '', ''],
        ['z1gned/goetyrevelation/mixin/StringRenderOutputMixin', 'A', 'm_92964_', 'addEffect'],
        ['z1gned/goetyrevelation/mixin/SummonApostleMixin', 'R', '', ''],
        ['z1gned/goetyrevelation/mixin/SummonRitualMixin', 'R', '', ''],
        ['z1gned/goetyrevelation/mixin/TargetGoalMixin', 'X', '', ''],
        ['z1gned/goetyrevelation/mixin/UpdraftSpellMixin', 'R', '', ''],
        ['z1gned/goetyrevelation/mixin/UseSpellGoalMixin', 'R', '', ''],
        ['z1gned/goetyrevelation/mixin/WitherSkullSpellMixin', 'R', '', ''],
        ['z1gned/goetyrevelation/mixin/ZPiglinServantMixin', 'R', '', ''],
        ['z1gned/goetyrevelation/mixin/ZombieSpellMixin', 'R', '', ''],
    ];
    // @Shadow aliases：srgName -> MCP 名（dev 类为 MCP 域，mixin 按别名命中真实成员）
    var aliasMap = Object.create(null);
    aliasMap['m_32055_'] = 'getItem';
    aliasMap['m_119352_'] = 'cacheAndQueueDependencies';
    aliasMap['m_51661_'] = 'placeGrownFlower';
    aliasMap['m_32055_'] = 'getItem';
    aliasMap['m_21023_'] = 'hasEffect';
    aliasMap['m_21221_'] = 'getActiveEffectsMap';
    aliasMap['m_21233_'] = 'getMaxHealth';
    aliasMap['m_213860_'] = 'getExperienceReward';
    aliasMap['m_217046_'] = 'wasExperienceConsumed';
    aliasMap['m_6124_'] = 'isAlwaysExperienceDropper';
    aliasMap['m_6336_'] = 'getMobType';
    aliasMap['m_37762_'] = 'isStopped';
    aliasMap['m_37767_'] = 'isVictory';
    aliasMap['m_37773_'] = 'getBadOmenLevel';
    aliasMap['m_37774_'] = 'stop';
    aliasMap['m_35524_'] = 'releaseAllPois';
    aliasMap['m_119352_'] = 'cacheAndQueueDependencies';
    aliasMap['m_44054_'] = 'byType';
    aliasMap['m_6095_'] = 'getType';
    aliasMap['m_8364_'] = 'getVisibleChunkIfPresent';
    aliasMap['m_109782_'] = 'renderShape';
    aliasMap['m_183262_'] = 'getPlayers';
    aliasMap['m_183754_'] = 'updateChunkTracking';
    aliasMap['m_104438_'] = 'isValidChunk';
    aliasMap['m_7216_'] = 'getDispenseMethod';
    aliasMap['m_20097_'] = 'getOnPos';
    aliasMap['m_20182_'] = 'position';
    aliasMap['m_20183_'] = 'blockPosition';
    aliasMap['m_20185_'] = 'getX';
    aliasMap['m_20186_'] = 'getY';
    aliasMap['m_20188_'] = 'getEyeY';
    aliasMap['m_20189_'] = 'getZ';
    aliasMap['m_20246_'] = 'getZ';
    aliasMap['m_213877_'] = 'isRemoved';
    aliasMap['m_6095_'] = 'getType';
    aliasMap['m_9236_'] = 'level';
    aliasMap['m_142687_'] = 'remove';
    aliasMap['m_20137_'] = 'removeTag';
    aliasMap['m_20182_'] = 'position';
    aliasMap['m_20184_'] = 'getDeltaMovement';
    aliasMap['m_9236_'] = 'level';
    aliasMap['m_119352_'] = 'cacheAndQueueDependencies';
    aliasMap['m_119364_'] = 'loadBlockModel';
    aliasMap['m_6589_'] = 'isCurse';
    aliasMap['m_32055_'] = 'getItem';
    aliasMap['m_41720_'] = 'getItem';
    aliasMap['m_20388_'] = 'scale';
    aliasMap['m_20390_'] = 'scale';
    aliasMap['m_137117_'] = 'storeData';
    aliasMap['m_173348_'] = 'getUniform';
    aliasMap['m_92724_'] = 'width';
    aliasMap['m_280444_'] = 'innerBlit';
    aliasMap['m_280479_'] = 'innerBlit';
    aliasMap['m_131205_'] = 'getOptionalFlag';
    aliasMap['m_104639_'] = 'tickNonPassenger';
    aliasMap['m_6907_'] = 'players';
    aliasMap['m_143342_'] = 'shouldDiscardEntity';
    aliasMap['m_8647_'] = 'tickNonPassenger';
    aliasMap['m_7941_'] = 'getPickupItem';
    aliasMap['m_214445_'] = 'register';
    aliasMap['m_117080_'] = 'getArmorLocation';
    aliasMap['m_117125_'] = 'setPartVisibility';
    aliasMap['m_117128_'] = 'usesInnerModel';
    aliasMap['m_32055_'] = 'getItem';
    aliasMap['m_8102_'] = 'getDestroySpeed';
    aliasMap['m_41622_'] = 'hurtAndBreak';
    aliasMap['m_41720_'] = 'getItem';
    aliasMap['m_41777_'] = 'copy';
    aliasMap['m_41779_'] = 'getUseDuration';
    aliasMap['m_41783_'] = 'getTag';
    aliasMap['m_41784_'] = 'getOrCreateTag';
    aliasMap['m_142687_'] = 'remove';
    aliasMap['m_21120_'] = 'getItemInHand';
    aliasMap['m_21153_'] = 'setHealth';
    aliasMap['m_21211_'] = 'getUseItem';
    aliasMap['m_21254_'] = 'isBlocking';
    aliasMap['m_6117_'] = 'isUsingItem';
    aliasMap['m_6728_'] = 'blockUsingShield';
    aliasMap['m_6844_'] = 'getItemBySlot';
    aliasMap['m_7655_'] = 'getUsedItemHand';
    aliasMap['m_6117_'] = 'isUsingItem';
    aliasMap['m_36403_'] = 'getAttackStrengthScale';
    aliasMap['m_7380_'] = 'addAdditionalSaveData';
    aliasMap['m_137723_'] = 'runFunction';
    aliasMap['m_136127_'] = 'getDispatcher';
    aliasMap['m_179960_'] = 'execute';
    aliasMap['m_90566_'] = 'getMaxZoom';
    aliasMap['m_90572_'] = 'setRotation';
    aliasMap['m_90584_'] = 'setPosition';
    aliasMap['m_142242_'] = 'makeBoundingBox';
    aliasMap['m_19879_'] = 'getId';
    aliasMap['m_19557_'] = 'getDuration';
    aliasMap['m_19564_'] = 'getAmplifier';
    aliasMap['m_19571_'] = 'isAmbient';
    aliasMap['m_19572_'] = 'isVisible';
    aliasMap['m_36218_'] = 'decorateDisplayNameComponent';
    aliasMap['m_240418_'] = 'sendSystemMessage';
    aliasMap['m_20272_'] = 'collide';
    aliasMap['m_9236_'] = 'level';
    aliasMap['m_109826_'] = 'needsUpdate';
    aliasMap['m_234304_'] = 'levelEvent';
    aliasMap['m_91091_'] = 'hasSingleplayerServer';
    aliasMap['m_91152_'] = 'setScreen';
    aliasMap['m_91279_'] = 'handleKeybinds';
    aliasMap['m_91398_'] = 'tick';
    aliasMap['m_104639_'] = 'tickNonPassenger';
    aliasMap['m_142646_'] = 'getEntities';
    aliasMap['m_143342_'] = 'shouldDiscardEntity';
    aliasMap['m_6815_'] = 'getEntity';
    aliasMap['m_6907_'] = 'players';
    aliasMap['m_8647_'] = 'tickNonPassenger';
    aliasMap['m_8791_'] = 'getEntity';
    aliasMap['m_8890_'] = 'getRandomPlayer';
    aliasMap['m_129785_'] = 'getAllLevels';
    aliasMap['m_7416_'] = 'getPlayerCount';
    aliasMap['m_22115_'] = 'getBaseValue';
    aliasMap['m_22116_'] = 'getModifiersOrEmpty';
    aliasMap['m_204117_'] = 'is';
    aliasMap['m_41720_'] = 'getItem';
    aliasMap['m_41782_'] = 'hasTag';
    aliasMap['m_41783_'] = 'getTag';
    aliasMap['m_142540_'] = 'onEffectAdded';
    aliasMap['m_142687_'] = 'remove';
    aliasMap['m_21204_'] = 'getAttributes';
    aliasMap['m_21223_'] = 'getHealth';
    aliasMap['m_21233_'] = 'getMaxHealth';
    aliasMap['m_6336_'] = 'getMobType';
    aliasMap['m_7285_'] = 'onEffectRemoved';
    aliasMap['m_5833_'] = 'isSpectator';
    aliasMap['m_7500_'] = 'isCreative';
    aliasMap['m_135379_'] = 'getItem';
    aliasMap['m_213945_'] = 'populateDefaultEquipmentSlots';
    aliasMap['m_8028_'] = 'shouldDespawnInPeaceful';
    aliasMap['m_8119_'] = 'tick';
    aliasMap['m_8020_'] = 'getItem';
    aliasMap['m_147207_'] = 'addEffect';
    aliasMap['m_6593_'] = 'setCustomName';
    aliasMap['m_21223_'] = 'getHealth';
    aliasMap['m_6121_'] = 'getSoundVolume';
    aliasMap['m_7292_'] = 'addEffect';
    aliasMap['m_142687_'] = 'remove';
    aliasMap['m_5833_'] = 'isSpectator';
    aliasMap['m_8119_'] = 'tick';
    aliasMap['m_92964_'] = 'addEffect';
    aliasMap['m_6652_'] = 'mustSurvive';
    aliasMap['m_6677_'] = 'playHurtSound';
    aliasMap['m_44054_'] = 'byType';
    aliasMap['m_142646_'] = 'getEntities';
    aliasMap['m_6907_'] = 'players';
    aliasMap['m_288197_'] = 'sendSuccess';
    aliasMap['m_19385_'] = 'getMsgId';
    aliasMap['m_7639_'] = 'getEntity';
    aliasMap['m_7640_'] = 'getDirectEntity';
    aliasMap['m_142038_'] = 'isCurrentlyGlowing';
    aliasMap['m_146908_'] = 'getYRot';
    aliasMap['m_146909_'] = 'getXRot';
    aliasMap['m_146915_'] = 'setGlowingTag';
    aliasMap['m_146922_'] = 'setYRot';
    aliasMap['m_146926_'] = 'setXRot';
    aliasMap['m_20095_'] = 'clearFire';
    aliasMap['m_20137_'] = 'removeTag';
    aliasMap['m_20148_'] = 'getUUID';
    aliasMap['m_20149_'] = 'getStringUUID';
    aliasMap['m_20197_'] = 'getPassengers';
    aliasMap['m_20270_'] = 'distanceTo';
    aliasMap['m_20275_'] = 'distanceToSqr';
    aliasMap['m_20280_'] = 'distanceToSqr';
    aliasMap['m_20334_'] = 'setDeltaMovement';
    aliasMap['m_5997_'] = 'push';
    aliasMap['m_6095_'] = 'getType';
    aliasMap['m_6302_'] = 'getScoreboardName';
    aliasMap['m_6350_'] = 'getDirection';
    aliasMap['m_6469_'] = 'hurt';
    aliasMap['m_7307_'] = 'isAlliedTo';
    aliasMap['m_7678_'] = 'moveTo';
    aliasMap['m_9236_'] = 'level';
    aliasMap['m_46170_'] = 'getRule';
    aliasMap['m_43908_'] = 'getItems';
    aliasMap['m_41663_'] = 'enchant';
    aliasMap['m_41751_'] = 'setTag';
    aliasMap['m_41782_'] = 'hasTag';
    aliasMap['m_41783_'] = 'getTag';
    aliasMap['m_46467_'] = 'getGameTime';
    aliasMap['m_46472_'] = 'dimension';
    aliasMap['m_108630_'] = 'getStats';
    aliasMap['m_129929_'] = 'invalidateStatus';
    aliasMap['m_6982_'] = 'isDedicatedServer';
    aliasMap['m_7038_'] = 'initServer';
    aliasMap['m_7041_'] = 'stopServer';
    aliasMap['m_6915_'] = 'closeContainer';
    aliasMap['m_6076_'] = 'getGroup';
    aliasMap['m_6671_'] = 'getType';
    aliasMap['m_142646_'] = 'getEntities';
    aliasMap['m_6907_'] = 'players';
    aliasMap['m_8951_'] = 'getStats';
    aliasMap['m_130622_'] = 'getAction';
    aliasMap['m_130623_'] = 'getValue';
    aliasMap['m_130946_'] = 'append';
    aliasMap['m_122411_'] = 'get3DDataValue';
    aliasMap['m_122416_'] = 'get2DDataValue';
    aliasMap['m_122429_'] = 'getStepX';
    aliasMap['m_122430_'] = 'getStepY';
    aliasMap['m_122431_'] = 'getStepZ';
    aliasMap['m_122435_'] = 'toYRot';
    aliasMap['m_7061_'] = 'getAsDouble';
    aliasMap['m_7063_'] = 'getAsByte';
    aliasMap['m_7916_'] = 'getAsString';
    aliasMap['m_131274_'] = 'serialize';
    aliasMap['m_43908_'] = 'getItems';
    aliasMap['m_90566_'] = 'getMaxZoom';
    aliasMap['m_90568_'] = 'move';
    aliasMap['m_109346_'] = 'renderPlayerArm';
    aliasMap['m_234261_'] = 'buildClouds';
    aliasMap['m_117818_'] = 'setModelProperties';
    aliasMap['m_7523_'] = 'setupRotations';
    aliasMap['m_93912_'] = 'getLastWordIndex';
    aliasMap['m_93930_'] = 'showSuggestions';
    aliasMap['m_91302_'] = 'isWindowActive';
    aliasMap['m_93517_'] = 'getScrollAmount';
    aliasMap['m_93518_'] = 'getMaxScroll';
    aliasMap['m_85441_'] = 'getWidth';
    aliasMap['m_85442_'] = 'getHeight';
    aliasMap['m_85450_'] = 'findBestMonitor';
    aliasMap['m_94210_'] = 'getInnerWidth';
    aliasMap['m_94216_'] = 'getMaxLength';
    aliasMap['m_9295_'] = 'isCreative';
    aliasMap['m_142503_'] = 'setCarried';
    aliasMap['m_7160_'] = 'asState';
    aliasMap['m_234165_'] = 'getPriorityFogFunction';
    aliasMap['m_286081_'] = 'flushIfUnmanaged';
    aliasMap['m_114382_'] = 'getRenderer';
    aliasMap['m_112176_'] = 'renderBeaconBeam';
    aliasMap['m_85722_'] = 'ensureCapacity';
    aliasMap['m_109817_'] = 'shouldShowEntityOutlines';
    aliasMap['m_199931_'] = 'copy';
    aliasMap['m_142109_'] = 'root';
    aliasMap['m_232564_'] = 'computeBakedGlyph';
    aliasMap['m_243121_'] = 'computeGlyphInfo';
    aliasMap['m_5483_'] = 'vertex';
    aliasMap['m_5601_'] = 'normal';
    aliasMap['m_5902_'] = 'getQuadSize';
    aliasMap['m_5950_'] = 'getV1';
    aliasMap['m_5951_'] = 'getV0';
    aliasMap['m_5952_'] = 'getU1';
    aliasMap['m_5970_'] = 'getU0';
    aliasMap['m_104689_'] = 'trySpawnDripParticles';
    aliasMap['m_263888_'] = 'lambda$doAnimateTick$8';
    aliasMap['m_20674_'] = 'getCategory';
    aliasMap['m_5472_'] = 'getDifficulty';
    aliasMap['m_85665_'] = 'ensureVertexCapacity';
    aliasMap['m_60734_'] = 'getBlock';
    aliasMap['m_7160_'] = 'asState';
    aliasMap['m_108943_'] = 'getId';
    aliasMap['m_143522_'] = 'setDetail';
    aliasMap['m_142489_'] = 'getOffsetDown';
    aliasMap['m_142491_'] = 'getOffsetUp';
    aliasMap['m_172790_'] = 'getDepthFar';
    aliasMap['m_85921_'] = 'bind';
    aliasMap['m_166779_'] = 'begin';
    aliasMap['m_5586_'] = 'putShort';
    aliasMap['m_5751_'] = 'nextElement';
    aliasMap['m_140327_'] = 'getVisibleChunkIfPresent';
    aliasMap['m_8364_'] = 'getVisibleChunkIfPresent';
    aliasMap['m_211067_'] = 'createTag';
    aliasMap['m_211067_'] = 'createTag';
    aliasMap['m_7217_'] = 'registerReloadListener';
    aliasMap['m_5685_'] = 'getBlockEntity';
    aliasMap['m_231374_'] = 'populateSearchTree';
    aliasMap['m_188051_'] = 'createOrReuseData';
    aliasMap['m_274588_'] = 'createFixerUpper';
    aliasMap['m_109393_'] = 'getModelManager';
    aliasMap['m_119306_'] = 'loadTopLevel';
    aliasMap['m_119341_'] = 'getModel';
    aliasMap['m_119362_'] = 'loadModel';
    aliasMap['m_119364_'] = 'loadBlockModel';
    aliasMap['m_257962_'] = 'getType';
    aliasMap['m_111848_'] = 'getVariants';
    aliasMap['m_60611_'] = 'initCache';
    aliasMap['m_7160_'] = 'asState';
    aliasMap['m_202998_'] = 'lambda$scheduleUnload$14';
    aliasMap['m_47528_'] = 'getHeightAdjustedTemperature';
    aliasMap['m_129880_'] = 'getLevel';
    aliasMap['m_129910_'] = 'getWorldData';
    aliasMap['m_6982_'] = 'isDedicatedServer';
    aliasMap['m_10247_'] = 'getOrCreateZipFile';
    aliasMap['m_140026_'] = 'getTickingChunkFuture';
    aliasMap['m_140082_'] = 'getFullChunkFuture';
    aliasMap['m_209233_'] = 'wrapNew';
    aliasMap['m_115326_'] = 'addLayer';
    aliasMap['m_118495_'] = 'register';
    aliasMap['m_119352_'] = 'cacheAndQueueDependencies';
    aliasMap['m_230645_'] = 'runUpdates';
    aliasMap['m_6095_'] = 'getType';
    aliasMap['m_36222_'] = 'awardStat';
    aliasMap['m_147207_'] = 'addEffect';
    aliasMap['m_6593_'] = 'setCustomName';
    aliasMap['m_168645_'] = 'drawInBatch8xOutline';
    aliasMap['m_32055_'] = 'getItem';
    aliasMap['m_21223_'] = 'getHealth';
    aliasMap['m_6121_'] = 'getSoundVolume';
    aliasMap['m_7292_'] = 'addEffect';
    aliasMap['m_92964_'] = 'addEffect';
    // 使用 duck typing 检测类型（避免 Java.type 的 classloader 问题）
    function isAnnotationNode(obj) { return obj && obj.desc && obj.values; }
    function isList(obj) { return obj && typeof obj.size === 'function' && typeof obj.get === 'function'; }
    function applyShadowAlias(ann, memberName) {
        if (!ann) { return; }
        // 防原型属性命中（如 toString/constructor）：只认自有键
        if (!Object.prototype.hasOwnProperty.call(aliasMap, memberName)) { return; }
        var alias = aliasMap[memberName];
        if (typeof alias !== 'string' || alias.length === 0) { return; }
        // @Shadow 无参数时 AnnotationNode.values 为 null，需先创建
        var values = ann.values;
        if (!values) {
            values = new java.util.ArrayList();
            ann.values = values;
        }
        for (var k = 0; k < values.size() - 1; k += 2) {
            if (String(values.get(k)) === 'aliases') { return; }
        }
        values.add('aliases');
        var lst = new java.util.ArrayList();
        lst.add(alias);
        values.add(lst);
    }
    // mod 目标（SRG 域类）的注入在 dev 环境必找不到目标（selector 反查是全局的，
    // remap=false 无效），设 require=0 让注入静默跳过而不是 Critical 崩溃
    function hasRequireZero(clsName) {
        var key = String(clsName);
        for (var i = 0; i < fixes.length; i++) {
            if (fixes[i][0] === key && fixes[i][1] === 'R') { return true; }
        }
        return false;
    }
    function setRequireZero(values) {
        for (var k = 0; k < values.size() - 1; k += 2) {
            if (String(values.get(k)) === 'require') { values.set(k + 1, 0); return; }
        }
        values.add('require');
        values.add(0);
    }
    function isInjectionAnnotation(desc) {
        return desc === 'Lorg/spongepowered/asm/mixin/injection/Inject;' ||
            desc === 'Lorg/spongepowered/asm/mixin/injection/Redirect;' ||
            desc === 'Lorg/spongepowered/asm/mixin/injection/ModifyArg;' ||
            desc === 'Lorg/spongepowered/asm/mixin/injection/ModifyArgs;' ||
            desc === 'Lorg/spongepowered/asm/mixin/injection/ModifyVariable;' ||
            desc === 'Lorg/spongepowered/asm/mixin/injection/ModifyConstant;' ||
            // mixinextras 注入注解（@WrapOperation/@WrapWithCondition/@ModifyExpressionValue
            // 等）：revelationfix ApollyonMixin 的 mod 目标注入靠 require=0 静默跳过
            desc.indexOf('Lcom/llamalad7/mixinextras/injector') === 0;
    }
    function applyFix(ann, clsName) {
        if (!ann || !ann.values) { return; }
        if (String(ann.desc) === 'Lorg/spongepowered/asm/mixin/injection/Desc;') { return; }
        var values = ann.values;
        // remap=false：注入目标名不经过 refmap 反查，method 值保持 MCP 名直接匹配
        // 注意：必须用原语 false 而不是 Boolean(false)——后者在 Nashorn 里是 NativeBoolean 对象，
        // 不是 java.lang.Boolean，mixin 读取 remap 值时类型不匹配而失效。
        var hasRemap = false;
        for (var r = 0; r < values.size() - 1; r += 2) {
            if (String(values.get(r)) === 'remap') { hasRemap = true; break; }
        }
        if (hasRemap) {
            // 已有 remap 键（可能是 true）：强制改为 false
            for (var r = 0; r < values.size() - 1; r += 2) {
                if (String(values.get(r)) === 'remap') { values.set(r + 1, false); break; }
            }
        } else {
            values.add('remap');
            values.add(false);
        }
        for (var k = 0; k < values.size() - 1; k += 2) {
            var key = values.get(k);
            var val = values.get(k + 1);
            // 递归处理嵌套注解（如 @At）
            if (isAnnotationNode(val)) {
                applyFix(val, clsName);
                continue;
            }
            if (String(key) !== 'method' && String(key) !== 'target') { continue; }
            if (isList(val)) {
                for (var x = 0; x < val.size(); x++) {
                    var el = val.get(x);
                    if (isAnnotationNode(el)) {
                        applyFix(el, clsName);
                    } else {
                        val.set(x, fixStr(el, clsName));
                    }
                }
            } else if (val !== null) {
                values.set(k + 1, fixStr(val, clsName));
            }
        }
    }
    function fixStr(s, clsName) {
        // classNode.name is a java.lang.String proxy in Nashorn; normalize it before strict comparison.
        var classKey = String(clsName);
        var dbgDeath = classKey.indexOf('z1gned/goetyrevelation/mixin/DeathArrowMixin') >= 0;
        if (dbgDeath) { print('[FIXINJ-DBG] fixStr class=' + classKey + ' value=' + String(s) + ' type=' + typeof s); }
        for (var i = 0; i < fixes.length; i++) {
            if (fixes[i][0] === classKey && String(s) === fixes[i][2]) { if (dbgDeath) { print('[FIXINJ-DBG] matched ' + fixes[i][2] + ' -> ' + fixes[i][3]); } return fixes[i][3]; }
        }
        return s;
    }
    // 与其他 mod mixin 冲突的注入整体禁用的类（strip 名单）
    function isStripClass(name) {
        var n = String(name);
        if (n === 'com/mega/revelationfix/mixin/AnvilMenuMixin') { return true; }
        return false;
    }
    function makeTransformer() {
        return function (classNode) {
            var isDbg = String(classNode.name).indexOf('revelationfix/mixin/LivingEntityMixin') >= 0 || String(classNode.name).indexOf('z1gned/goetyrevelation/mixin/DeathArrowMixin') >= 0 || String(classNode.name).indexOf('endinglib/mixin/personal_rule/PlayerMixin') >= 0;
            if (isDbg) { print('[FIXINJ-DBG] transforming ' + classNode.name); }
            var methods = classNode.methods;
            // 与其他 mod mixin 冲突的注入整体禁用（删除方法级注解，保留类级 @Mixin）——
            // 如 revelationfix AnvilMenuMixin merge createResult 导致 ae2 的
            // @At(INVOKE) 无法注入（disable_*.js 对 gradle 依赖的 mixin 类不可靠）
            if (isStripClass(classNode.name)) {
                for (var si = 0; si < methods.size(); si++) {
                    var sm = methods.get(si);
                    var stabs = [sm.visibleAnnotations, sm.invisibleAnnotations];
                    for (var st = 0; st < stabs.length; st++) {
                        var slist = stabs[st];
                        if (!slist) { continue; }
                        for (var sj = slist.size() - 1; sj >= 0; sj--) {
                            var sa = slist.get(sj);
                            if (String(sa.desc).indexOf('org/spongepowered/asm/mixin/') >= 0 ||
                                String(sa.desc).indexOf('mixinextras') >= 0) {
                                slist.remove(sj);
                            }
                        }
                    }
                }
                return classNode;
            }
            for (var i = 0; i < methods.size(); i++) {
                var m = methods.get(i);
                var tabs = [m.visibleAnnotations, m.invisibleAnnotations];
                for (var t = 0; t < tabs.length; t++) {
                    var list = tabs[t];
                    if (!list) { continue; }
                    for (var j = 0; j < list.size(); j++) {
                        var ann = list.get(j);
                        if (isDbg) { print('[FIXINJ-DBG]   method=' + m.name + ' ann=' + (ann && ann.desc ? ann.desc : 'null')); }
                        if (ann && ann.desc === 'Lorg/spongepowered/asm/mixin/Shadow;') {
                            var srgName = m.name;
                            if (srgName.indexOf('shadow$') === 0) { srgName = srgName.substring(7); }
                            if (isDbg) { print('[FIXINJ-DBG]     shadow srg=' + srgName + ' alias=' + aliasMap[srgName]); }
                            applyShadowAlias(ann, srgName);
                            // @Shadow 方法可见性提升：mixin 的 conformVisibility 检查 handler
                            // 可见性不能低于目标方法（endinglib PlayerMixin m_36218_ protected
                            // shadow -> decorateDisplayNameComponent public -> "cannot reduce
                            // visibiliy of PUBLIC target method"）。正式环境 SRG 域目标同名
                            // 同 access 不触发；dev 环境按 handler 提升到 public 后检查通过。
                            // @Shadow 只是引用声明（不注入目标类），提升无副作用。
                            if ((m.access & Opcodes.ACC_PROTECTED) !== 0) {
                                m.access = (m.access & ~Opcodes.ACC_PROTECTED) | Opcodes.ACC_PUBLIC;
                            }
                            if (isDbg && ann.values) { print('[FIXINJ-DBG]     after values=' + ann.values.toString()); }
                        }
                        // mod 目标类（SRG 域）的注入注解：require=0 静默跳过
                        if (ann && ann.desc && isInjectionAnnotation(String(ann.desc)) && hasRequireZero(classNode.name)) {
                            if (ann.values) { setRequireZero(ann.values); }
                        }
                        applyFix(ann, classNode.name);
                        if (isDbg && ann && ann.values) { print('[FIXINJ-DBG]     final values=' + ann.values.toString()); }
                    }
                }
            }
            var fields = classNode.fields;
            if (fields) {
                for (var fi = 0; fi < fields.size(); fi++) {
                    var f = fields.get(fi);
                    var ftabs = [f.visibleAnnotations, f.invisibleAnnotations];
                    for (var ft = 0; ft < ftabs.length; ft++) {
                        var flist = ftabs[ft];
                        if (!flist) { continue; }
                        for (var fj = 0; fj < flist.size(); fj++) {
                            var fann = flist.get(fj);
                            if (fann && fann.desc === 'Lorg/spongepowered/asm/mixin/Shadow;') {
                                applyShadowAlias(fann, f.name);
                            }
                        }
                    }
                }
            }
            // @Shadow 字段引用改写：mixin 字节码里 GETFIELD/PUTFIELD (target)f_XXX
            // 改写为 (target)mcpField——补的桥接字段是 null/不同步，mixin 读写会 NPE/不一致。
            // PUTFIELD 写真实 final 字段会 IllegalAccessError：auto_srg 会给 @Shadow
            // 对应 MCP 字段清 ACC_FINAL（@Mutable 语义），保证写入合法。
            var fieldRefs = fieldRefMap[classNode.name];
            if (fieldRefs) {
                for (var fi2 = 0; fi2 < methods.size(); fi2++) {
                    var fm = methods.get(fi2);
                    for (var fj2 = 0; fj2 < fm.instructions.size(); fj2++) {
                        var fin2 = fm.instructions.get(fj2);
                        var op = fin2.getOpcode();
                        if (op !== Opcodes.GETFIELD && op !== Opcodes.PUTFIELD
                            && op !== Opcodes.GETSTATIC && op !== Opcodes.PUTSTATIC) { continue; }
                        for (var fr = 0; fr < fieldRefs.length; fr++) {
                            var frr = fieldRefs[fr];
                            // owner 可能是 target 类，也可能是 mixin 类自身（@Shadow 字段声明处，
                            // mixin 应用时才 patch 成 target 类；转换发生在 patch 之前）。
                            // 改写时把 owner 也设为 target 类（mixin 类合并后不存在）
                            if ((fin2.owner === frr[0] || fin2.owner === classNode.name) && fin2.name === frr[1] && fin2.desc === frr[3]) {
                                fin2.name = frr[2];
                                fin2.owner = frr[0];
                                break;
                            }
                        }
                    }
                }
            }
            // @Shadow/抽象 handler 方法可见性提升（无条件）：mixin 的 conformVisibility
            // 检查 handler 可见性不能低于目标方法（endinglib PlayerMixin m_36218_
            // protected shadow -> decorateDisplayNameComponent public -> "cannot
            // reduce visibiliy of PUBLIC target method"）。正式环境 SRG 域目标同名
            // 同 access 不触发；dev 环境把 protected/private 的 m_ 名方法提升到 public
            // 后检查通过。@Shadow 只是引用声明（不注入目标类），提升无副作用；
            // @Unique 方法提升后注入目标类也更宽（无碍）。不依赖 @Shadow 注解
            // 存在（其他 transformer 可能已移除注解，mixin 的 PREPARE 已缓存类结构）。
            for (var vi = 0; vi < methods.size(); vi++) {
                var vm = methods.get(vi);
                if (vm.name.indexOf('m_') === 0 && (vm.access & Opcodes.ACC_PROTECTED) !== 0) {
                    vm.access = (vm.access & ~Opcodes.ACC_PROTECTED) | Opcodes.ACC_PUBLIC;
                }
            }
            return classNode;
        };
    }

    var fieldRefMap = {};
    fieldRefMap['appeng/mixins/ItemEntityMixin'] = [
        ['net/minecraft/tags/DamageTypeTags', 'f_268415_', 'IS_EXPLOSION', 'Lnet/minecraft/tags/TagKey;'],
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
        ['net/minecraft/world/phys/AABB', 'f_82289_', 'minY', 'D'],
        ['net/minecraft/world/phys/AABB', 'f_82292_', 'maxY', 'D'],
    ];
    fieldRefMap['appeng/mixins/PickColorMixin'] = [
        ['net/minecraft/client/Minecraft', 'f_91074_', 'player', 'Lnet/minecraft/client/player/LocalPlayer;'],
        ['net/minecraft/client/Minecraft', 'f_91077_', 'hitResult', 'Lnet/minecraft/world/phys/HitResult;'],
    ];
    fieldRefMap['appeng/mixins/ResizableSlotHighlightMixin'] = [
        ['net/minecraft/client/Minecraft', 'f_91080_', 'screen', 'Lnet/minecraft/client/gui/screens/Screen;'],
    ];
    fieldRefMap['appeng/mixins/TextureAtlasMixin'] = [
        ['net/minecraft/client/renderer/texture/TextureAtlas', 'f_118264_', 'texturesByName', 'Ljava/util/Map;'],
    ];
    fieldRefMap['appeng/mixins/chunkloading/ChunkMapMixin'] = [
        ['net/minecraft/server/level/ChunkMap', 'f_140133_', 'level', 'Lnet/minecraft/server/level/ServerLevel;'],
        ['net/minecraft/world/level/ChunkPos', 'f_45578_', 'x', 'I'],
        ['net/minecraft/world/level/ChunkPos', 'f_45579_', 'z', 'I'],
    ];
    fieldRefMap['appeng/mixins/spatial/MinecraftServerMixin'] = [
        ['net/minecraft/server/MinecraftServer', 'f_129738_', 'executor', 'Ljava/util/concurrent/Executor;'],
        ['net/minecraft/server/MinecraftServer', 'f_129744_', 'storageSource', 'Lnet/minecraft/world/level/storage/LevelStorageSource$LevelStorageAccess;'],
        ['net/minecraft/server/MinecraftServer', 'f_129749_', 'worldData', 'Lnet/minecraft/world/level/storage/WorldData;'],
        ['net/minecraft/server/MinecraftServer', 'f_129762_', 'levels', 'Ljava/util/Map;'],
        ['net/minecraft/server/MinecraftServer', 'f_244176_', 'registries', 'Lnet/minecraft/core/LayeredRegistryAccess;'],
        ['net/minecraft/core/registries/Registries', 'f_256787_', 'DIMENSION_TYPE', 'Lnet/minecraft/resources/ResourceKey;'],
        ['net/minecraft/core/registries/Registries', 'f_256952_', 'BIOME', 'Lnet/minecraft/resources/ResourceKey;'],
    ];
    fieldRefMap['com/Polarice3/Goety/mixin/AbstractArrowMixin'] = [
        ['net/minecraft/world/entity/MobType', 'f_21641_', 'UNDEAD', 'Lnet/minecraft/world/entity/MobType;'],
    ];
    fieldRefMap['com/Polarice3/Goety/mixin/ApplyBonusCountMixin'] = [
        ['net/minecraft/world/item/enchantment/Enchantments', 'f_44987_', 'BLOCK_FORTUNE', 'Lnet/minecraft/world/item/enchantment/Enchantment;'],
        ['net/minecraft/world/level/storage/loot/functions/ApplyBonusCount', 'f_79899_', 'enchantment', 'Lnet/minecraft/world/item/enchantment/Enchantment;'],
    ];
    fieldRefMap['com/Polarice3/Goety/mixin/ChorusFlowerBlockMixin'] = [
        ['net/minecraft/world/level/block/ChorusFlowerBlock', 'f_51647_', 'AGE', 'Lnet/minecraft/world/level/block/state/properties/IntegerProperty;'],
        ['net/minecraft/world/level/block/ChorusFlowerBlock', 'f_51648_', 'plant', 'Lnet/minecraft/world/level/block/ChorusPlantBlock;'],
        ['net/minecraft/world/level/block/ChorusPlantBlock', 'f_55152_', 'UP', 'Lnet/minecraft/world/level/block/state/properties/BooleanProperty;'],
        ['net/minecraft/world/level/block/ChorusPlantBlock', 'f_55153_', 'DOWN', 'Lnet/minecraft/world/level/block/state/properties/BooleanProperty;'],
    ];
    fieldRefMap['com/Polarice3/Goety/mixin/ChorusPlantBlockMixin'] = [
        ['net/minecraft/world/level/block/Blocks', 'f_50259_', 'END_STONE', 'Lnet/minecraft/world/level/block/Block;'],
        ['net/minecraft/world/level/block/Blocks', 'f_50490_', 'CHORUS_PLANT', 'Lnet/minecraft/world/level/block/Block;'],
        ['net/minecraft/world/level/block/state/properties/BlockStateProperties', 'f_61367_', 'DOWN', 'Lnet/minecraft/world/level/block/state/properties/BooleanProperty;'],
    ];
    fieldRefMap['com/Polarice3/Goety/mixin/EnchantmentHelperMixin'] = [
        ['net/minecraft/world/item/enchantment/Enchantments', 'f_44978_', 'SMITE', 'Lnet/minecraft/world/item/enchantment/Enchantment;'],
        ['net/minecraft/world/item/enchantment/Enchantments', 'f_44979_', 'BANE_OF_ARTHROPODS', 'Lnet/minecraft/world/item/enchantment/Enchantment;'],
    ];
    fieldRefMap['com/Polarice3/Goety/mixin/EntityMixin'] = [
        ['net/minecraft/sounds/SoundEvents', 'f_12450_', 'STONE_STEP', 'Lnet/minecraft/sounds/SoundEvent;'],
        ['net/minecraft/sounds/SoundEvents', 'f_12600_', 'ZOMBIE_ATTACK_IRON_DOOR', 'Lnet/minecraft/sounds/SoundEvent;'],
        ['net/minecraft/world/entity/Entity', 'f_19853_', 'level', 'Lnet/minecraft/world/level/Level;'],
    ];
    fieldRefMap['com/Polarice3/Goety/mixin/GuiGraphicsMixin'] = [
        ['net/minecraft/client/Minecraft', 'f_91074_', 'player', 'Lnet/minecraft/client/player/LocalPlayer;'],
    ];
    fieldRefMap['com/Polarice3/Goety/mixin/ItemEntityMixin'] = [
        ['net/minecraft/tags/DamageTypeTags', 'f_268745_', 'IS_FIRE', 'Lnet/minecraft/tags/TagKey;'],
    ];
    fieldRefMap['com/Polarice3/Goety/mixin/LevelRendererMixin'] = [
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109464_', 'renderBuffers', 'Lnet/minecraft/client/renderer/RenderBuffers;'],
    ];
    fieldRefMap['com/Polarice3/Goety/mixin/LivingEntityMixin'] = [
        ['net/minecraft/world/effect/MobEffects', 'f_19614_', 'POISON', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['com/Polarice3/Goety/mixin/LivingEntityMixin', 'f_19853_', 'level', 'Lnet/minecraft/world/level/Level;'],
        ['net/minecraft/world/entity/LivingEntity', 'f_20889_', 'lastHurtByPlayerTime', 'I'],
        ['net/minecraft/world/entity/LivingEntity', 'f_20949_', 'lastHurtByMob', 'Lnet/minecraft/world/entity/LivingEntity;'],
        ['net/minecraft/world/entity/MobType', 'f_21641_', 'UNDEAD', 'Lnet/minecraft/world/entity/MobType;'],
        ['net/minecraft/world/level/GameRules', 'f_46135_', 'RULE_DOMOBLOOT', 'Lnet/minecraft/world/level/GameRules$Key;'],
    ];
    fieldRefMap['com/Polarice3/Goety/mixin/LocalPlayerMixin'] = [
        ['net/minecraft/client/player/Input', 'f_108568_', 'up', 'Z'],
        ['net/minecraft/client/player/LocalPlayer', 'f_108611_', 'handsBusy', 'Z'],
        ['net/minecraft/client/player/LocalPlayer', 'f_108618_', 'input', 'Lnet/minecraft/client/player/Input;'],
    ];
    fieldRefMap['com/Polarice3/Goety/mixin/MinecraftMixin'] = [
        ['net/minecraft/client/player/LocalPlayer', 'f_19853_', 'level', 'Lnet/minecraft/world/level/Level;'],
        ['net/minecraft/client/Minecraft', 'f_91073_', 'level', 'Lnet/minecraft/client/multiplayer/ClientLevel;'],
        ['net/minecraft/client/Minecraft', 'f_91074_', 'player', 'Lnet/minecraft/client/player/LocalPlayer;'],
        ['net/minecraft/client/Minecraft', 'f_91077_', 'hitResult', 'Lnet/minecraft/world/phys/HitResult;'],
    ];
    fieldRefMap['com/Polarice3/Goety/mixin/MouseHandlerMixin'] = [
        ['net/minecraft/client/Minecraft', 'f_91074_', 'player', 'Lnet/minecraft/client/player/LocalPlayer;'],
        ['net/minecraft/client/MouseHandler', 'f_91503_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
    ];
    fieldRefMap['com/Polarice3/Goety/mixin/RaidMixin'] = [
        ['net/minecraft/world/entity/EntityType', 'f_20518_', 'RAVAGER', 'Lnet/minecraft/world/entity/EntityType;'],
        ['net/minecraft/world/entity/raid/Raid', 'f_37674_', 'center', 'Lnet/minecraft/core/BlockPos;'],
        ['net/minecraft/world/entity/raid/Raid', 'f_37675_', 'level', 'Lnet/minecraft/server/level/ServerLevel;'],
        ['net/minecraft/server/level/ServerLevel', 'f_46441_', 'random', 'Lnet/minecraft/util/RandomSource;'],
    ];
    fieldRefMap['com/Polarice3/Goety/mixin/SensorMixin'] = [
        ['net/minecraft/world/entity/ai/memory/MemoryModuleType', 'f_148205_', 'NEAREST_VISIBLE_LIVING_ENTITIES', 'Lnet/minecraft/world/entity/ai/memory/MemoryModuleType;'],
        ['net/minecraft/world/entity/ai/memory/MemoryModuleType', 'f_26333_', 'NEAREST_VISIBLE_NEMESIS', 'Lnet/minecraft/world/entity/ai/memory/MemoryModuleType;'],
        ['net/minecraft/world/entity/ai/memory/MemoryModuleType', 'f_26351_', 'NEAREST_VISIBLE_ZOMBIFIED', 'Lnet/minecraft/world/entity/ai/memory/MemoryModuleType;'],
    ];
    fieldRefMap['com/Polarice3/Goety/mixin/SlimePredicateMixin'] = [
        ['net/minecraft/advancements/critereon/SlimePredicate', 'f_223418_', 'size', 'Lnet/minecraft/advancements/critereon/MinMaxBounds$Ints;'],
    ];
    fieldRefMap['com/aewireless/mixin/PartPlacementMixin'] = [
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
    ];
    fieldRefMap['com/extendedae_plus/mixin/advancedae/client/gui/AdvPatternProviderScreenMixin'] = [
        ['com/extendedae_plus/mixin/advancedae/client/gui/AdvPatternProviderScreenMixin', 'f_169369_', 'renderables', 'Ljava/util/List;'],
        ['com/extendedae_plus/mixin/advancedae/client/gui/AdvPatternProviderScreenMixin', 'f_96547_', 'font', 'Lnet/minecraft/client/gui/Font;'],
        ['com/extendedae_plus/mixin/advancedae/client/gui/AdvPatternProviderScreenMixin', 'f_97732_', 'menu', 'Lnet/minecraft/world/inventory/AbstractContainerMenu;'],
    ];
    fieldRefMap['com/extendedae_plus/mixin/advancedae/client/gui/SmallAdvPatternProviderScreenMixin'] = [
        ['com/extendedae_plus/mixin/advancedae/client/gui/SmallAdvPatternProviderScreenMixin', 'f_169369_', 'renderables', 'Ljava/util/List;'],
        ['com/extendedae_plus/mixin/advancedae/client/gui/SmallAdvPatternProviderScreenMixin', 'f_96547_', 'font', 'Lnet/minecraft/client/gui/Font;'],
        ['com/extendedae_plus/mixin/advancedae/client/gui/SmallAdvPatternProviderScreenMixin', 'f_97732_', 'menu', 'Lnet/minecraft/world/inventory/AbstractContainerMenu;'],
    ];
    fieldRefMap['com/extendedae_plus/mixin/ae2/client/gui/AEBaseScreenMixin'] = [
        ['net/minecraft/world/inventory/Slot', 'f_40218_', 'container', 'Lnet/minecraft/world/Container;'],
        ['net/minecraft/client/Minecraft', 'f_91073_', 'level', 'Lnet/minecraft/client/multiplayer/ClientLevel;'],
        ['net/minecraft/client/Minecraft', 'f_91074_', 'player', 'Lnet/minecraft/client/player/LocalPlayer;'],
    ];
    fieldRefMap['com/extendedae_plus/mixin/ae2/client/gui/CraftConfirmScreenMixin'] = [
        ['net/minecraft/client/gui/components/Button', 'f_93623_', 'active', 'Z'],
    ];
    fieldRefMap['com/extendedae_plus/mixin/ae2/client/gui/CraftingStatusTableRendererMixin'] = [
        ['net/minecraft/client/Minecraft', 'f_91080_', 'screen', 'Lnet/minecraft/client/gui/screens/Screen;'],
    ];
    fieldRefMap['com/extendedae_plus/mixin/ae2/client/gui/SlotGridLayoutMixin'] = [
        ['net/minecraft/client/Minecraft', 'f_91080_', 'screen', 'Lnet/minecraft/client/gui/screens/Screen;'],
    ];
    fieldRefMap['com/extendedae_plus/mixin/ae2/client/gui/patternProvider/PatternProviderScreenMixin'] = [
        ['com/extendedae_plus/mixin/ae2/client/gui/patternProvider/PatternProviderScreenMixin', 'f_97732_', 'menu', 'Lnet/minecraft/world/inventory/AbstractContainerMenu;'],
    ];
    fieldRefMap['com/extendedae_plus/mixin/ae2/client/gui/patternProvider/PatternProviderSmartFeaturesMixin'] = [
        ['com/extendedae_plus/mixin/ae2/client/gui/patternProvider/PatternProviderSmartFeaturesMixin', 'f_169369_', 'renderables', 'Ljava/util/List;'],
        ['com/extendedae_plus/mixin/ae2/client/gui/patternProvider/PatternProviderSmartFeaturesMixin', 'f_96547_', 'font', 'Lnet/minecraft/client/gui/Font;'],
        ['com/extendedae_plus/mixin/ae2/client/gui/patternProvider/PatternProviderSmartFeaturesMixin', 'f_97732_', 'menu', 'Lnet/minecraft/world/inventory/AbstractContainerMenu;'],
    ];
    fieldRefMap['com/extendedae_plus/mixin/ae2/compat/PatternProviderLogicCompatMixin'] = [
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
    ];
    fieldRefMap['com/extendedae_plus/mixin/ae2/helpers/InterfaceLogicChannelCardMixin'] = [
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
    ];
    fieldRefMap['com/extendedae_plus/mixin/ae2/helpers/InterfaceLogicTickerMixin'] = [
        ['net/minecraft/server/level/ServerLevel', 'f_46443_', 'isClientSide', 'Z'],
    ];
    fieldRefMap['com/extendedae_plus/mixin/ae2/helpers/patternprovider/PatternProviderLogicTickerMixin'] = [
        ['net/minecraft/server/level/ServerLevel', 'f_46443_', 'isClientSide', 'Z'],
    ];
    fieldRefMap['com/extendedae_plus/mixin/ae2/items/MemoryCardItemMixin'] = [
        ['net/minecraft/core/registries/BuiltInRegistries', 'f_257033_', 'ITEM', 'Lnet/minecraft/core/DefaultedRegistry;'],
        ['net/minecraft/world/entity/player/Abilities', 'f_35937_', 'instabuild', 'Z'],
        ['net/minecraft/world/item/ItemStack', 'f_41583_', 'EMPTY', 'Lnet/minecraft/world/item/ItemStack;'],
    ];
    fieldRefMap['com/extendedae_plus/mixin/ae2/items/QuartzCuttingKnifeItemMixin'] = [
        ['net/minecraft/client/Minecraft', 'f_91068_', 'keyboardHandler', 'Lnet/minecraft/client/KeyboardHandler;'],
        ['net/minecraft/client/Minecraft', 'f_91077_', 'hitResult', 'Lnet/minecraft/world/phys/HitResult;'],
    ];
    fieldRefMap['com/extendedae_plus/mixin/ae2/menu/ContainerPatternEncodingTermMenuMixin'] = [
        ['net/minecraft/world/entity/player/Inventory', 'f_35978_', 'player', 'Lnet/minecraft/world/entity/player/Player;'],
        ['net/minecraft/world/item/ItemStack', 'f_41583_', 'EMPTY', 'Lnet/minecraft/world/item/ItemStack;'],
        ['net/minecraft/server/level/ServerPlayer', 'f_8924_', 'server', 'Lnet/minecraft/server/MinecraftServer;'],
    ];
    fieldRefMap['com/extendedae_plus/mixin/ae2/menu/PatternEncodingTermMenuMixin'] = [
        ['net/minecraft/world/entity/player/Inventory', 'f_35978_', 'player', 'Lnet/minecraft/world/entity/player/Player;'],
    ];
    fieldRefMap['com/extendedae_plus/mixin/ae2WTlib/ContainerUWirelessExPatternTerminalMixin'] = [
        ['net/minecraft/world/entity/player/Inventory', 'f_35978_', 'player', 'Lnet/minecraft/world/entity/player/Player;'],
    ];
    fieldRefMap['com/extendedae_plus/mixin/extendedae/client/HighlightButtonMixin'] = [
        ['net/minecraft/client/Minecraft', 'f_91080_', 'screen', 'Lnet/minecraft/client/gui/screens/Screen;'],
    ];
    fieldRefMap['com/extendedae_plus/mixin/extendedae/client/gui/GuiAssemblerMatrixPatternInfoMixin'] = [
        ['net/minecraft/client/Minecraft', 'f_91073_', 'level', 'Lnet/minecraft/client/multiplayer/ClientLevel;'],
    ];
    fieldRefMap['com/extendedae_plus/mixin/extendedae/client/gui/GuiExPatternProviderMixin'] = [
        ['com/extendedae_plus/mixin/extendedae/client/gui/GuiExPatternProviderMixin', 'f_169369_', 'renderables', 'Ljava/util/List;'],
        ['com/extendedae_plus/mixin/extendedae/client/gui/GuiExPatternProviderMixin', 'f_96543_', 'width', 'I'],
        ['com/extendedae_plus/mixin/extendedae/client/gui/GuiExPatternProviderMixin', 'f_96544_', 'height', 'I'],
        ['com/extendedae_plus/mixin/extendedae/client/gui/GuiExPatternProviderMixin', 'f_97726_', 'imageWidth', 'I'],
        ['com/extendedae_plus/mixin/extendedae/client/gui/GuiExPatternProviderMixin', 'f_97732_', 'menu', 'Lnet/minecraft/world/inventory/AbstractContainerMenu;'],
        ['com/extendedae_plus/mixin/extendedae/client/gui/GuiExPatternProviderMixin', 'f_97734_', 'hoveredSlot', 'Lnet/minecraft/world/inventory/Slot;'],
        ['com/extendedae_plus/mixin/extendedae/client/gui/GuiExPatternProviderMixin', 'f_97735_', 'leftPos', 'I'],
        ['com/extendedae_plus/mixin/extendedae/client/gui/GuiExPatternProviderMixin', 'f_97736_', 'topPos', 'I'],
    ];
    fieldRefMap['com/extendedae_plus/mixin/extendedae/client/gui/GuiExPatternTerminalMixin'] = [
        ['net/minecraft/client/Minecraft', 'f_91074_', 'player', 'Lnet/minecraft/client/player/LocalPlayer;'],
        ['net/minecraft/client/gui/components/Button', 'f_93624_', 'visible', 'Z'],
        ['com/extendedae_plus/mixin/extendedae/client/gui/GuiExPatternTerminalMixin', 'f_96541_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
        ['com/extendedae_plus/mixin/extendedae/client/gui/GuiExPatternTerminalMixin', 'f_97732_', 'menu', 'Lnet/minecraft/world/inventory/AbstractContainerMenu;'],
        ['com/extendedae_plus/mixin/extendedae/client/gui/GuiExPatternTerminalMixin', 'f_97735_', 'leftPos', 'I'],
        ['com/extendedae_plus/mixin/extendedae/client/gui/GuiExPatternTerminalMixin', 'f_97736_', 'topPos', 'I'],
    ];
    fieldRefMap['com/extendedae_plus/mixin/extendedae/container/ContainerExPatternTerminalMixin'] = [
        ['net/minecraft/core/registries/Registries', 'f_256858_', 'DIMENSION', 'Lnet/minecraft/resources/ResourceKey;'],
        ['net/minecraft/world/entity/player/Inventory', 'f_35978_', 'player', 'Lnet/minecraft/world/entity/player/Player;'],
        ['net/minecraft/server/level/ServerPlayer', 'f_8924_', 'server', 'Lnet/minecraft/server/MinecraftServer;'],
    ];
    fieldRefMap['com/extendedae_plus/mixin/extendedae/container/ContainerWirelessExPatternTerminalMixin'] = [
        ['net/minecraft/world/entity/player/Inventory', 'f_35978_', 'player', 'Lnet/minecraft/world/entity/player/Player;'],
    ];
    fieldRefMap['com/extendedae_plus/mixin/minecraft/PickFromWirelessMixin'] = [
        ['net/minecraft/client/Minecraft', 'f_91072_', 'gameMode', 'Lnet/minecraft/client/multiplayer/MultiPlayerGameMode;'],
        ['net/minecraft/client/Minecraft', 'f_91073_', 'level', 'Lnet/minecraft/client/multiplayer/ClientLevel;'],
        ['net/minecraft/client/Minecraft', 'f_91074_', 'player', 'Lnet/minecraft/client/player/LocalPlayer;'],
        ['net/minecraft/client/Minecraft', 'f_91077_', 'hitResult', 'Lnet/minecraft/world/phys/HitResult;'],
    ];
    fieldRefMap['com/finshope/gtsecore/mixin/MixinHelpersMixin'] = [
        ['net/minecraft/world/item/enchantment/Enchantments', 'f_44987_', 'BLOCK_FORTUNE', 'Lnet/minecraft/world/item/enchantment/Enchantment;'],
    ];
    fieldRefMap['com/glodblock/github/extendedae/mixins/MixinAbstractContainerScreen'] = [
        ['com/glodblock/github/extendedae/mixins/MixinAbstractContainerScreen', 'f_96547_', 'font', 'Lnet/minecraft/client/gui/Font;'],
    ];
    fieldRefMap['com/glodblock/github/extendedae/mixins/MixinAbstractLevelEmitterPart'] = [
        ['net/minecraft/core/particles/DustParticleOptions', 'f_123656_', 'REDSTONE', 'Lnet/minecraft/core/particles/DustParticleOptions;'],
    ];
    fieldRefMap['com/glodblock/github/extendedae/mixins/MixinAppEngInternalInventory'] = [
        ['net/minecraft/world/item/ItemStack', 'f_41583_', 'EMPTY', 'Lnet/minecraft/world/item/ItemStack;'],
    ];
    fieldRefMap['com/glodblock/github/extendedae/mixins/MixinClearPatternAccessTerminalPacket'] = [
        ['net/minecraft/client/Minecraft', 'f_91080_', 'screen', 'Lnet/minecraft/client/gui/screens/Screen;'],
    ];
    fieldRefMap['com/glodblock/github/extendedae/mixins/MixinGlobalWireNetwork'] = [
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
    ];
    fieldRefMap['com/glodblock/github/extendedae/mixins/MixinPatternAccessTerminalPacket'] = [
        ['net/minecraft/client/Minecraft', 'f_91080_', 'screen', 'Lnet/minecraft/client/gui/screens/Screen;'],
    ];
    fieldRefMap['com/glodblock/github/extendedae/mixins/MixinSlot'] = [
        ['net/minecraft/world/inventory/Slot', 'f_40220_', 'x', 'I'],
        ['net/minecraft/world/inventory/Slot', 'f_40221_', 'y', 'I'],
    ];
    fieldRefMap['com/gpumemleakfix/mixin/RenderTargetMixin'] = [
        ['com/mojang/blaze3d/pipeline/RenderTarget', 'f_83920_', 'frameBufferId', 'I'],
        ['com/mojang/blaze3d/pipeline/RenderTarget', 'f_83923_', 'colorTextureId', 'I'],
        ['com/mojang/blaze3d/pipeline/RenderTarget', 'f_83924_', 'depthBufferId', 'I'],
    ];
    fieldRefMap['com/gregtechceu/gtceu/core/mixins/BlockMixin'] = [
        ['net/minecraft/world/item/enchantment/Enchantments', 'f_44987_', 'BLOCK_FORTUNE', 'Lnet/minecraft/world/item/enchantment/Enchantment;'],
    ];
    fieldRefMap['com/gregtechceu/gtceu/core/mixins/LevelMixin'] = [
        ['net/minecraft/world/level/Level', 'f_46423_', 'thread', 'Ljava/lang/Thread;'],
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
    ];
    fieldRefMap['com/gregtechceu/gtceu/core/mixins/LootDataManagerMixin'] = [
        ['net/minecraft/world/level/storage/loot/LootDataType', 'f_278413_', 'TABLE', 'Lnet/minecraft/world/level/storage/loot/LootDataType;'],
    ];
    fieldRefMap['com/gregtechceu/gtceu/core/mixins/OreConfigurationMixin'] = [
        ['net/minecraft/world/level/block/Blocks', 'f_152467_', 'DEEPSLATE_GOLD_ORE', 'Lnet/minecraft/world/level/block/Block;'],
        ['net/minecraft/world/level/block/Blocks', 'f_152468_', 'DEEPSLATE_IRON_ORE', 'Lnet/minecraft/world/level/block/Block;'],
        ['net/minecraft/world/level/block/Blocks', 'f_152469_', 'DEEPSLATE_COAL_ORE', 'Lnet/minecraft/world/level/block/Block;'],
        ['net/minecraft/world/level/block/Blocks', 'f_152472_', 'DEEPSLATE_LAPIS_ORE', 'Lnet/minecraft/world/level/block/Block;'],
        ['net/minecraft/world/level/block/Blocks', 'f_152473_', 'DEEPSLATE_REDSTONE_ORE', 'Lnet/minecraft/world/level/block/Block;'],
        ['net/minecraft/world/level/block/Blocks', 'f_152474_', 'DEEPSLATE_DIAMOND_ORE', 'Lnet/minecraft/world/level/block/Block;'],
        ['net/minecraft/world/level/block/Blocks', 'f_152479_', 'DEEPSLATE_EMERALD_ORE', 'Lnet/minecraft/world/level/block/Block;'],
        ['net/minecraft/world/level/block/Blocks', 'f_152505_', 'COPPER_ORE', 'Lnet/minecraft/world/level/block/Block;'],
        ['net/minecraft/world/level/block/Blocks', 'f_152506_', 'DEEPSLATE_COPPER_ORE', 'Lnet/minecraft/world/level/block/Block;'],
        ['net/minecraft/world/level/levelgen/feature/configurations/OreConfiguration$TargetBlockState', 'f_161033_', 'state', 'Lnet/minecraft/world/level/block/state/BlockState;'],
        ['net/minecraft/world/level/block/Blocks', 'f_49995_', 'GOLD_ORE', 'Lnet/minecraft/world/level/block/Block;'],
        ['net/minecraft/world/level/block/Blocks', 'f_49996_', 'IRON_ORE', 'Lnet/minecraft/world/level/block/Block;'],
        ['net/minecraft/world/level/block/Blocks', 'f_49997_', 'COAL_ORE', 'Lnet/minecraft/world/level/block/Block;'],
        ['net/minecraft/world/level/block/Blocks', 'f_49998_', 'NETHER_GOLD_ORE', 'Lnet/minecraft/world/level/block/Block;'],
        ['net/minecraft/world/level/block/Blocks', 'f_50059_', 'LAPIS_ORE', 'Lnet/minecraft/world/level/block/Block;'],
        ['net/minecraft/world/level/block/Blocks', 'f_50089_', 'DIAMOND_ORE', 'Lnet/minecraft/world/level/block/Block;'],
        ['net/minecraft/world/level/block/Blocks', 'f_50173_', 'REDSTONE_ORE', 'Lnet/minecraft/world/level/block/Block;'],
        ['net/minecraft/world/level/block/Blocks', 'f_50264_', 'EMERALD_ORE', 'Lnet/minecraft/world/level/block/Block;'],
        ['net/minecraft/world/level/block/Blocks', 'f_50331_', 'NETHER_QUARTZ_ORE', 'Lnet/minecraft/world/level/block/Block;'],
    ];
    fieldRefMap['com/gregtechceu/gtceu/core/mixins/RecipeManagerMixin'] = [
        ['net/minecraft/world/item/crafting/RecipeManager', 'f_44007_', 'recipes', 'Ljava/util/Map;'],
    ];
    fieldRefMap['com/gregtechceu/gtceu/core/mixins/ServerChunkProviderMixin'] = [
        ['net/minecraft/world/level/ChunkPos', 'f_45577_', 'INVALID_CHUNK_POS', 'J'],
        ['net/minecraft/world/level/chunk/ChunkStatus', 'f_62326_', 'FULL', 'Lnet/minecraft/world/level/chunk/ChunkStatus;'],
        ['net/minecraft/server/level/ServerChunkCache', 'f_8330_', 'mainThread', 'Ljava/lang/Thread;'],
    ];
    fieldRefMap['com/gregtechceu/gtceu/core/mixins/SmithingTransformRecipeMixin'] = [
        ['net/minecraft/world/item/crafting/SmithingTransformRecipe', 'f_266098_', 'result', 'Lnet/minecraft/world/item/ItemStack;'],
    ];
    fieldRefMap['com/gregtechceu/gtceu/core/mixins/client/BiomeColorsMixin'] = [
        ['net/minecraft/client/renderer/BiomeColors', 'f_108789_', 'GRASS_COLOR_RESOLVER', 'Lnet/minecraft/world/level/ColorResolver;'],
        ['net/minecraft/client/renderer/BiomeColors', 'f_108790_', 'FOLIAGE_COLOR_RESOLVER', 'Lnet/minecraft/world/level/ColorResolver;'],
        ['net/minecraft/client/renderer/BiomeColors', 'f_108791_', 'WATER_COLOR_RESOLVER', 'Lnet/minecraft/world/level/ColorResolver;'],
    ];
    fieldRefMap['com/gregtechceu/gtceu/core/mixins/client/BlockModelMixin'] = [
        ['net/minecraft/client/renderer/block/model/BlockElementFace', 'f_111356_', 'texture', 'Ljava/lang/String;'],
    ];
    fieldRefMap['com/gregtechceu/gtceu/core/mixins/client/FaceBakeryMixin'] = [
        ['net/minecraft/client/renderer/block/model/BlockElementFace', 'f_111356_', 'texture', 'Ljava/lang/String;'],
    ];
    fieldRefMap['com/gregtechceu/gtceu/core/mixins/client/LevelRendererMixin'] = [
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109409_', 'destructionProgress', 'Lit/unimi/dsi/fastutil/longs/Long2ObjectMap;'],
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109461_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109464_', 'renderBuffers', 'Lnet/minecraft/client/renderer/RenderBuffers;'],
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109465_', 'level', 'Lnet/minecraft/client/multiplayer/ClientLevel;'],
        ['net/minecraft/client/resources/model/ModelBakery', 'f_119229_', 'DESTROY_TYPES', 'Ljava/util/List;'],
        ['net/minecraft/client/Minecraft', 'f_91074_', 'player', 'Lnet/minecraft/client/player/LocalPlayer;'],
        ['net/minecraft/client/Minecraft', 'f_91077_', 'hitResult', 'Lnet/minecraft/world/phys/HitResult;'],
    ];
    fieldRefMap['com/gregtechceu/gtceu/core/mixins/client/MultiPlayerGameModeMixin'] = [
        ['net/minecraft/client/multiplayer/MultiPlayerGameMode', 'f_105189_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
        ['net/minecraft/client/multiplayer/MultiPlayerGameMode', 'f_105191_', 'destroyBlockPos', 'Lnet/minecraft/core/BlockPos;'],
        ['net/minecraft/client/multiplayer/MultiPlayerGameMode', 'f_105192_', 'destroyingItem', 'Lnet/minecraft/world/item/ItemStack;'],
        ['net/minecraft/client/Minecraft', 'f_91073_', 'level', 'Lnet/minecraft/client/multiplayer/ClientLevel;'],
        ['net/minecraft/client/Minecraft', 'f_91074_', 'player', 'Lnet/minecraft/client/player/LocalPlayer;'],
    ];
    fieldRefMap['com/gregtechceu/gtceu/core/mixins/emi/FluidEmiStackMixin'] = [
        ['net/minecraft/world/item/TooltipFlag', 'f_256752_', 'NORMAL', 'Lnet/minecraft/world/item/TooltipFlag$Default;'],
    ];
    fieldRefMap['com/gregtechceu/gtceu/core/mixins/ftbchunks/FTBChunksClientMixin'] = [
        ['com/mojang/math/Axis', 'f_252403_', 'ZP', 'Lcom/mojang/math/Axis;'],
    ];
    fieldRefMap['com/gregtechceu/gtceu/core/mixins/ftbchunks/LargeMapScreenMixin'] = [
        ['net/minecraft/world/item/Items', 'f_151050_', 'RAW_IRON', 'Lnet/minecraft/world/item/Item;'],
        ['net/minecraft/world/item/Items', 'f_151059_', 'SPYGLASS', 'Lnet/minecraft/world/item/Item;'],
        ['net/minecraft/world/item/Items', 'f_42446_', 'BUCKET', 'Lnet/minecraft/world/item/Item;'],
    ];
    fieldRefMap['com/gregtechceu/gtceu/core/mixins/xaeroworldmap/GuiMapMixin'] = [
        ['com/gregtechceu/gtceu/core/mixins/xaeroworldmap/GuiMapMixin', 'f_96541_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
        ['com/gregtechceu/gtceu/core/mixins/xaeroworldmap/GuiMapMixin', 'f_96543_', 'width', 'I'],
        ['com/gregtechceu/gtceu/core/mixins/xaeroworldmap/GuiMapMixin', 'f_96544_', 'height', 'I'],
    ];
    fieldRefMap['com/hollingsworth/arsnouveau/common/mixin/DamageSourceMixin'] = [
        ['net/minecraft/network/chat/HoverEvent$Action', 'f_130832_', 'SHOW_ITEM', 'Lnet/minecraft/network/chat/HoverEvent$Action;'],
        ['net/minecraft/network/chat/Style', 'f_131099_', 'EMPTY', 'Lnet/minecraft/network/chat/Style;'],
        ['net/minecraft/world/damagesource/DamageSource', 'f_268569_', 'causingEntity', 'Lnet/minecraft/world/entity/Entity;'],
    ];
    fieldRefMap['com/hollingsworth/arsnouveau/common/mixin/camera/ChunkMapMixin'] = [
        ['net/minecraft/server/level/ChunkMap', 'f_140126_', 'viewDistance', 'I'],
        ['net/minecraft/world/level/ChunkPos', 'f_45578_', 'x', 'I'],
        ['net/minecraft/world/level/ChunkPos', 'f_45579_', 'z', 'I'],
    ];
    fieldRefMap['com/hollingsworth/arsnouveau/common/mixin/camera/ClientChunkCacheMixin'] = [
        ['net/minecraft/client/multiplayer/ClientChunkCache', 'f_104410_', 'storage', 'Lnet/minecraft/client/multiplayer/ClientChunkCache$Storage;'],
        ['net/minecraft/client/multiplayer/ClientChunkCache', 'f_104411_', 'level', 'Lnet/minecraft/client/multiplayer/ClientLevel;'],
        ['net/minecraft/world/level/ChunkPos', 'f_45578_', 'x', 'I'],
        ['net/minecraft/world/level/ChunkPos', 'f_45579_', 'z', 'I'],
        ['net/minecraft/client/Minecraft', 'f_91074_', 'player', 'Lnet/minecraft/client/player/LocalPlayer;'],
    ];
    fieldRefMap['com/hollingsworth/arsnouveau/common/mixin/camera/LevelRendererMixin'] = [
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109461_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
        ['net/minecraft/client/Minecraft', 'f_91074_', 'player', 'Lnet/minecraft/client/player/LocalPlayer;'],
    ];
    fieldRefMap['com/hollingsworth/arsnouveau/common/mixin/camera/PlayerListMixin'] = [
        ['net/minecraft/server/level/ServerPlayer', 'f_8906_', 'connection', 'Lnet/minecraft/server/network/ServerGamePacketListenerImpl;'],
    ];
    fieldRefMap['com/hollingsworth/arsnouveau/common/mixin/camera/TrackedEntityMixin'] = [
        ['net/minecraft/server/level/ChunkMap$TrackedEntity', 'f_140471_', 'serverEntity', 'Lnet/minecraft/server/level/ServerEntity;'],
        ['net/minecraft/server/level/ChunkMap$TrackedEntity', 'f_140472_', 'entity', 'Lnet/minecraft/world/entity/Entity;'],
        ['net/minecraft/world/phys/Vec3', 'f_82479_', 'x', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82481_', 'z', 'D'],
    ];
    fieldRefMap['com/hollingsworth/arsnouveau/common/mixin/jar/DispenserMixin'] = [
        ['net/minecraft/world/level/block/DispenserBlock', 'f_52659_', 'FACING', 'Lnet/minecraft/world/level/block/state/properties/DirectionProperty;'],
    ];
    fieldRefMap['com/hollingsworth/arsnouveau/common/mixin/light/LightEntityMixin'] = [
        ['net/minecraft/world/entity/Entity', 'f_185933_', 'chunkPosition', 'Lnet/minecraft/world/level/ChunkPos;'],
        ['net/minecraft/world/entity/Entity', 'f_19853_', 'level', 'Lnet/minecraft/world/level/Level;'],
        ['net/minecraft/world/level/ChunkPos', 'f_45578_', 'x', 'I'],
        ['net/minecraft/world/level/ChunkPos', 'f_45579_', 'z', 'I'],
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
        ['net/minecraft/client/Minecraft', 'f_91073_', 'level', 'Lnet/minecraft/client/multiplayer/ClientLevel;'],
    ];
    fieldRefMap['com/hollingsworth/arsnouveau/common/mixin/rewind/RewindEntityMixin'] = [
        ['net/minecraft/world/entity/Entity', 'f_19853_', 'level', 'Lnet/minecraft/world/level/Level;'],
    ];
    fieldRefMap['com/lowdragmc/lowdraglib/core/mixins/ClientPacketListenerMixin'] = [
        ['net/minecraft/client/multiplayer/ClientPacketListener', 'f_104888_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
    ];
    fieldRefMap['com/lowdragmc/lowdraglib/core/mixins/ModelBakeryMixin'] = [
        ['net/minecraft/client/resources/model/ModelBakery', 'f_119212_', 'unbakedCache', 'Ljava/util/Map;'],
        ['net/minecraft/client/resources/model/ModelBakery', 'f_119230_', 'MISSING_MODEL_LOCATION', 'Lnet/minecraft/client/resources/model/ModelResourceLocation;'],
        ['net/minecraft/core/registries/BuiltInRegistries', 'f_256975_', 'BLOCK', 'Lnet/minecraft/core/DefaultedRegistry;'],
        ['net/minecraft/core/registries/BuiltInRegistries', 'f_257033_', 'ITEM', 'Lnet/minecraft/core/DefaultedRegistry;'],
    ];
    fieldRefMap['com/lowdragmc/lowdraglib/core/mixins/ParticleEngineMixin'] = [
        ['net/minecraft/client/particle/ParticleEngine', 'f_107289_', 'particles', 'Ljava/util/Map;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/ItemEntityMixin'] = [
        ['net/minecraft/tags/DamageTypeTags', 'f_268738_', 'BYPASSES_INVULNERABILITY', 'Lnet/minecraft/tags/TagKey;'],
        ['net/minecraft/world/entity/item/ItemEntity', 'f_31987_', 'health', 'I'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/ItemRendererMixin'] = [
        ['net/minecraft/client/renderer/entity/ItemRenderer', 'f_265848_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/MinecraftMixin'] = [
        ['net/minecraft/client/Minecraft', 'f_90981_', 'instance', 'Lnet/minecraft/client/Minecraft;'],
        ['net/minecraft/client/Minecraft', 'f_91063_', 'gameRenderer', 'Lnet/minecraft/client/renderer/GameRenderer;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/advanced/DisplayMixin'] = [
        ['com/mega/endinglib/mixin/advanced/DisplayMixin', 'f_19804_', 'entityData', 'Lnet/minecraft/network/syncher/SynchedEntityData;'],
        ['com/mega/endinglib/mixin/advanced/DisplayMixin', 'f_19859_', 'yRotO', 'F'],
        ['com/mega/endinglib/mixin/advanced/DisplayMixin', 'f_19860_', 'xRotO', 'F'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/advanced/EntityDimensionsMixin'] = [
        ['net/minecraft/world/entity/EntityDimensions', 'f_20377_', 'width', 'F'],
        ['net/minecraft/world/entity/EntityDimensions', 'f_20378_', 'height', 'F'],
        ['net/minecraft/world/entity/EntityDimensions', 'f_20379_', 'fixed', 'Z'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/advanced/client/PostPassMixin'] = [
        ['net/minecraft/client/renderer/PostPass', 'f_110054_', 'effect', 'Lnet/minecraft/client/renderer/EffectInstance;'],
        ['net/minecraft/client/Minecraft', 'f_91063_', 'gameRenderer', 'Lnet/minecraft/client/renderer/GameRenderer;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/advanced/client/VertexBufferMixin'] = [
        ['net/minecraft/client/Minecraft', 'f_91063_', 'gameRenderer', 'Lnet/minecraft/client/renderer/GameRenderer;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/advanced/client/custom_style/StyleMixin'] = [
        ['net/minecraft/network/chat/Style', 'f_131099_', 'EMPTY', 'Lnet/minecraft/network/chat/Style;'],
        ['net/minecraft/network/chat/Style', 'f_131101_', 'color', 'Lnet/minecraft/network/chat/TextColor;'],
        ['net/minecraft/network/chat/Style', 'f_131102_', 'bold', 'Ljava/lang/Boolean;'],
        ['net/minecraft/network/chat/Style', 'f_131103_', 'italic', 'Ljava/lang/Boolean;'],
        ['net/minecraft/network/chat/Style', 'f_131104_', 'underlined', 'Ljava/lang/Boolean;'],
        ['net/minecraft/network/chat/Style', 'f_131105_', 'strikethrough', 'Ljava/lang/Boolean;'],
        ['net/minecraft/network/chat/Style', 'f_131106_', 'obfuscated', 'Ljava/lang/Boolean;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/advanced/client/embeddium/LevelRendererMixin'] = [
        ['net/minecraft/client/Minecraft', 'f_91063_', 'gameRenderer', 'Lnet/minecraft/client/renderer/GameRenderer;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/advanced/client/registry/ClientPacketListenerMixin'] = [
        ['net/minecraft/client/multiplayer/ClientPacketListener', 'f_104903_', 'registryAccess', 'Lnet/minecraft/core/LayeredRegistryAccess;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/advanced/config/ClientLevelMixin'] = [
        ['net/minecraft/client/multiplayer/ClientLevel', 'f_171630_', 'tickingEntities', 'Lnet/minecraft/world/level/entity/EntityTickList;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/advanced/config/ServerLevelMixin'] = [
        ['net/minecraft/server/level/ServerLevel', 'f_143243_', 'entityTickList', 'Lnet/minecraft/world/level/entity/EntityTickList;'],
        ['net/minecraft/server/level/ServerChunkCache', 'f_8325_', 'chunkMap', 'Lnet/minecraft/server/level/ChunkMap;'],
        ['net/minecraft/server/level/ServerLevel', 'f_8547_', 'chunkSource', 'Lnet/minecraft/server/level/ServerChunkCache;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/advanced/data_command/EntityDataAccessorMixin'] = [
        ['net/minecraft/server/commands/data/EntityDataAccessor', 'f_139507_', 'entity', 'Lnet/minecraft/world/entity/Entity;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/advanced/data_expand/InteractionEntityMixin'] = [
        ['com/mega/endinglib/mixin/advanced/data_expand/InteractionEntityMixin', 'f_19797_', 'tickCount', 'I'],
        ['net/minecraft/commands/CommandSigningContext', 'f_242494_', 'ANONYMOUS', 'Lnet/minecraft/commands/CommandSigningContext;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/advanced/data_expand/component/AbstractArrowMixin'] = [
        ['net/minecraft/world/entity/projectile/AbstractArrow', 'f_36705_', 'pickup', 'Lnet/minecraft/world/entity/projectile/AbstractArrow$Pickup;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/advanced/data_expand/component/AnimalMixin'] = [
        ['net/minecraft/world/entity/player/Abilities', 'f_35937_', 'instabuild', 'Z'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/advanced/data_expand/component/ArrowItemMixin'] = [
        ['net/minecraft/world/entity/projectile/AbstractArrow', 'f_36705_', 'pickup', 'Lnet/minecraft/world/entity/projectile/AbstractArrow$Pickup;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/advanced/data_expand/component/AxolotlMixin'] = [
        ['net/minecraft/world/entity/player/Abilities', 'f_35937_', 'instabuild', 'Z'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/advanced/data_expand/component/ForgeGuiMixin'] = [
        ['net/minecraft/world/level/block/Blocks', 'f_50143_', 'CARVED_PUMPKIN', 'Lnet/minecraft/world/level/block/Block;'],
        ['net/minecraft/client/Minecraft', 'f_91066_', 'options', 'Lnet/minecraft/client/Options;'],
        ['net/minecraft/client/Minecraft', 'f_91074_', 'player', 'Lnet/minecraft/client/player/LocalPlayer;'],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/ForgeGuiMixin', 'f_92977_', 'screenWidth', 'I'],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/ForgeGuiMixin', 'f_92978_', 'screenHeight', 'I'],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/ForgeGuiMixin', 'f_92983_', 'PUMPKIN_BLUR_LOCATION', 'Lnet/minecraft/resources/ResourceLocation;'],
        ['com/mega/endinglib/mixin/advanced/data_expand/component/ForgeGuiMixin', 'f_92986_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/advanced/data_expand/component/GiveCommandMixin'] = [
        ['net/minecraft/sounds/SoundEvents', 'f_12019_', 'ITEM_PICKUP', 'Lnet/minecraft/sounds/SoundEvent;'],
        ['net/minecraft/server/level/ServerPlayer', 'f_36096_', 'containerMenu', 'Lnet/minecraft/world/inventory/AbstractContainerMenu;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/advanced/data_expand/component/HumanoidArmorLayerMixin'] = [
        ['net/minecraft/client/renderer/texture/OverlayTexture', 'f_118083_', 'NO_OVERLAY', 'I'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/advanced/data_expand/component/ItemEntityMixin'] = [
        ['net/minecraft/tags/DamageTypeTags', 'f_268745_', 'IS_FIRE', 'Lnet/minecraft/tags/TagKey;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/advanced/data_expand/component/ItemInHandRendererMixin'] = [
        ['com/mojang/math/Axis', 'f_252403_', 'ZP', 'Lcom/mojang/math/Axis;'],
        ['com/mojang/math/Axis', 'f_252436_', 'YP', 'Lcom/mojang/math/Axis;'],
        ['com/mojang/math/Axis', 'f_252529_', 'XP', 'Lcom/mojang/math/Axis;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/advanced/data_expand/component/ItemMixin'] = [
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/advanced/data_expand/component/ItemRendererMixin'] = [
        ['net/minecraft/client/renderer/entity/ItemRenderer', 'f_115095_', 'itemModelShaper', 'Lnet/minecraft/client/renderer/ItemModelShaper;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/advanced/data_expand/component/ItemStackMixin'] = [
        ['net/minecraft/world/item/ItemStack', 'f_41590_', 'tag', 'Lnet/minecraft/nbt/CompoundTag;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/advanced/data_expand/component/LivingEntityMixin'] = [
        ['net/minecraft/advancements/CriteriaTriggers', 'f_10551_', 'USED_TOTEM', 'Lnet/minecraft/advancements/critereon/UsedTotemTrigger;'],
        ['net/minecraft/stats/Stats', 'f_12982_', 'ITEM_USED', 'Lnet/minecraft/stats/StatType;'],
        ['net/minecraft/world/entity/LivingEntity', 'f_20935_', 'useItem', 'Lnet/minecraft/world/item/ItemStack;'],
        ['net/minecraft/world/entity/LivingEntity', 'f_20936_', 'useItemRemaining', 'I'],
        ['net/minecraft/tags/DamageTypeTags', 'f_268738_', 'BYPASSES_INVULNERABILITY', 'Lnet/minecraft/tags/TagKey;'],
        ['net/minecraft/world/item/Items', 'f_42747_', 'TOTEM_OF_UNDYING', 'Lnet/minecraft/world/item/Item;'],
        ['net/minecraft/world/level/Level', 'f_46441_', 'random', 'Lnet/minecraft/util/RandomSource;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/advanced/data_expand/component/LocalPlayerMixin'] = [
        ['net/minecraft/client/player/Input', 'f_108566_', 'leftImpulse', 'F'],
        ['net/minecraft/client/player/Input', 'f_108567_', 'forwardImpulse', 'F'],
        ['net/minecraft/client/player/LocalPlayer', 'f_108618_', 'input', 'Lnet/minecraft/client/player/Input;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/advanced/data_expand/component/MultiPlayerGameModeMixin'] = [
        ['net/minecraft/client/multiplayer/MultiPlayerGameMode', 'f_105189_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
        ['net/minecraft/world/entity/player/Abilities', 'f_35937_', 'instabuild', 'Z'],
        ['net/minecraft/client/Minecraft', 'f_91074_', 'player', 'Lnet/minecraft/client/player/LocalPlayer;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/advanced/data_expand/component/ThrownTridentMixin'] = [
        ['com/mega/endinglib/mixin/advanced/data_expand/component/ThrownTridentMixin', 'f_36705_', 'pickup', 'Lnet/minecraft/world/entity/projectile/AbstractArrow$Pickup;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/advanced/data_expand/component/WanderingTraderMixin'] = [
        ['net/minecraft/sounds/SoundEvents', 'f_12585_', 'WANDERING_TRADER_DRINK_MILK', 'Lnet/minecraft/sounds/SoundEvent;'],
        ['net/minecraft/sounds/SoundEvents', 'f_12586_', 'WANDERING_TRADER_DRINK_POTION', 'Lnet/minecraft/sounds/SoundEvent;'],
        ['net/minecraft/world/item/Items', 'f_42455_', 'MILK_BUCKET', 'Lnet/minecraft/world/item/Item;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/advanced/data_expand/component/loom_menu/LoomMenuMixin'] = [
        ['net/minecraft/core/registries/BuiltInRegistries', 'f_256878_', 'BANNER_PATTERN', 'Lnet/minecraft/core/Registry;'],
        ['net/minecraft/world/item/Items', 'f_42725_', 'PIGLIN_BANNER_PATTERN', 'Lnet/minecraft/world/item/Item;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/advanced/data_expand/component/tool/DiggerItemMixin'] = [
        ['net/minecraft/tags/BlockTags', 'f_13076_', 'FIRE', 'Lnet/minecraft/tags/TagKey;'],
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/advanced/data_expand/component/tool/ShearsItemMixin'] = [
        ['net/minecraft/tags/BlockTags', 'f_13076_', 'FIRE', 'Lnet/minecraft/tags/TagKey;'],
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/advanced/data_expand/component/tool/SwordItemMixin'] = [
        ['net/minecraft/tags/BlockTags', 'f_13076_', 'FIRE', 'Lnet/minecraft/tags/TagKey;'],
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/advanced/data_expand/component/tool/TridentItemMixin'] = [
        ['net/minecraft/tags/BlockTags', 'f_13076_', 'FIRE', 'Lnet/minecraft/tags/TagKey;'],
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/advanced/data_expand/multi_jump/LocalPlayerMixin'] = [
        ['net/minecraft/client/player/Input', 'f_108572_', 'jumping', 'Z'],
        ['net/minecraft/client/player/LocalPlayer', 'f_108618_', 'input', 'Lnet/minecraft/client/player/Input;'],
        ['net/minecraft/client/player/LocalPlayer', 'f_19789_', 'fallDistance', 'F'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/advanced/function/FunctionCommandMixin'] = [
        ['net/minecraft/server/commands/FunctionCommand', 'f_137712_', 'SUGGEST_FUNCTION', 'Lcom/mojang/brigadier/suggestion/SuggestionProvider;'],
        ['net/minecraft/server/commands/data/DataCommands', 'f_139351_', 'SOURCE_PROVIDERS', 'Ljava/util/List;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/advanced/function/ServerFunctionManagerMixin'] = [
        ['net/minecraft/server/ServerFunctionManager', 'f_179958_', 'NO_RECURSIVE_TRACES', 'Lnet/minecraft/network/chat/Component;'],
        ['net/minecraft/server/ServerFunctionManager', 'f_179959_', 'context', 'Lnet/minecraft/server/ServerFunctionManager$ExecutionContext;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/camera/CameraMixin'] = [
        ['net/minecraft/world/phys/AABB', 'f_82288_', 'minX', 'D'],
        ['net/minecraft/world/phys/AABB', 'f_82289_', 'minY', 'D'],
        ['net/minecraft/world/phys/AABB', 'f_82290_', 'minZ', 'D'],
        ['net/minecraft/world/phys/AABB', 'f_82291_', 'maxX', 'D'],
        ['net/minecraft/world/phys/AABB', 'f_82292_', 'maxY', 'D'],
        ['net/minecraft/world/phys/AABB', 'f_82293_', 'maxZ', 'D'],
        ['net/minecraft/client/Camera', 'f_90551_', 'entity', 'Lnet/minecraft/world/entity/Entity;'],
        ['net/minecraft/client/Camera', 'f_90552_', 'position', 'Lnet/minecraft/world/phys/Vec3;'],
        ['net/minecraft/client/Camera', 'f_90554_', 'forwards', 'Lorg/joml/Vector3f;'],
        ['net/minecraft/client/Camera', 'f_90555_', 'up', 'Lorg/joml/Vector3f;'],
        ['net/minecraft/client/Camera', 'f_90556_', 'left', 'Lorg/joml/Vector3f;'],
        ['net/minecraft/client/Camera', 'f_90560_', 'detached', 'Z'],
        ['net/minecraft/client/Minecraft', 'f_91063_', 'gameRenderer', 'Lnet/minecraft/client/renderer/GameRenderer;'],
        ['net/minecraft/client/Minecraft', 'f_91074_', 'player', 'Lnet/minecraft/client/player/LocalPlayer;'],
        ['net/minecraft/client/Minecraft', 'f_91080_', 'screen', 'Lnet/minecraft/client/gui/screens/Screen;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/camera/GameRendererMixin'] = [
        ['net/minecraft/client/renderer/GameRenderer', 'f_109059_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
        ['net/minecraft/client/renderer/GameRenderer', 'f_109077_', 'zoom', 'F'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/camera/MouseHandlerMixin'] = [
        ['net/minecraft/client/Minecraft', 'f_91066_', 'options', 'Lnet/minecraft/client/Options;'],
        ['net/minecraft/client/MouseHandler', 'f_91503_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/camera/OptionInstanceMixin'] = [
        ['net/minecraft/client/Minecraft', 'f_91066_', 'options', 'Lnet/minecraft/client/Options;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/camera/OptionsMixin'] = [
        ['net/minecraft/client/Minecraft', 'f_91074_', 'player', 'Lnet/minecraft/client/player/LocalPlayer;'],
        ['net/minecraft/client/Options', 'f_92060_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
        ['net/minecraft/client/Options', 'f_92111_', 'cameraType', 'Lnet/minecraft/client/CameraType;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/capability/EntityMixin'] = [
        ['net/minecraft/world/entity/Entity', 'f_19815_', 'dimensions', 'Lnet/minecraft/world/entity/EntityDimensions;'],
        ['net/minecraft/world/entity/Entity', 'f_19825_', 'position', 'Lnet/minecraft/world/phys/Vec3;'],
        ['net/minecraft/world/entity/Entity', 'f_19828_', 'bb', 'Lnet/minecraft/world/phys/AABB;'],
        ['net/minecraft/world/entity/Entity', 'f_19853_', 'level', 'Lnet/minecraft/world/level/Level;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/capability/ServerEntityMixin'] = [
        ['net/minecraft/server/level/ServerEntity', 'f_8509_', 'level', 'Lnet/minecraft/server/level/ServerLevel;'],
        ['net/minecraft/server/level/ServerEntity', 'f_8510_', 'entity', 'Lnet/minecraft/world/entity/Entity;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/codec/MobEffectInstanceMixin'] = [
        ['net/minecraft/world/effect/MobEffectInstance', 'f_19509_', 'showIcon', 'Z'],
        ['net/minecraft/world/effect/MobEffectInstance', 'f_19510_', 'hiddenEffect', 'Lnet/minecraft/world/effect/MobEffectInstance;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/compat/bettercombat/MinecraftClientInject'] = [
        ['net/minecraft/core/registries/BuiltInRegistries', 'f_257033_', 'ITEM', 'Lnet/minecraft/core/DefaultedRegistry;'],
        ['net/minecraft/world/entity/player/Inventory', 'f_35977_', 'selected', 'I'],
        ['net/minecraft/client/Minecraft', 'f_91011_', 'rightClickDelay', 'I'],
        ['net/minecraft/client/Minecraft', 'f_91062_', 'font', 'Lnet/minecraft/client/gui/Font;'],
        ['net/minecraft/client/Minecraft', 'f_91065_', 'gui', 'Lnet/minecraft/client/gui/Gui;'],
        ['net/minecraft/client/Minecraft', 'f_91066_', 'options', 'Lnet/minecraft/client/Options;'],
        ['net/minecraft/client/Minecraft', 'f_91072_', 'gameMode', 'Lnet/minecraft/client/multiplayer/MultiPlayerGameMode;'],
        ['net/minecraft/client/Minecraft', 'f_91073_', 'level', 'Lnet/minecraft/client/multiplayer/ClientLevel;'],
        ['net/minecraft/client/Minecraft', 'f_91074_', 'player', 'Lnet/minecraft/client/player/LocalPlayer;'],
        ['net/minecraft/client/Minecraft', 'f_91077_', 'hitResult', 'Lnet/minecraft/world/phys/HitResult;'],
        ['net/minecraft/client/Minecraft', 'f_91078_', 'missTime', 'I'],
        ['net/minecraft/client/Options', 'f_92096_', 'keyAttack', 'Lnet/minecraft/client/KeyMapping;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/compat/ibeeditor/LevelRendererMixin'] = [
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109461_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
        ['net/minecraft/client/Minecraft', 'f_91080_', 'screen', 'Lnet/minecraft/client/gui/screens/Screen;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/compat/modernui/ModernTextRendererMixin'] = [
        ['net/minecraft/util/FormattedCharSequence', 'f_13691_', 'EMPTY', 'Lnet/minecraft/util/FormattedCharSequence;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/compat/oculus/ClientWrappedMixin'] = [
        ['net/minecraft/client/Minecraft', 'f_91074_', 'player', 'Lnet/minecraft/client/player/LocalPlayer;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/personal_rule/AbstractClientPlayerMixin'] = [
        ['net/minecraft/client/player/AbstractClientPlayer', 'f_108545_', 'clientLevel', 'Lnet/minecraft/client/multiplayer/ClientLevel;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/personal_rule/EntityRendererDispatcherMixin'] = [
        ['net/minecraft/client/Minecraft', 'f_91074_', 'player', 'Lnet/minecraft/client/player/LocalPlayer;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/personal_rule/GameRendererMixin'] = [
        ['net/minecraft/client/renderer/GameRenderer', 'f_109059_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
        ['net/minecraft/client/renderer/GameRenderer', 'f_109077_', 'zoom', 'F'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/personal_rule/ServerPlayerMixin'] = [
        ['net/minecraft/server/level/ServerPlayer', 'f_8941_', 'gameMode', 'Lnet/minecraft/server/level/ServerPlayerGameMode;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/shader/GameRendererMixin'] = [
        ['net/minecraft/client/renderer/GameRenderer', 'f_109059_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
        ['net/minecraft/client/Minecraft', 'f_91066_', 'options', 'Lnet/minecraft/client/Options;'],
        ['net/minecraft/client/Options', 'f_92062_', 'hideGui', 'Z'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/shader/LevelRendererMixin'] = [
        ['net/minecraft/world/phys/Vec3', 'f_82479_', 'x', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82480_', 'y', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82481_', 'z', 'D'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/time/EntityMixin'] = [
        ['net/minecraft/world/entity/Entity', 'f_19853_', 'level', 'Lnet/minecraft/world/level/Level;'],
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/time/GameRendererMixin'] = [
        ['net/minecraft/client/renderer/GameRenderer', 'f_109050_', 'postEffect', 'Lnet/minecraft/client/renderer/PostChain;'],
        ['net/minecraft/client/renderer/GameRenderer', 'f_109053_', 'effectActive', 'Z'],
        ['net/minecraft/client/renderer/GameRenderer', 'f_109059_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
        ['net/minecraft/client/renderer/GameRenderer', 'f_109060_', 'resourceManager', 'Lnet/minecraft/server/packs/resources/ResourceManager;'],
        ['net/minecraft/client/renderer/GameRenderer', 'f_109061_', 'random', 'Lnet/minecraft/util/RandomSource;'],
        ['net/minecraft/client/Minecraft', 'f_91074_', 'player', 'Lnet/minecraft/client/player/LocalPlayer;'],
        ['net/minecraft/client/Timer', 'f_92518_', 'partialTick', 'F'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/time/GuiMixin'] = [
        ['net/minecraft/client/Timer', 'f_92518_', 'partialTick', 'F'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/time/LevelRendererMixin'] = [
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109461_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109465_', 'level', 'Lnet/minecraft/client/multiplayer/ClientLevel;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/time/LivingEntityMixin'] = [
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/time/MinecraftMixin'] = [
        ['net/minecraft/client/Minecraft', 'f_240378_', 'chatListener', 'Lnet/minecraft/client/multiplayer/chat/ChatListener;'],
        ['net/minecraft/client/Minecraft', 'f_90991_', 'timer', 'Lnet/minecraft/client/Timer;'],
        ['net/minecraft/client/Minecraft', 'f_91005_', 'tutorial', 'Lnet/minecraft/client/tutorial/Tutorial;'],
        ['net/minecraft/client/Minecraft', 'f_91007_', 'singleplayerServer', 'Lnet/minecraft/client/server/IntegratedServer;'],
        ['net/minecraft/client/Minecraft', 'f_91011_', 'rightClickDelay', 'I'],
        ['net/minecraft/client/Minecraft', 'f_91012_', 'pause', 'Z'],
        ['net/minecraft/client/Minecraft', 'f_91013_', 'pausePartialTick', 'F'],
        ['net/minecraft/client/Minecraft', 'f_91026_', 'profiler', 'Lnet/minecraft/util/profiling/ProfilerFiller;'],
        ['net/minecraft/client/Minecraft', 'f_91043_', 'soundManager', 'Lnet/minecraft/client/sounds/SoundManager;'],
        ['net/minecraft/client/Minecraft', 'f_91063_', 'gameRenderer', 'Lnet/minecraft/client/renderer/GameRenderer;'],
        ['net/minecraft/client/Minecraft', 'f_91065_', 'gui', 'Lnet/minecraft/client/gui/Gui;'],
        ['net/minecraft/client/Minecraft', 'f_91066_', 'options', 'Lnet/minecraft/client/Options;'],
        ['net/minecraft/client/Minecraft', 'f_91068_', 'keyboardHandler', 'Lnet/minecraft/client/KeyboardHandler;'],
        ['net/minecraft/client/Minecraft', 'f_91072_', 'gameMode', 'Lnet/minecraft/client/multiplayer/MultiPlayerGameMode;'],
        ['net/minecraft/client/Minecraft', 'f_91073_', 'level', 'Lnet/minecraft/client/multiplayer/ClientLevel;'],
        ['net/minecraft/client/Minecraft', 'f_91074_', 'player', 'Lnet/minecraft/client/player/LocalPlayer;'],
        ['net/minecraft/client/Minecraft', 'f_91077_', 'hitResult', 'Lnet/minecraft/world/phys/HitResult;'],
        ['net/minecraft/client/Minecraft', 'f_91078_', 'missTime', 'I'],
        ['net/minecraft/client/Minecraft', 'f_91080_', 'screen', 'Lnet/minecraft/client/gui/screens/Screen;'],
        ['net/minecraft/client/Minecraft', 'f_91081_', 'overlay', 'Lnet/minecraft/client/gui/screens/Overlay;'],
        ['net/minecraft/client/Options', 'f_92063_', 'renderDebug', 'Z'],
        ['net/minecraft/client/Timer', 'f_92518_', 'partialTick', 'F'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/time/time/CameraMixin'] = [
        ['net/minecraft/client/Minecraft', 'f_91074_', 'player', 'Lnet/minecraft/client/player/LocalPlayer;'],
        ['net/minecraft/client/Timer', 'f_92518_', 'partialTick', 'F'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/time/time/ClientLevelMixin'] = [
        ['net/minecraft/client/multiplayer/ClientLevel', 'f_171630_', 'tickingEntities', 'Lnet/minecraft/world/level/entity/EntityTickList;'],
        ['net/minecraft/client/multiplayer/ClientLevel', 'f_171631_', 'entityStorage', 'Lnet/minecraft/world/level/entity/TransientEntitySectionManager;'],
        ['com/mega/endinglib/mixin/time/time/ClientLevelMixin', 'f_46442_', 'levelData', 'Lnet/minecraft/world/level/storage/WritableLevelData;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/time/time/CollectingNeighborUpdaterMixin'] = [
        ['net/minecraft/world/level/redstone/CollectingNeighborUpdater', 'f_230636_', 'level', 'Lnet/minecraft/world/level/Level;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/time/time/EndermanRendererMixin'] = [
        ['net/minecraft/client/renderer/entity/EndermanRenderer', 'f_114303_', 'random', 'Lnet/minecraft/util/RandomSource;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/time/time/InstantNeighborUpdaterMixin'] = [
        ['net/minecraft/world/level/redstone/InstantNeighborUpdater', 'f_230741_', 'level', 'Lnet/minecraft/world/level/Level;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/time/time/ItemInHandRendererMixin'] = [
        ['net/minecraft/client/Minecraft', 'f_91074_', 'player', 'Lnet/minecraft/client/player/LocalPlayer;'],
        ['net/minecraft/client/Timer', 'f_92518_', 'partialTick', 'F'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/time/time/LevelRendererMixin'] = [
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109463_', 'entityRenderDispatcher', 'Lnet/minecraft/client/renderer/entity/EntityRenderDispatcher;'],
        ['net/minecraft/client/Timer', 'f_92518_', 'partialTick', 'F'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/time/time/MusicManagerMixin'] = [
        ['net/minecraft/client/sounds/MusicManager', 'f_120178_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
    ];
    fieldRefMap['com/mega/endinglib/mixin/time/time/ServerLevelMixin'] = [
        ['net/minecraft/server/level/ServerLevel', 'f_143243_', 'entityTickList', 'Lnet/minecraft/world/level/entity/EntityTickList;'],
        ['net/minecraft/server/level/ServerLevel', 'f_143244_', 'entityManager', 'Lnet/minecraft/world/level/entity/PersistentEntitySectionManager;'],
        ['net/minecraft/server/level/ServerLevel', 'f_8547_', 'chunkSource', 'Lnet/minecraft/server/level/ServerChunkCache;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/AnvilMenuMixin'] = [
        ['com/mega/revelationfix/mixin/AnvilMenuMixin', 'f_39771_', 'player', 'Lnet/minecraft/world/entity/player/Player;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/AttributeInstanceMixin'] = [
        ['net/minecraft/world/entity/LivingEntity', 'f_20960_', 'SPEED_MODIFIER_SPRINTING', 'Lnet/minecraft/world/entity/ai/attributes/AttributeModifier;'],
        ['net/minecraft/world/entity/ai/attributes/AttributeInstance', 'f_22088_', 'attribute', 'Lnet/minecraft/world/entity/ai/attributes/Attribute;'],
        ['net/minecraft/world/entity/ai/attributes/Attributes', 'f_22276_', 'MAX_HEALTH', 'Lnet/minecraft/world/entity/ai/attributes/Attribute;'],
        ['net/minecraft/world/entity/ai/attributes/Attributes', 'f_22279_', 'MOVEMENT_SPEED', 'Lnet/minecraft/world/entity/ai/attributes/Attribute;'],
        ['net/minecraft/world/entity/ai/attributes/Attributes', 'f_22281_', 'ATTACK_DAMAGE', 'Lnet/minecraft/world/entity/ai/attributes/Attribute;'],
        ['net/minecraft/world/entity/ai/attributes/Attributes', 'f_22283_', 'ATTACK_SPEED', 'Lnet/minecraft/world/entity/ai/attributes/Attribute;'],
        ['net/minecraft/world/item/Item', 'f_41375_', 'BASE_ATTACK_SPEED_UUID', 'Ljava/util/UUID;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/DamageSourceMixin'] = [
        ['net/minecraft/tags/DamageTypeTags', 'f_268437_', 'BYPASSES_EFFECTS', 'Lnet/minecraft/tags/TagKey;'],
        ['net/minecraft/tags/DamageTypeTags', 'f_268490_', 'BYPASSES_ARMOR', 'Lnet/minecraft/tags/TagKey;'],
        ['net/minecraft/tags/DamageTypeTags', 'f_268630_', 'BYPASSES_RESISTANCE', 'Lnet/minecraft/tags/TagKey;'],
        ['net/minecraft/tags/DamageTypeTags', 'f_268738_', 'BYPASSES_INVULNERABILITY', 'Lnet/minecraft/tags/TagKey;'],
        ['net/minecraft/tags/DamageTypeTags', 'f_273918_', 'BYPASSES_COOLDOWN', 'Lnet/minecraft/tags/TagKey;'],
        ['net/minecraft/tags/DamageTypeTags', 'f_276146_', 'BYPASSES_SHIELD', 'Lnet/minecraft/tags/TagKey;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/EntityMixin'] = [
        ['net/minecraft/world/entity/LivingEntity', 'f_19789_', 'fallDistance', 'F'],
        ['net/minecraft/world/phys/Vec3', 'f_82479_', 'x', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82480_', 'y', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82481_', 'z', 'D'],
        ['net/minecraft/world/phys/shapes/BooleanOp', 'f_82689_', 'AND', 'Lnet/minecraft/world/phys/shapes/BooleanOp;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/FeatureFixMixin'] = [
        ['net/minecraft/world/level/Level', 'f_46429_', 'NETHER', 'Lnet/minecraft/resources/ResourceKey;'],
        ['net/minecraft/world/level/levelgen/feature/Feature', 'f_65747_', 'BASALT_COLUMNS', 'Lnet/minecraft/world/level/levelgen/feature/Feature;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/ForgeHooksMixin'] = [
        ['net/minecraft/world/entity/LivingEntity', 'f_19862_', 'horizontalCollision', 'Z'],
        ['net/minecraft/world/phys/AABB', 'f_82288_', 'minX', 'D'],
        ['net/minecraft/world/phys/AABB', 'f_82289_', 'minY', 'D'],
        ['net/minecraft/world/phys/AABB', 'f_82290_', 'minZ', 'D'],
        ['net/minecraft/world/phys/AABB', 'f_82291_', 'maxX', 'D'],
        ['net/minecraft/world/phys/AABB', 'f_82292_', 'maxY', 'D'],
        ['net/minecraft/world/phys/AABB', 'f_82293_', 'maxZ', 'D'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/HurtByTargetGoalMixin'] = [
        ['net/minecraft/world/entity/ai/goal/target/HurtByTargetGoal', 'f_26033_', 'alertSameType', 'Z'],
        ['net/minecraft/world/entity/ai/goal/target/HurtByTargetGoal', 'f_26034_', 'timestamp', 'I'],
        ['net/minecraft/world/entity/ai/goal/target/HurtByTargetGoal', 'f_26035_', 'toIgnoreDamage', '[Ljava/lang/Class;'],
        ['net/minecraft/world/entity/ai/goal/target/HurtByTargetGoal', 'f_26036_', 'toIgnoreAlert', '[Ljava/lang/Class;'],
        ['com/mega/revelationfix/mixin/HurtByTargetGoalMixin', 'f_26135_', 'mob', 'Lnet/minecraft/world/entity/Mob;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/IngredientMixin'] = [
        ['net/minecraft/world/item/crafting/Ingredient', 'f_43902_', 'values', '[Lnet/minecraft/world/item/crafting/Ingredient$Value;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/ItemInHandLayerMixin'] = [
        ['net/minecraft/client/renderer/entity/layers/ItemInHandLayer', 'f_234844_', 'itemInHandRenderer', 'Lnet/minecraft/client/renderer/ItemInHandRenderer;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/ItemRendererMixin'] = [
        ['net/minecraft/client/renderer/entity/ItemRenderer', 'f_265848_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/ItemStackMixin'] = [
        ['net/minecraft/world/item/enchantment/Enchantments', 'f_44963_', 'VANISHING_CURSE', 'Lnet/minecraft/world/item/enchantment/Enchantment;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/LevelRendererMixin'] = [
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109461_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/LivingEntityMixin'] = [
        ['net/minecraft/world/entity/LivingEntity', 'f_20945_', 'activeEffects', 'Ljava/util/Map;'],
        ['net/minecraft/world/entity/LivingEntity', 'f_20948_', 'effectsDirty', 'Z'],
        ['net/minecraft/world/entity/MobType', 'f_21641_', 'UNDEAD', 'Lnet/minecraft/world/entity/MobType;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/LocalPlayerMixin'] = [
        ['net/minecraft/client/player/Input', 'f_108566_', 'leftImpulse', 'F'],
        ['net/minecraft/client/player/Input', 'f_108567_', 'forwardImpulse', 'F'],
        ['net/minecraft/client/player/LocalPlayer', 'f_108618_', 'input', 'Lnet/minecraft/client/player/Input;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/MobMixin'] = [
        ['net/minecraft/world/entity/Mob', 'f_21345_', 'goalSelector', 'Lnet/minecraft/world/entity/ai/goal/GoalSelector;'],
        ['net/minecraft/world/entity/Mob', 'f_21346_', 'targetSelector', 'Lnet/minecraft/world/entity/ai/goal/GoalSelector;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/NearestAttackableTargetGoalMixin'] = [
        ['net/minecraft/world/entity/ai/goal/target/NearestAttackableTargetGoal', 'f_26048_', 'targetType', 'Ljava/lang/Class;'],
        ['net/minecraft/world/entity/ai/goal/target/NearestAttackableTargetGoal', 'f_26050_', 'target', 'Lnet/minecraft/world/entity/LivingEntity;'],
        ['com/mega/revelationfix/mixin/NearestAttackableTargetGoalMixin', 'f_26135_', 'mob', 'Lnet/minecraft/world/entity/Mob;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/PlayerMixin'] = [
        ['com/mega/revelationfix/mixin/PlayerMixin', 'f_19802_', 'invulnerableTime', 'I'],
        ['net/minecraft/tags/DamageTypeTags', 'f_268738_', 'BYPASSES_INVULNERABILITY', 'Lnet/minecraft/tags/TagKey;'],
        ['net/minecraft/world/level/GameRules', 'f_46133_', 'RULE_KEEPINVENTORY', 'Lnet/minecraft/world/level/GameRules$Key;'],
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/PlayerModelMixin'] = [
        ['com/mega/revelationfix/mixin/PlayerModelMixin', 'f_102608_', 'attackTime', 'F'],
        ['com/mega/revelationfix/mixin/PlayerModelMixin', 'f_102609_', 'riding', 'Z'],
        ['com/mega/revelationfix/mixin/PlayerModelMixin', 'f_102808_', 'head', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['com/mega/revelationfix/mixin/PlayerModelMixin', 'f_102809_', 'hat', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['com/mega/revelationfix/mixin/PlayerModelMixin', 'f_102810_', 'body', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['com/mega/revelationfix/mixin/PlayerModelMixin', 'f_102811_', 'rightArm', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['com/mega/revelationfix/mixin/PlayerModelMixin', 'f_102812_', 'leftArm', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['com/mega/revelationfix/mixin/PlayerModelMixin', 'f_102813_', 'rightLeg', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['com/mega/revelationfix/mixin/PlayerModelMixin', 'f_102814_', 'leftLeg', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['com/mega/revelationfix/mixin/PlayerModelMixin', 'f_102815_', 'leftArmPose', 'Lnet/minecraft/client/model/HumanoidModel$ArmPose;'],
        ['com/mega/revelationfix/mixin/PlayerModelMixin', 'f_102816_', 'rightArmPose', 'Lnet/minecraft/client/model/HumanoidModel$ArmPose;'],
        ['com/mega/revelationfix/mixin/PlayerModelMixin', 'f_102817_', 'crouching', 'Z'],
        ['com/mega/revelationfix/mixin/PlayerModelMixin', 'f_102818_', 'swimAmount', 'F'],
        ['net/minecraft/client/model/PlayerModel', 'f_103373_', 'cloak', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['net/minecraft/client/model/PlayerModel', 'f_103374_', 'leftSleeve', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['net/minecraft/client/model/PlayerModel', 'f_103375_', 'rightSleeve', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['net/minecraft/client/model/PlayerModel', 'f_103376_', 'leftPants', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['net/minecraft/client/model/PlayerModel', 'f_103377_', 'rightPants', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['net/minecraft/client/model/PlayerModel', 'f_103378_', 'jacket', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_104200_', 'x', 'F'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_104201_', 'y', 'F'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_104202_', 'z', 'F'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_104203_', 'xRot', 'F'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_104204_', 'yRot', 'F'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_104205_', 'zRot', 'F'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/SynchedEntityDataMixin'] = [
        ['net/minecraft/network/syncher/SynchedEntityData', 'f_135344_', 'entity', 'Lnet/minecraft/world/entity/Entity;'],
        ['net/minecraft/world/entity/LivingEntity', 'f_20961_', 'DATA_HEALTH_ID', 'Lnet/minecraft/network/syncher/EntityDataAccessor;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/TagValueMixin'] = [
        ['net/minecraft/world/item/ItemStack', 'f_41583_', 'EMPTY', 'Lnet/minecraft/world/item/ItemStack;'],
        ['net/minecraft/world/item/crafting/Ingredient$TagValue', 'f_43959_', 'tag', 'Lnet/minecraft/tags/TagKey;'],
        ['net/minecraft/world/item/enchantment/Enchantments', 'f_44963_', 'VANISHING_CURSE', 'Lnet/minecraft/world/item/enchantment/Enchantment;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/WitherBossMixin'] = [
        ['com/mega/revelationfix/mixin/WitherBossMixin', 'f_19796_', 'random', 'Lnet/minecraft/util/RandomSource;'],
        ['net/minecraft/world/entity/boss/wither/WitherBoss', 'f_31431_', 'LIVING_ENTITY_SELECTOR', 'Ljava/util/function/Predicate;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/advanced/invul/goety/ApostleMixin'] = [
        ['com/mega/revelationfix/mixin/advanced/invul/goety/ApostleMixin', 'f_20916_', 'hurtTime', 'I'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/fantasy_ending/UomSpawnEggMixin'] = [
        ['net/minecraft/world/item/Items', 'f_42104_', 'DRAGON_EGG', 'Lnet/minecraft/world/item/Item;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/goety/AbstractObsidianMonolithMixin'] = [
        ['net/minecraft/world/effect/MobEffects', 'f_19606_', 'DAMAGE_RESISTANCE', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['com/mega/revelationfix/mixin/goety/AbstractObsidianMonolithMixin', 'f_19796_', 'random', 'Lnet/minecraft/util/RandomSource;'],
        ['net/minecraft/world/entity/player/Player', 'f_19797_', 'tickCount', 'I'],
        ['net/minecraft/world/item/Items', 'f_42425_', 'STONE_SWORD', 'Lnet/minecraft/world/item/Item;'],
        ['net/minecraft/world/level/Level', 'f_46441_', 'random', 'Lnet/minecraft/util/RandomSource;'],
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/goety/ApollyonMixin'] = [
        ['net/minecraft/advancements/CriteriaTriggers', 'f_10568_', 'PLAYER_KILLED_ENTITY', 'Lnet/minecraft/advancements/critereon/KilledTrigger;'],
        ['net/minecraft/sounds/SoundEvents', 'f_11913_', 'GENERIC_EXPLODE', 'Lnet/minecraft/sounds/SoundEvent;'],
        ['net/minecraft/core/particles/ParticleTypes', 'f_123744_', 'FLAME', 'Lnet/minecraft/core/particles/SimpleParticleType;'],
        ['net/minecraft/core/particles/ParticleTypes', 'f_123755_', 'LARGE_SMOKE', 'Lnet/minecraft/core/particles/SimpleParticleType;'],
        ['net/minecraft/core/particles/ParticleTypes', 'f_123812_', 'EXPLOSION_EMITTER', 'Lnet/minecraft/core/particles/SimpleParticleType;'],
        ['net/minecraft/network/syncher/EntityDataSerializers', 'f_135027_', 'BYTE', 'Lnet/minecraft/network/syncher/EntityDataSerializer;'],
        ['net/minecraft/network/syncher/EntityDataSerializers', 'f_135028_', 'INT', 'Lnet/minecraft/network/syncher/EntityDataSerializer;'],
        ['net/minecraft/network/syncher/EntityDataSerializers', 'f_135029_', 'FLOAT', 'Lnet/minecraft/network/syncher/EntityDataSerializer;'],
        ['net/minecraft/network/syncher/EntityDataSerializers', 'f_135035_', 'BOOLEAN', 'Lnet/minecraft/network/syncher/EntityDataSerializer;'],
        ['com/mega/revelationfix/mixin/goety/ApollyonMixin', 'f_19796_', 'random', 'Lnet/minecraft/util/RandomSource;'],
        ['com/mega/revelationfix/mixin/goety/ApollyonMixin', 'f_19797_', 'tickCount', 'I'],
        ['com/mega/revelationfix/mixin/goety/ApollyonMixin', 'f_19804_', 'entityData', 'Lnet/minecraft/network/syncher/SynchedEntityData;'],
        ['net/minecraft/world/entity/EntitySelector', 'f_20406_', 'NO_CREATIVE_OR_SPECTATOR', 'Ljava/util/function/Predicate;'],
        ['com/mega/revelationfix/mixin/goety/ApollyonMixin', 'f_20888_', 'lastHurtByPlayer', 'Lnet/minecraft/world/entity/player/Player;'],
        ['com/mega/revelationfix/mixin/goety/ApollyonMixin', 'f_20889_', 'lastHurtByPlayerTime', 'I'],
        ['com/mega/revelationfix/mixin/goety/ApollyonMixin', 'f_20916_', 'hurtTime', 'I'],
        ['com/mega/revelationfix/mixin/goety/ApollyonMixin', 'f_20917_', 'hurtDuration', 'I'],
        ['net/minecraft/world/entity/player/Abilities', 'f_35935_', 'flying', 'Z'],
        ['net/minecraft/world/item/ItemStack', 'f_41583_', 'EMPTY', 'Lnet/minecraft/world/item/ItemStack;'],
        ['net/minecraft/world/item/Items', 'f_42411_', 'BOW', 'Lnet/minecraft/world/item/Item;'],
        ['net/minecraft/world/item/Items', 'f_42418_', 'NETHERITE_INGOT', 'Lnet/minecraft/world/item/Item;'],
        ['net/minecraft/world/item/Items', 'f_42437_', 'ENCHANTED_GOLDEN_APPLE', 'Lnet/minecraft/world/item/Item;'],
        ['net/minecraft/world/item/Items', 'f_42585_', 'BLAZE_ROD', 'Lnet/minecraft/world/item/Item;'],
        ['net/minecraft/world/item/Items', 'f_42791_', 'NETHERITE_BLOCK', 'Lnet/minecraft/world/item/Item;'],
        ['net/minecraft/world/item/enchantment/Enchantments', 'f_44988_', 'POWER_ARROWS', 'Lnet/minecraft/world/item/enchantment/Enchantment;'],
        ['net/minecraft/world/level/Level', 'f_46441_', 'random', 'Lnet/minecraft/util/RandomSource;'],
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
        ['net/minecraft/world/level/block/Blocks', 'f_50016_', 'AIR', 'Lnet/minecraft/world/level/block/Block;'],
        ['net/minecraft/world/level/block/Blocks', 'f_50087_', 'CHEST', 'Lnet/minecraft/world/level/block/Block;'],
        ['net/minecraft/world/phys/Vec3', 'f_82478_', 'ZERO', 'Lnet/minecraft/world/phys/Vec3;'],
        ['net/minecraft/world/phys/Vec3', 'f_82480_', 'y', 'D'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/goety/DarkAltarBlockEntityMixin'] = [
        ['net/minecraft/world/level/Level', 'f_46429_', 'NETHER', 'Lnet/minecraft/resources/ResourceKey;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/goety/DeathArrowMixin'] = [
        ['com/mega/revelationfix/mixin/goety/DeathArrowMixin', 'f_36703_', 'inGround', 'Z'],
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/goety/FocusCooldownMixin'] = [
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/goety/HellBlastMixin'] = [
        ['net/minecraft/sounds/SoundEvents', 'f_11913_', 'GENERIC_EXPLODE', 'Lnet/minecraft/sounds/SoundEvent;'],
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
        ['net/minecraft/world/phys/Vec3', 'f_82479_', 'x', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82480_', 'y', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82481_', 'z', 'D'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/goety/HellBoltMixin'] = [
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
        ['net/minecraft/world/phys/Vec3', 'f_82479_', 'x', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82481_', 'z', 'D'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/goety/OwnedMixin'] = [
        ['net/minecraft/world/effect/MobEffects', 'f_19596_', 'MOVEMENT_SPEED', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['net/minecraft/world/effect/MobEffects', 'f_19600_', 'DAMAGE_BOOST', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['net/minecraft/world/effect/MobEffects', 'f_19606_', 'DAMAGE_RESISTANCE', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['net/minecraft/world/effect/MobEffects', 'f_19619_', 'GLOWING', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/goety/brew/BrewCauldronBlockEntityMixin'] = [
        ['net/minecraft/core/particles/ParticleTypes', 'f_123771_', 'WITCH', 'Lnet/minecraft/core/particles/SimpleParticleType;'],
        ['net/minecraft/server/level/ServerLevel', 'f_46441_', 'random', 'Lnet/minecraft/util/RandomSource;'],
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
        ['com/mega/revelationfix/mixin/goety/brew/BrewCauldronBlockEntityMixin', 'f_58857_', 'level', 'Lnet/minecraft/world/level/Level;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/goety/expand/dark_anvil/DarkAnvilMixin'] = [
        ['com/mega/revelationfix/mixin/goety/expand/dark_anvil/DarkAnvilMixin', 'f_39771_', 'player', 'Lnet/minecraft/world/entity/player/Player;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/goety/overwrite/FireBlastTrapMixin'] = [
        ['net/minecraft/sounds/SoundEvents', 'f_11913_', 'GENERIC_EXPLODE', 'Lnet/minecraft/sounds/SoundEvent;'],
        ['net/minecraft/core/particles/ParticleTypes', 'f_123744_', 'FLAME', 'Lnet/minecraft/core/particles/SimpleParticleType;'],
        ['net/minecraft/network/syncher/EntityDataSerializers', 'f_135029_', 'FLOAT', 'Lnet/minecraft/network/syncher/EntityDataSerializer;'],
        ['com/mega/revelationfix/mixin/goety/overwrite/FireBlastTrapMixin', 'f_19796_', 'random', 'Lnet/minecraft/util/RandomSource;'],
        ['com/mega/revelationfix/mixin/goety/overwrite/FireBlastTrapMixin', 'f_19797_', 'tickCount', 'I'],
        ['com/mega/revelationfix/mixin/goety/overwrite/FireBlastTrapMixin', 'f_19804_', 'entityData', 'Lnet/minecraft/network/syncher/SynchedEntityData;'],
        ['net/minecraft/world/entity/ai/attributes/Attributes', 'f_22281_', 'ATTACK_DAMAGE', 'Lnet/minecraft/world/entity/ai/attributes/Attribute;'],
        ['net/minecraft/world/level/Level', 'f_46441_', 'random', 'Lnet/minecraft/util/RandomSource;'],
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
        ['net/minecraft/world/phys/AABB', 'f_82288_', 'minX', 'D'],
        ['net/minecraft/world/phys/AABB', 'f_82289_', 'minY', 'D'],
        ['net/minecraft/world/phys/AABB', 'f_82290_', 'minZ', 'D'],
        ['net/minecraft/world/phys/AABB', 'f_82291_', 'maxX', 'D'],
        ['net/minecraft/world/phys/AABB', 'f_82292_', 'maxY', 'D'],
        ['net/minecraft/world/phys/AABB', 'f_82293_', 'maxZ', 'D'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/goety/ritual/CraftRitualMixin'] = [
        ['net/minecraft/world/item/ItemStack', 'f_41583_', 'EMPTY', 'Lnet/minecraft/world/item/ItemStack;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/goety/ritual/DarkAltarBlockEntityMixin'] = [
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
        ['com/mega/revelationfix/mixin/goety/ritual/DarkAltarBlockEntityMixin', 'f_58857_', 'level', 'Lnet/minecraft/world/level/Level;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/goety/ritual/RitualMixin'] = [
        ['net/minecraft/sounds/SoundEvents', 'f_11778_', 'BUCKET_EMPTY', 'Lnet/minecraft/sounds/SoundEvent;'],
        ['net/minecraft/sounds/SoundEvents', 'f_12019_', 'ITEM_PICKUP', 'Lnet/minecraft/sounds/SoundEvent;'],
        ['net/minecraft/world/item/ItemStack', 'f_41583_', 'EMPTY', 'Lnet/minecraft/world/item/ItemStack;'],
        ['net/minecraft/world/item/Items', 'f_42446_', 'BUCKET', 'Lnet/minecraft/world/item/Item;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/gr/ApollyonDeathArrowGoalMixin'] = [
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/gr/ApostleGlowLayerMixin'] = [
        ['net/minecraft/client/renderer/texture/OverlayTexture', 'f_118083_', 'NO_OVERLAY', 'I'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/gr/ApostleMixin'] = [
        ['net/minecraft/network/syncher/EntityDataSerializers', 'f_135028_', 'INT', 'Lnet/minecraft/network/syncher/EntityDataSerializer;'],
        ['net/minecraft/network/syncher/EntityDataSerializers', 'f_135035_', 'BOOLEAN', 'Lnet/minecraft/network/syncher/EntityDataSerializer;'],
        ['net/minecraft/world/effect/MobEffects', 'f_19596_', 'MOVEMENT_SPEED', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['net/minecraft/world/effect/MobEffects', 'f_19597_', 'MOVEMENT_SLOWDOWN', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['net/minecraft/world/effect/MobEffects', 'f_19600_', 'DAMAGE_BOOST', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['net/minecraft/world/effect/MobEffects', 'f_19601_', 'HEAL', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['net/minecraft/world/effect/MobEffects', 'f_19602_', 'HARM', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['net/minecraft/world/effect/MobEffects', 'f_19606_', 'DAMAGE_RESISTANCE', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['net/minecraft/world/effect/MobEffects', 'f_19610_', 'BLINDNESS', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['net/minecraft/world/effect/MobEffects', 'f_19611_', 'NIGHT_VISION', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['net/minecraft/world/effect/MobEffects', 'f_19612_', 'HUNGER', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['net/minecraft/world/effect/MobEffects', 'f_19613_', 'WEAKNESS', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['net/minecraft/world/effect/MobEffects', 'f_19614_', 'POISON', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['net/minecraft/world/effect/MobEffects', 'f_19615_', 'WITHER', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['net/minecraft/world/effect/MobEffects', 'f_19619_', 'GLOWING', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['com/mega/revelationfix/mixin/gr/ApostleMixin', 'f_19796_', 'random', 'Lnet/minecraft/util/RandomSource;'],
        ['com/mega/revelationfix/mixin/gr/ApostleMixin', 'f_19797_', 'tickCount', 'I'],
        ['net/minecraft/world/entity/LivingEntity', 'f_19802_', 'invulnerableTime', 'I'],
        ['com/mega/revelationfix/mixin/gr/ApostleMixin', 'f_19804_', 'entityData', 'Lnet/minecraft/network/syncher/SynchedEntityData;'],
        ['net/minecraft/world/entity/EntitySelector', 'f_20406_', 'NO_CREATIVE_OR_SPECTATOR', 'Ljava/util/function/Predicate;'],
        ['com/mega/revelationfix/mixin/gr/ApostleMixin', 'f_21345_', 'goalSelector', 'Lnet/minecraft/world/entity/ai/goal/GoalSelector;'],
        ['net/minecraft/world/effect/MobEffects', 'f_216964_', 'DARKNESS', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['net/minecraft/world/entity/ai/attributes/Attributes', 'f_22276_', 'MAX_HEALTH', 'Lnet/minecraft/world/entity/ai/attributes/Attribute;'],
        ['net/minecraft/world/entity/ai/attributes/Attributes', 'f_22284_', 'ARMOR', 'Lnet/minecraft/world/entity/ai/attributes/Attribute;'],
        ['net/minecraft/world/entity/ai/attributes/Attributes', 'f_22285_', 'ARMOR_TOUGHNESS', 'Lnet/minecraft/world/entity/ai/attributes/Attribute;'],
        ['net/minecraft/world/level/GameRules', 'f_46133_', 'RULE_KEEPINVENTORY', 'Lnet/minecraft/world/level/GameRules$Key;'],
        ['net/minecraft/world/level/Level', 'f_46441_', 'random', 'Lnet/minecraft/util/RandomSource;'],
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
        ['net/minecraft/world/phys/Vec3', 'f_82479_', 'x', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82481_', 'z', 'D'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/gr/ApostleModelMixin'] = [
        ['net/minecraft/client/model/geom/ModelPart', 'f_104207_', 'visible', 'Z'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/gr/ApostleRendererMixin'] = [
        ['net/minecraft/world/phys/Vec3', 'f_82479_', 'x', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82480_', 'y', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82481_', 'z', 'D'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/gr/BarricadeSpellMixin'] = [
        ['net/minecraft/world/entity/ai/attributes/Attributes', 'f_22276_', 'MAX_HEALTH', 'Lnet/minecraft/world/entity/ai/attributes/Attribute;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/gr/BossLoopMusicMixin'] = [
        ['com/mega/revelationfix/mixin/gr/BossLoopMusicMixin', 'f_119574_', 'pitch', 'F'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/gr/BowItemMixin'] = [
        ['net/minecraft/world/entity/Entity', 'f_19859_', 'yRotO', 'F'],
        ['net/minecraft/world/entity/Entity', 'f_19860_', 'xRotO', 'F'],
        ['net/minecraft/world/entity/projectile/AbstractArrow', 'f_36705_', 'pickup', 'Lnet/minecraft/world/entity/projectile/AbstractArrow$Pickup;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/gr/CycloneSpellMixin'] = [
        ['net/minecraft/world/phys/Vec3', 'f_82479_', 'x', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82480_', 'y', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82481_', 'z', 'D'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/gr/FireballSpellMixin'] = [
        ['net/minecraft/sounds/SoundEvents', 'f_11705_', 'BLAZE_SHOOT', 'Lnet/minecraft/sounds/SoundEvent;'],
        ['net/minecraft/world/phys/Vec3', 'f_82479_', 'x', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82480_', 'y', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82481_', 'z', 'D'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/gr/FontMixin'] = [
        ['net/minecraft/client/gui/Font', 'f_242994_', 'filterFishyGlyphs', 'Z'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/gr/GhastSpellMixin'] = [
        ['net/minecraft/world/effect/MobEffects', 'f_19613_', 'WEAKNESS', 'Lnet/minecraft/world/effect/MobEffect;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/gr/LavaballSpellMixin'] = [
        ['net/minecraft/server/level/ServerLevel', 'f_46441_', 'random', 'Lnet/minecraft/util/RandomSource;'],
        ['net/minecraft/world/phys/Vec3', 'f_82479_', 'x', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82480_', 'y', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82481_', 'z', 'D'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/gr/LivingEntityHurtEventMixin'] = [
        ['net/minecraft/world/damagesource/DamageTypes', 'f_268724_', 'FELL_OUT_OF_WORLD', 'Lnet/minecraft/resources/ResourceKey;'],
        ['net/minecraft/world/level/Level', 'f_46429_', 'NETHER', 'Lnet/minecraft/resources/ResourceKey;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/gr/LivingEntityMixin'] = [
        ['net/minecraft/world/entity/ai/attributes/Attributes', 'f_22277_', 'FOLLOW_RANGE', 'Lnet/minecraft/world/entity/ai/attributes/Attribute;'],
        ['net/minecraft/world/entity/ai/targeting/TargetingConditions', 'f_26872_', 'DEFAULT', 'Lnet/minecraft/world/entity/ai/targeting/TargetingConditions;'],
        ['net/minecraft/world/level/material/Fluids', 'f_76195_', 'LAVA', 'Lnet/minecraft/world/level/material/FlowingFluid;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/gr/ModFocusItemMixin'] = [
        ['net/minecraft/world/item/ItemStack', 'f_41583_', 'EMPTY', 'Lnet/minecraft/world/item/ItemStack;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/gr/ModMainMixin'] = [
        ['net/minecraft/core/registries/Registries', 'f_279569_', 'CREATIVE_MODE_TAB', 'Lnet/minecraft/resources/ResourceKey;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/gr/NetherStarBarMixin'] = [
        ['net/minecraft/world/phys/Vec3', 'f_82479_', 'x', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82480_', 'y', 'D'],
        ['com/mojang/blaze3d/vertex/DefaultVertexFormat', 'f_85811_', 'BLOCK', 'Lcom/mojang/blaze3d/vertex/VertexFormat;'],
        ['net/minecraft/client/Minecraft', 'f_91063_', 'gameRenderer', 'Lnet/minecraft/client/renderer/GameRenderer;'],
        ['net/minecraft/client/Minecraft', 'f_91074_', 'player', 'Lnet/minecraft/client/player/LocalPlayer;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/gr/PhantomServantRendererMixin'] = [
        ['net/minecraft/world/level/Level', 'f_46429_', 'NETHER', 'Lnet/minecraft/resources/ResourceKey;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/gr/PlayerMixin'] = [
        ['net/minecraft/sounds/SoundEvents', 'f_12556_', 'WITHER_DEATH', 'Lnet/minecraft/sounds/SoundEvent;'],
        ['net/minecraft/sounds/SoundEvents', 'f_12557_', 'WITHER_HURT', 'Lnet/minecraft/sounds/SoundEvent;'],
        ['com/mega/revelationfix/mixin/gr/PlayerMixin', 'f_19797_', 'tickCount', 'I'],
        ['net/minecraft/tags/DamageTypeTags', 'f_268415_', 'IS_EXPLOSION', 'Lnet/minecraft/tags/TagKey;'],
        ['net/minecraft/world/damagesource/DamageTypes', 'f_268724_', 'FELL_OUT_OF_WORLD', 'Lnet/minecraft/resources/ResourceKey;'],
        ['net/minecraft/tags/DamageTypeTags', 'f_268745_', 'IS_FIRE', 'Lnet/minecraft/tags/TagKey;'],
        ['net/minecraft/world/level/Level', 'f_46429_', 'NETHER', 'Lnet/minecraft/resources/ResourceKey;'],
        ['net/minecraft/world/level/Level', 'f_46441_', 'random', 'Lnet/minecraft/util/RandomSource;'],
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/gr/StringRenderOutputMixin'] = [
        ['net/minecraft/client/gui/Font$StringRenderOutput', 'f_181362_', 'mode', 'Lnet/minecraft/client/gui/Font$DisplayMode;'],
        ['net/minecraft/client/gui/Font$StringRenderOutput', 'f_92937_', 'bufferSource', 'Lnet/minecraft/client/renderer/MultiBufferSource;'],
        ['net/minecraft/client/gui/Font$StringRenderOutput', 'f_92939_', 'dropShadow', 'Z'],
        ['net/minecraft/client/gui/Font$StringRenderOutput', 'f_92940_', 'dimFactor', 'F'],
        ['net/minecraft/client/gui/Font$StringRenderOutput', 'f_92941_', 'r', 'F'],
        ['net/minecraft/client/gui/Font$StringRenderOutput', 'f_92942_', 'g', 'F'],
        ['net/minecraft/client/gui/Font$StringRenderOutput', 'f_92943_', 'b', 'F'],
        ['net/minecraft/client/gui/Font$StringRenderOutput', 'f_92944_', 'a', 'F'],
        ['net/minecraft/client/gui/Font$StringRenderOutput', 'f_92945_', 'pose', 'Lorg/joml/Matrix4f;'],
        ['net/minecraft/client/gui/Font$StringRenderOutput', 'f_92947_', 'packedLightCoords', 'I'],
        ['net/minecraft/client/gui/Font$StringRenderOutput', 'f_92948_', 'x', 'F'],
        ['net/minecraft/client/gui/Font$StringRenderOutput', 'f_92949_', 'y', 'F'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/gr/SummonApollyonMixin'] = [
        ['net/minecraft/sounds/SoundEvents', 'f_12166_', 'AMBIENT_NETHER_WASTES_MOOD', 'Lnet/minecraft/core/Holder$Reference;'],
        ['com/mega/revelationfix/mixin/gr/SummonApollyonMixin', 'f_19797_', 'tickCount', 'I'],
        ['net/minecraft/world/level/Level', 'f_46429_', 'NETHER', 'Lnet/minecraft/resources/ResourceKey;'],
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/gr/WitherSkullSpellMixin'] = [
        ['net/minecraft/sounds/SoundEvents', 'f_11705_', 'BLAZE_SHOOT', 'Lnet/minecraft/sounds/SoundEvent;'],
        ['net/minecraft/world/phys/Vec3', 'f_82479_', 'x', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82480_', 'y', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82481_', 'z', 'D'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/ironspellbooks/goety_revelation/SpectreArmorMixin'] = [
        ['com/mega/revelationfix/mixin/ironspellbooks/goety_revelation/SpectreArmorMixin', 'f_265916_', 'type', 'Lnet/minecraft/world/item/ArmorItem$Type;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/ironspellbooks/goety_revelation/SpectreDarkmageArmorMixin'] = [
        ['com/mega/revelationfix/mixin/ironspellbooks/goety_revelation/SpectreDarkmageArmorMixin', 'f_265916_', 'type', 'Lnet/minecraft/world/item/ArmorItem$Type;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/ironspellbooks/goety_revelation/SpiderArmorMixin'] = [
        ['com/mega/revelationfix/mixin/ironspellbooks/goety_revelation/SpiderArmorMixin', 'f_265916_', 'type', 'Lnet/minecraft/world/item/ArmorItem$Type;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/ironspellbooks/goety_revelation/SpiderDarkmageArmorMixin'] = [
        ['com/mega/revelationfix/mixin/ironspellbooks/goety_revelation/SpiderDarkmageArmorMixin', 'f_265916_', 'type', 'Lnet/minecraft/world/item/ArmorItem$Type;'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/tetra/HammerBaseBlockMixin'] = [
        ['net/minecraft/core/particles/ParticleTypes', 'f_123745_', 'SOUL_FIRE_FLAME', 'Lnet/minecraft/core/particles/SimpleParticleType;'],
        ['net/minecraft/core/particles/ParticleTypes', 'f_123746_', 'SOUL', 'Lnet/minecraft/core/particles/SimpleParticleType;'],
        ['net/minecraft/sounds/SoundEvents', 'f_12600_', 'ZOMBIE_ATTACK_IRON_DOOR', 'Lnet/minecraft/sounds/SoundEvent;'],
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
    ];
    fieldRefMap['com/mega/revelationfix/mixin/tetra/ModularItemMixin'] = [
        ['net/minecraft/world/entity/player/Player', 'f_19797_', 'tickCount', 'I'],
        ['net/minecraft/world/entity/player/Player', 'f_20911_', 'swinging', 'Z'],
    ];
    fieldRefMap['com/moakiee/ae2lt/mixin/EntityPhaseMovementMixin'] = [
        ['net/minecraft/world/phys/Vec3', 'f_82479_', 'x', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82480_', 'y', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82481_', 'z', 'D'],
    ];
    fieldRefMap['com/moakiee/ae2lt/mixin/EntityUndyingMixin'] = [
        ['net/minecraft/world/level/gameevent/GameEvent', 'f_223707_', 'ENTITY_DIE', 'Lnet/minecraft/world/level/gameevent/GameEvent;'],
    ];
    fieldRefMap['com/moakiee/ae2lt/mixin/PlayerPhaseFlightMixin'] = [
        ['net/minecraft/world/entity/player/Abilities', 'f_35935_', 'flying', 'Z'],
        ['net/minecraft/world/entity/player/Player', 'f_36077_', 'abilities', 'Lnet/minecraft/world/entity/player/Abilities;'],
    ];
    fieldRefMap['com/moakiee/ae2lt/mixin/ServerCommonPacketListenerUndyingMixin'] = [
        ['net/minecraft/server/network/ServerGamePacketListenerImpl', 'f_9743_', 'player', 'Lnet/minecraft/server/level/ServerPlayer;'],
    ];
    fieldRefMap['com/moakiee/ae2lt/mixin/ServerGamePacketListenerCelestweaveCreativeSyncMixin'] = [
        ['net/minecraft/server/level/ServerPlayer', 'f_36095_', 'inventoryMenu', 'Lnet/minecraft/world/inventory/InventoryMenu;'],
        ['net/minecraft/world/inventory/Slot', 'f_40219_', 'index', 'I'],
        ['net/minecraft/world/item/ItemStack', 'f_41583_', 'EMPTY', 'Lnet/minecraft/world/item/ItemStack;'],
        ['net/minecraft/server/network/ServerGamePacketListenerImpl', 'f_9743_', 'player', 'Lnet/minecraft/server/level/ServerPlayer;'],
    ];
    fieldRefMap['com/moakiee/ae2lt/mixin/ServerGamePacketListenerPhaseMovementMixin'] = [
        ['net/minecraft/world/entity/player/Abilities', 'f_35935_', 'flying', 'Z'],
        ['net/minecraft/server/network/ServerGamePacketListenerImpl', 'f_9743_', 'player', 'Lnet/minecraft/server/level/ServerPlayer;'],
    ];
    fieldRefMap['com/moakiee/ae2lt/mixin/client/LevelRendererPhaseFlightMixin'] = [
        ['net/minecraft/client/Minecraft', 'f_91074_', 'player', 'Lnet/minecraft/client/player/LocalPlayer;'],
    ];
    fieldRefMap['com/moakiee/ae2lt/mixin/client/LocalPlayerPhaseMovementMixin'] = [
        ['net/minecraft/world/entity/player/Abilities', 'f_35935_', 'flying', 'Z'],
    ];
    fieldRefMap['com/moakiee/ae2lt/mixin/recipeviewer/emi/EmiEncodePatternTransferMixin'] = [
        ['net/minecraft/client/Minecraft', 'f_91080_', 'screen', 'Lnet/minecraft/client/gui/screens/Screen;'],
    ];
    fieldRefMap['com/moakiee/ae2lt/mixin/recipeviewer/jei/JeiEncodePatternTransferMixin'] = [
        ['net/minecraft/world/item/ItemStack', 'f_41583_', 'EMPTY', 'Lnet/minecraft/world/item/ItemStack;'],
    ];
    fieldRefMap['com/moakiee/ae2lt/mixin/recipeviewer/jei/JeiRecipeTransferButtonControllerMixin'] = [
        ['net/minecraft/client/Minecraft', 'f_91080_', 'screen', 'Lnet/minecraft/client/gui/screens/Screen;'],
    ];
    fieldRefMap['com/moakiee/thunderbolt/ae2/mixin/NeoEcoPatternBusBatchMixin'] = [
        ['net/minecraft/core/registries/BuiltInRegistries', 'f_256975_', 'BLOCK', 'Lnet/minecraft/core/DefaultedRegistry;'],
    ];
    fieldRefMap['com/moakiee/thunderbolt/ae2/mixin/TimeWheelCraftingCPUMenuMixin'] = [
        ['com/moakiee/thunderbolt/ae2/mixin/TimeWheelCraftingCPUMenuMixin', 'f_38840_', 'containerId', 'I'],
    ];
    fieldRefMap['com/probejs/mixins/TranslatableMixin'] = [
        ['net/minecraft/network/chat/contents/TranslatableContents', 'f_237497_', 'key', 'Ljava/lang/String;'],
        ['net/minecraft/network/chat/contents/TranslatableContents', 'f_263792_', 'fallback', 'Ljava/lang/String;'],
    ];
    fieldRefMap['com/terraformersmc/mod_menu/mixin/MixinPauseScreen'] = [
        ['net/minecraft/client/gui/components/AbstractWidget', 'f_93623_', 'active', 'Z'],
        ['net/minecraft/client/gui/components/AbstractWidget', 'f_93624_', 'visible', 'Z'],
        ['com/terraformersmc/mod_menu/mixin/MixinPauseScreen', 'f_96543_', 'width', 'I'],
        ['com/terraformersmc/mod_menu/mixin/MixinPauseScreen', 'f_96544_', 'height', 'I'],
    ];
    fieldRefMap['com/xiaopiao/patternbetter/mixin/ContainerExPatternProviderMixin'] = [
        ['net/minecraft/world/inventory/Slot', 'f_40220_', 'x', 'I'],
        ['net/minecraft/world/inventory/Slot', 'f_40221_', 'y', 'I'],
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
    ];
    fieldRefMap['com/xiaopiao/patternbetter/mixin/GuiExPatternProviderMixin'] = [
        ['net/minecraft/world/inventory/Slot', 'f_40219_', 'index', 'I'],
        ['net/minecraft/world/inventory/Slot', 'f_40220_', 'x', 'I'],
        ['net/minecraft/world/inventory/Slot', 'f_40221_', 'y', 'I'],
        ['net/minecraft/client/Minecraft', 'f_91062_', 'font', 'Lnet/minecraft/client/gui/Font;'],
        ['com/xiaopiao/patternbetter/mixin/GuiExPatternProviderMixin', 'f_96547_', 'font', 'Lnet/minecraft/client/gui/Font;'],
        ['com/xiaopiao/patternbetter/mixin/GuiExPatternProviderMixin', 'f_97726_', 'imageWidth', 'I'],
        ['com/xiaopiao/patternbetter/mixin/GuiExPatternProviderMixin', 'f_97727_', 'imageHeight', 'I'],
        ['com/xiaopiao/patternbetter/mixin/GuiExPatternProviderMixin', 'f_97735_', 'leftPos', 'I'],
        ['com/xiaopiao/patternbetter/mixin/GuiExPatternProviderMixin', 'f_97736_', 'topPos', 'I'],
    ];
    fieldRefMap['com/xiaopiao/patternbetter/mixin/PatternProviderMenuMixin'] = [
        ['net/minecraft/world/inventory/Slot', 'f_40219_', 'index', 'I'],
        ['net/minecraft/world/item/ItemStack', 'f_41583_', 'EMPTY', 'Lnet/minecraft/world/item/ItemStack;'],
    ];
    fieldRefMap['com/xiaopiao/patternbetter/mixin/VerticalButtonBarMixin'] = [
        ['net/minecraft/client/gui/components/Button', 'f_93624_', 'visible', 'Z'],
    ];
    fieldRefMap['committee/nova/mods/avaritia/init/mixins/ItemRendererMixin'] = [
        ['net/minecraft/client/renderer/entity/ItemRenderer', 'f_115095_', 'itemModelShaper', 'Lnet/minecraft/client/renderer/ItemModelShaper;'],
        ['net/minecraft/client/renderer/entity/ItemRenderer', 'f_115096_', 'textureManager', 'Lnet/minecraft/client/renderer/texture/TextureManager;'],
    ];
    fieldRefMap['committee/nova/mods/avaritia/init/mixins/NetherWartBlockMixin'] = [
        ['net/minecraft/world/level/Level', 'f_46441_', 'random', 'Lnet/minecraft/util/RandomSource;'],
        ['net/minecraft/world/level/block/NetherWartBlock', 'f_54967_', 'AGE', 'Lnet/minecraft/world/level/block/state/properties/IntegerProperty;'],
    ];
    fieldRefMap['de/mari_023/ae2wtlib/mixin/MinecraftMixin'] = [
        ['net/minecraft/world/entity/player/Abilities', 'f_35937_', 'instabuild', 'Z'],
        ['net/minecraft/client/Minecraft', 'f_91074_', 'player', 'Lnet/minecraft/client/player/LocalPlayer;'],
    ];
    fieldRefMap['de/mari_023/ae2wtlib/mixin/RestockRender'] = [
        ['net/minecraft/client/Minecraft', 'f_91074_', 'player', 'Lnet/minecraft/client/player/LocalPlayer;'],
    ];
    fieldRefMap['dev/architectury/mixin/MixinLightningBolt'] = [
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
    ];
    fieldRefMap['dev/architectury/mixin/forge/MixinFallingBlockEntity'] = [
        ['net/minecraft/world/entity/item/FallingBlockEntity', 'f_31946_', 'blockState', 'Lnet/minecraft/world/level/block/state/BlockState;'],
    ];
    fieldRefMap['dev/beecube31/botaniajei/mixins/MixinManaPoolRecipeCategory'] = [
        ['net/minecraft/client/Minecraft', 'f_91062_', 'font', 'Lnet/minecraft/client/gui/Font;'],
    ];
    fieldRefMap['dev/beecube31/botaniajei/mixins/MixinPureDaisyRecipeCategory'] = [
        ['net/minecraft/client/Minecraft', 'f_91062_', 'font', 'Lnet/minecraft/client/gui/Font;'],
    ];
    fieldRefMap['dev/beecube31/botaniajei/mixins/MixinRuneAltarRecipeCategory'] = [
        ['net/minecraft/client/Minecraft', 'f_91062_', 'font', 'Lnet/minecraft/client/gui/Font;'],
    ];
    fieldRefMap['dev/beecube31/botaniajei/mixins/MixinTerraPlateRecipeCategory'] = [
        ['net/minecraft/client/Minecraft', 'f_91062_', 'font', 'Lnet/minecraft/client/gui/Font;'],
    ];
    fieldRefMap['dev/beecube31/botaniajei/mixins/emi/MixinManaInfusionEmiRecipe'] = [
        ['net/minecraft/network/chat/Style', 'f_131099_', 'EMPTY', 'Lnet/minecraft/network/chat/Style;'],
    ];
    fieldRefMap['dev/beecube31/botaniajei/mixins/emi/MixinPureDaisyEmiRecipe'] = [
        ['net/minecraft/network/chat/Style', 'f_131099_', 'EMPTY', 'Lnet/minecraft/network/chat/Style;'],
    ];
    fieldRefMap['dev/beecube31/botaniajei/mixins/emi/MixinRuneAltarEmiRecipe'] = [
        ['net/minecraft/network/chat/Style', 'f_131099_', 'EMPTY', 'Lnet/minecraft/network/chat/Style;'],
    ];
    fieldRefMap['dev/beecube31/botaniajei/mixins/emi/MixinTerraPlateEmiRecipe'] = [
        ['net/minecraft/network/chat/Style', 'f_131099_', 'EMPTY', 'Lnet/minecraft/network/chat/Style;'],
    ];
    fieldRefMap['dev/ftb/mods/ftbchunks/core/mixin/ArmorStandMixin'] = [
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
    ];
    fieldRefMap['dev/ftb/mods/ftbchunks/core/mixin/BlockStateMixin'] = [
        ['net/minecraft/world/level/material/Fluids', 'f_76193_', 'WATER', 'Lnet/minecraft/world/level/material/FlowingFluid;'],
    ];
    fieldRefMap['dev/ftb/mods/ftbchunks/core/mixin/ChunkMapMixin'] = [
        ['net/minecraft/server/level/ChunkMap', 'f_140133_', 'level', 'Lnet/minecraft/server/level/ServerLevel;'],
    ];
    fieldRefMap['dev/ftb/mods/ftbultimine/mixin/BlockMixin'] = [
        ['net/minecraft/tags/BlockTags', 'f_13106_', 'LOGS', 'Lnet/minecraft/tags/TagKey;'],
    ];
    fieldRefMap['dev/kosmx/playerAnim/mixin/BipedEntityModelMixin'] = [
        ['net/minecraft/client/model/HumanoidModel', 'f_102808_', 'head', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['net/minecraft/client/model/HumanoidModel', 'f_102809_', 'hat', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['net/minecraft/client/model/HumanoidModel', 'f_102810_', 'body', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['net/minecraft/client/model/HumanoidModel', 'f_102811_', 'rightArm', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['net/minecraft/client/model/HumanoidModel', 'f_102812_', 'leftArm', 'Lnet/minecraft/client/model/geom/ModelPart;'],
    ];
    fieldRefMap['dev/kosmx/playerAnim/mixin/HeldItemMixin'] = [
        ['com/mojang/math/Axis', 'f_252403_', 'ZP', 'Lcom/mojang/math/Axis;'],
        ['com/mojang/math/Axis', 'f_252436_', 'YP', 'Lcom/mojang/math/Axis;'],
        ['com/mojang/math/Axis', 'f_252529_', 'XP', 'Lcom/mojang/math/Axis;'],
    ];
    fieldRefMap['dev/kosmx/playerAnim/mixin/PlayerModelMixin'] = [
        ['dev/kosmx/playerAnim/mixin/PlayerModelMixin', 'f_102808_', 'head', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['dev/kosmx/playerAnim/mixin/PlayerModelMixin', 'f_102809_', 'hat', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['dev/kosmx/playerAnim/mixin/PlayerModelMixin', 'f_102810_', 'body', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['dev/kosmx/playerAnim/mixin/PlayerModelMixin', 'f_102811_', 'rightArm', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['dev/kosmx/playerAnim/mixin/PlayerModelMixin', 'f_102812_', 'leftArm', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['dev/kosmx/playerAnim/mixin/PlayerModelMixin', 'f_102813_', 'rightLeg', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['dev/kosmx/playerAnim/mixin/PlayerModelMixin', 'f_102814_', 'leftLeg', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['net/minecraft/client/model/PlayerModel', 'f_103374_', 'leftSleeve', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['net/minecraft/client/model/PlayerModel', 'f_103375_', 'rightSleeve', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['net/minecraft/client/model/PlayerModel', 'f_103376_', 'leftPants', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['net/minecraft/client/model/PlayerModel', 'f_103377_', 'rightPants', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['net/minecraft/client/model/PlayerModel', 'f_103378_', 'jacket', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_104200_', 'x', 'F'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_104201_', 'y', 'F'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_104202_', 'z', 'F'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_104203_', 'xRot', 'F'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_104204_', 'yRot', 'F'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_104205_', 'zRot', 'F'],
    ];
    fieldRefMap['dev/kosmx/playerAnim/mixin/PlayerRendererMixin'] = [
        ['net/minecraft/client/model/PlayerModel', 'f_102808_', 'head', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['net/minecraft/client/model/PlayerModel', 'f_102809_', 'hat', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['net/minecraft/client/model/PlayerModel', 'f_102810_', 'body', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['net/minecraft/client/model/PlayerModel', 'f_102811_', 'rightArm', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['net/minecraft/client/model/PlayerModel', 'f_102812_', 'leftArm', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['net/minecraft/client/model/PlayerModel', 'f_102813_', 'rightLeg', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['net/minecraft/client/model/PlayerModel', 'f_102814_', 'leftLeg', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['net/minecraft/client/model/PlayerModel', 'f_103374_', 'leftSleeve', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['net/minecraft/client/model/PlayerModel', 'f_103375_', 'rightSleeve', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['net/minecraft/client/model/PlayerModel', 'f_103376_', 'leftPants', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['net/minecraft/client/model/PlayerModel', 'f_103377_', 'rightPants', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['net/minecraft/client/model/PlayerModel', 'f_103378_', 'jacket', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_104207_', 'visible', 'Z'],
        ['dev/kosmx/playerAnim/mixin/PlayerRendererMixin', 'f_115290_', 'model', 'Lnet/minecraft/client/model/EntityModel;'],
        ['com/mojang/math/Axis', 'f_252403_', 'ZP', 'Lcom/mojang/math/Axis;'],
        ['com/mojang/math/Axis', 'f_252436_', 'YP', 'Lcom/mojang/math/Axis;'],
        ['com/mojang/math/Axis', 'f_252529_', 'XP', 'Lcom/mojang/math/Axis;'],
    ];
    fieldRefMap['dev/kosmx/playerAnim/mixin/firstPerson/LevelRendererMixin'] = [
        ['net/minecraft/client/Minecraft', 'f_91063_', 'gameRenderer', 'Lnet/minecraft/client/renderer/GameRenderer;'],
    ];
    fieldRefMap['dev/kosmx/playerAnim/mixin/firstPerson/LivingEntityRendererMixin'] = [
        ['net/minecraft/client/renderer/entity/LivingEntityRenderer', 'f_115291_', 'layers', 'Ljava/util/List;'],
    ];
    fieldRefMap['dev/latvian/mods/kubejs/core/mixin/common/ClientLevelMixin'] = [
        ['net/minecraft/client/multiplayer/ClientLevel', 'f_104566_', 'players', 'Ljava/util/List;'],
    ];
    fieldRefMap['dev/latvian/mods/kubejs/core/mixin/common/ContainerMixin'] = [
        ['net/minecraft/world/entity/player/Inventory', 'f_35978_', 'player', 'Lnet/minecraft/world/entity/player/Player;'],
        ['net/minecraft/world/item/ItemStack', 'f_41583_', 'EMPTY', 'Lnet/minecraft/world/item/ItemStack;'],
    ];
    fieldRefMap['dev/latvian/mods/kubejs/core/mixin/common/CraftingContainerMixin'] = [
        ['net/minecraft/world/inventory/TransientCraftingContainer', 'f_286998_', 'menu', 'Lnet/minecraft/world/inventory/AbstractContainerMenu;'],
    ];
    fieldRefMap['dev/latvian/mods/kubejs/core/mixin/common/CreativeModeTabMixin'] = [
        ['net/minecraft/world/item/CreativeModeTab', 'f_40764_', 'displayName', 'Lnet/minecraft/network/chat/Component;'],
        ['net/minecraft/world/item/CreativeModeTab', 'f_40770_', 'iconItemStack', 'Lnet/minecraft/world/item/ItemStack;'],
    ];
    fieldRefMap['dev/latvian/mods/kubejs/core/mixin/common/EntityMixin'] = [
        ['net/minecraft/world/entity/Entity', 'f_19793_', 'maxUpStep', 'F'],
        ['net/minecraft/world/entity/Entity', 'f_19797_', 'tickCount', 'I'],
    ];
    fieldRefMap['dev/latvian/mods/kubejs/core/mixin/common/IngredientTagValueMixin'] = [
        ['net/minecraft/world/item/crafting/Ingredient$TagValue', 'f_43959_', 'tag', 'Lnet/minecraft/tags/TagKey;'],
    ];
    fieldRefMap['dev/latvian/mods/kubejs/core/mixin/common/ItemMixin'] = [
        ['net/minecraft/world/item/crafting/Ingredient', 'f_43901_', 'EMPTY', 'Lnet/minecraft/world/item/crafting/Ingredient;'],
    ];
    fieldRefMap['dev/latvian/mods/kubejs/core/mixin/common/LootTablesMixin'] = [
        ['net/minecraft/world/level/storage/loot/LootDataType', 'f_278413_', 'TABLE', 'Lnet/minecraft/world/level/storage/loot/LootDataType;'],
        ['net/minecraft/world/level/storage/loot/LootDataManager', 'f_278415_', 'elements', 'Ljava/util/Map;'],
    ];
    fieldRefMap['dev/latvian/mods/kubejs/core/mixin/common/MinecraftClientMixin'] = [
        ['net/minecraft/client/Minecraft', 'f_91073_', 'level', 'Lnet/minecraft/client/multiplayer/ClientLevel;'],
        ['net/minecraft/client/Minecraft', 'f_91074_', 'player', 'Lnet/minecraft/client/player/LocalPlayer;'],
    ];
    fieldRefMap['dev/latvian/mods/kubejs/core/mixin/common/MinecraftServerMixin'] = [
        ['net/minecraft/world/entity/player/Inventory', 'f_35974_', 'items', 'Lnet/minecraft/core/NonNullList;'],
        ['net/minecraft/server/level/ServerPlayer', 'f_36096_', 'containerMenu', 'Lnet/minecraft/world/inventory/AbstractContainerMenu;'],
        ['net/minecraft/world/item/ItemStack', 'f_41583_', 'EMPTY', 'Lnet/minecraft/world/item/ItemStack;'],
    ];
    fieldRefMap['dev/latvian/mods/kubejs/core/mixin/common/OptionsMixin'] = [
        ['net/minecraft/client/Options', 'f_92110_', 'optionsFile', 'Ljava/io/File;'],
    ];
    fieldRefMap['dev/latvian/mods/kubejs/core/mixin/common/PlayerMixin'] = [
        ['net/minecraft/world/entity/player/Player', 'f_36095_', 'inventoryMenu', 'Lnet/minecraft/world/inventory/InventoryMenu;'],
    ];
    fieldRefMap['dev/latvian/mods/kubejs/core/mixin/common/ServerLevelMixin'] = [
        ['net/minecraft/server/level/ServerLevel', 'f_8546_', 'players', 'Ljava/util/List;'],
    ];
    fieldRefMap['dev/latvian/mods/rhino/mod/core/mixin/common/ChatFormattingMixin'] = [
        ['net/minecraft/ChatFormatting', 'f_126595_', 'color', 'Ljava/lang/Integer;'],
    ];
    fieldRefMap['dev/latvian/mods/rhino/mod/core/mixin/common/DyeColorMixin'] = [
        ['net/minecraft/world/item/DyeColor', 'f_41040_', 'fireworkColor', 'I'],
        ['net/minecraft/world/item/DyeColor', 'f_41041_', 'textColor', 'I'],
    ];
    fieldRefMap['dev/latvian/mods/rhino/mod/core/mixin/common/ResourceKeyMixin'] = [
        ['net/minecraft/resources/ResourceKey', 'f_135777_', 'location', 'Lnet/minecraft/resources/ResourceLocation;'],
    ];
    fieldRefMap['dev/latvian/mods/rhino/mod/core/mixin/common/TextColorMixin'] = [
        ['net/minecraft/network/chat/TextColor', 'f_131257_', 'value', 'I'],
    ];
    fieldRefMap['dev/mtechlab/manadisplay/mixins/FlowersWandHudMixin'] = [
        ['net/minecraft/client/Minecraft', 'f_91062_', 'font', 'Lnet/minecraft/client/gui/Font;'],
    ];
    fieldRefMap['dev/mtechlab/manadisplay/mixins/HUDHandlerMixin'] = [
        ['net/minecraft/client/Minecraft', 'f_91062_', 'font', 'Lnet/minecraft/client/gui/Font;'],
    ];
    fieldRefMap['dev/mtechlab/manadisplay/mixins/SpreaderWandHudMixin'] = [
        ['net/minecraft/world/item/ItemStack', 'f_41583_', 'EMPTY', 'Lnet/minecraft/world/item/ItemStack;'],
        ['net/minecraft/client/Minecraft', 'f_91062_', 'font', 'Lnet/minecraft/client/gui/Font;'],
    ];
    fieldRefMap['dev/shadowsoffire/fastbench/mixin/MixinBackpackMenu'] = [
        ['net/minecraft/world/inventory/InventoryMenu', 'f_38839_', 'slots', 'Lnet/minecraft/core/NonNullList;'],
        ['net/minecraft/world/inventory/InventoryMenu', 'f_39701_', 'craftSlots', 'Lnet/minecraft/world/inventory/CraftingContainer;'],
        ['net/minecraft/world/inventory/InventoryMenu', 'f_39702_', 'resultSlots', 'Lnet/minecraft/world/inventory/ResultContainer;'],
        ['net/minecraft/world/inventory/InventoryMenu', 'f_39703_', 'owner', 'Lnet/minecraft/world/entity/player/Player;'],
    ];
    fieldRefMap['dev/shadowsoffire/fastbench/mixin/MixinCraftingMenu'] = [
        ['net/minecraft/world/inventory/CraftingMenu', 'f_38839_', 'slots', 'Lnet/minecraft/core/NonNullList;'],
        ['net/minecraft/world/inventory/CraftingMenu', 'f_39348_', 'craftSlots', 'Lnet/minecraft/world/inventory/CraftingContainer;'],
        ['net/minecraft/world/inventory/CraftingMenu', 'f_39349_', 'resultSlots', 'Lnet/minecraft/world/inventory/ResultContainer;'],
        ['net/minecraft/world/inventory/CraftingMenu', 'f_39350_', 'access', 'Lnet/minecraft/world/inventory/ContainerLevelAccess;'],
        ['net/minecraft/world/inventory/CraftingMenu', 'f_39351_', 'player', 'Lnet/minecraft/world/entity/player/Player;'],
    ];
    fieldRefMap['dev/shadowsoffire/fastbench/mixin/MixinInventoryMenu'] = [
        ['net/minecraft/world/inventory/InventoryMenu', 'f_38839_', 'slots', 'Lnet/minecraft/core/NonNullList;'],
        ['net/minecraft/world/inventory/InventoryMenu', 'f_39701_', 'craftSlots', 'Lnet/minecraft/world/inventory/CraftingContainer;'],
        ['net/minecraft/world/inventory/InventoryMenu', 'f_39702_', 'resultSlots', 'Lnet/minecraft/world/inventory/ResultContainer;'],
        ['net/minecraft/world/inventory/InventoryMenu', 'f_39703_', 'owner', 'Lnet/minecraft/world/entity/player/Player;'],
    ];
    fieldRefMap['dev/shadowsoffire/fastfurnace/mixin/MixinAbstractFurnaceBlockEntity'] = [
        ['net/minecraft/world/item/ItemStack', 'f_41583_', 'EMPTY', 'Lnet/minecraft/world/item/ItemStack;'],
        ['dev/shadowsoffire/fastfurnace/mixin/MixinAbstractFurnaceBlockEntity', 'f_58857_', 'level', 'Lnet/minecraft/world/level/Level;'],
    ];
    fieldRefMap['dev/shadowsoffire/fastsuite/mixin/IngredientMixin'] = [
        ['net/minecraft/world/item/crafting/Ingredient', 'f_43904_', 'stackingIds', 'Lit/unimi/dsi/fastutil/ints/IntList;'],
    ];
    fieldRefMap['dev/shadowsoffire/fastsuite/mixin/ServerResourcesMixin'] = [
        ['net/minecraft/server/ReloadableServerResources', 'f_206848_', 'recipes', 'Lnet/minecraft/world/item/crafting/RecipeManager;'],
        ['net/minecraft/server/ReloadableServerResources', 'f_206849_', 'tagManager', 'Lnet/minecraft/tags/TagManager;'],
    ];
    fieldRefMap['dev/shadowsoffire/fastsuite/mixin/client/ClientPacketListenerMixin'] = [
        ['net/minecraft/client/multiplayer/ClientPacketListener', 'f_104900_', 'recipeManager', 'Lnet/minecraft/world/item/crafting/RecipeManager;'],
    ];
    fieldRefMap['dev/shadowsoffire/placebo/mixin/LootTablesMixin'] = [
        ['net/minecraft/world/level/storage/loot/LootDataManager', 'f_278404_', 'typeKeys', 'Lcom/google/common/collect/Multimap;'],
        ['net/minecraft/world/level/storage/loot/LootDataType', 'f_278413_', 'TABLE', 'Lnet/minecraft/world/level/storage/loot/LootDataType;'],
        ['net/minecraft/world/level/storage/loot/LootDataManager', 'f_278415_', 'elements', 'Ljava/util/Map;'],
    ];
    fieldRefMap['dev/tonimatas/packetfixer/mixins/v1_18_forge/NbtAccounterMixin'] = [
        ['net/minecraft/nbt/NbtAccounter', 'f_128918_', 'quota', 'J'],
    ];
    fieldRefMap['dev/tonimatas/packetfixer/mixins/v1_19_3_forge/NbtAccounterMixin'] = [
        ['net/minecraft/nbt/NbtAccounter', 'f_128918_', 'quota', 'J'],
    ];
    fieldRefMap['dev/tonimatas/packetfixer/mixins/v1_19_4_forge/NbtAccounterMixin'] = [
        ['net/minecraft/nbt/NbtAccounter', 'f_128918_', 'quota', 'J'],
    ];
    fieldRefMap['dev/tonimatas/packetfixer/mixins/v1_19_forge/NbtAccounterMixin'] = [
        ['net/minecraft/nbt/NbtAccounter', 'f_128918_', 'quota', 'J'],
    ];
    fieldRefMap['dev/tonimatas/packetfixer/mixins/v1_20_2_forge/NbtAccounterMixin'] = [
        ['net/minecraft/nbt/NbtAccounter', 'f_128918_', 'quota', 'J'],
    ];
    fieldRefMap['earth/terrarium/adastra/mixins/client/HumanoidModelMixin'] = [
        ['net/minecraft/client/model/HumanoidModel', 'f_102609_', 'riding', 'Z'],
        ['net/minecraft/client/model/HumanoidModel', 'f_102811_', 'rightArm', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['net/minecraft/client/model/HumanoidModel', 'f_102812_', 'leftArm', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_104203_', 'xRot', 'F'],
    ];
    fieldRefMap['earth/terrarium/adastra/mixins/client/LevelRendererMixin'] = [
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109430_', 'prevCloudX', 'I'],
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109431_', 'prevCloudY', 'I'],
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109432_', 'prevCloudZ', 'I'],
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109433_', 'prevCloudColor', 'Lnet/minecraft/world/phys/Vec3;'],
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109435_', 'prevCloudsType', 'Lnet/minecraft/client/CloudStatus;'],
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109450_', 'rainSoundTime', 'I'],
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109461_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109465_', 'level', 'Lnet/minecraft/client/multiplayer/ClientLevel;'],
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109474_', 'generateClouds', 'Z'],
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109475_', 'cloudBuffer', 'Lcom/mojang/blaze3d/vertex/VertexBuffer;'],
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109477_', 'ticks', 'I'],
        ['net/minecraft/core/particles/ParticleTypes', 'f_123762_', 'SMOKE', 'Lnet/minecraft/core/particles/SimpleParticleType;'],
        ['net/minecraft/sounds/SoundEvents', 'f_12541_', 'WEATHER_RAIN', 'Lnet/minecraft/sounds/SoundEvent;'],
        ['net/minecraft/sounds/SoundEvents', 'f_12542_', 'WEATHER_RAIN_ABOVE', 'Lnet/minecraft/sounds/SoundEvent;'],
        ['net/minecraft/tags/FluidTags', 'f_13132_', 'LAVA', 'Lnet/minecraft/tags/TagKey;'],
        ['net/minecraft/world/level/block/Blocks', 'f_50450_', 'MAGMA_BLOCK', 'Lnet/minecraft/world/level/block/Block;'],
        ['net/minecraft/client/Minecraft', 'f_91066_', 'options', 'Lnet/minecraft/client/Options;'],
        ['net/minecraft/client/Minecraft', 'f_91073_', 'level', 'Lnet/minecraft/client/multiplayer/ClientLevel;'],
        ['net/minecraft/client/Minecraft', 'f_91074_', 'player', 'Lnet/minecraft/client/player/LocalPlayer;'],
    ];
    fieldRefMap['earth/terrarium/adastra/mixins/client/PlayerRendererMixin'] = [
        ['net/minecraft/client/model/PlayerModel', 'f_102608_', 'attackTime', 'F'],
        ['net/minecraft/client/model/PlayerModel', 'f_102817_', 'crouching', 'Z'],
        ['net/minecraft/client/model/PlayerModel', 'f_102818_', 'swimAmount', 'F'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_104203_', 'xRot', 'F'],
        ['net/minecraft/client/renderer/texture/OverlayTexture', 'f_118083_', 'NO_OVERLAY', 'I'],
    ];
    fieldRefMap['earth/terrarium/adastra/mixins/client/SoundManagerMixin'] = [
        ['net/minecraft/client/sounds/SoundManager', 'f_120349_', 'soundEngine', 'Lnet/minecraft/client/sounds/SoundEngine;'],
        ['net/minecraft/client/multiplayer/ClientLevel', 'f_46441_', 'random', 'Lnet/minecraft/util/RandomSource;'],
        ['net/minecraft/client/Minecraft', 'f_91073_', 'level', 'Lnet/minecraft/client/multiplayer/ClientLevel;'],
    ];
    fieldRefMap['earth/terrarium/adastra/mixins/client/multipart/EntityRenderDispatcherMixin'] = [
        ['net/minecraft/world/entity/Entity', 'f_19790_', 'xOld', 'D'],
        ['net/minecraft/world/entity/Entity', 'f_19791_', 'yOld', 'D'],
        ['net/minecraft/world/entity/Entity', 'f_19792_', 'zOld', 'D'],
    ];
    fieldRefMap['earth/terrarium/adastra/mixins/common/LivingEntityMixin'] = [
        ['net/minecraft/sounds/SoundEvents', 'f_11909_', 'GENERIC_BURN', 'Lnet/minecraft/sounds/SoundEvent;'],
        ['net/minecraft/world/effect/MobEffects', 'f_19591_', 'SLOW_FALLING', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['earth/terrarium/adastra/mixins/common/LivingEntityMixin', 'f_19796_', 'random', 'Lnet/minecraft/util/RandomSource;'],
        ['net/minecraft/world/entity/LivingEntity', 'f_19797_', 'tickCount', 'I'],
        ['net/minecraft/world/damagesource/DamageTypes', 'f_268434_', 'HOT_FLOOR', 'Lnet/minecraft/resources/ResourceKey;'],
        ['net/minecraft/tags/DamageTypeTags', 'f_268745_', 'IS_FIRE', 'Lnet/minecraft/tags/TagKey;'],
        ['net/minecraft/world/entity/player/Abilities', 'f_35935_', 'flying', 'Z'],
        ['net/minecraft/world/phys/AABB', 'f_82292_', 'maxY', 'D'],
    ];
    fieldRefMap['earth/terrarium/adastra/mixins/common/PlayerMixin'] = [
        ['net/minecraft/network/chat/CommonComponents', 'f_237098_', 'EMPTY', 'Lnet/minecraft/network/chat/Component;'],
    ];
    fieldRefMap['earth/terrarium/adastra/mixins/common/ServerGamePacketListenerImplMixin'] = [
        ['net/minecraft/server/level/ServerPlayer', 'f_19797_', 'tickCount', 'I'],
        ['net/minecraft/server/network/ServerGamePacketListenerImpl', 'f_9737_', 'aboveGroundTickCount', 'I'],
        ['net/minecraft/server/network/ServerGamePacketListenerImpl', 'f_9739_', 'aboveGroundVehicleTickCount', 'I'],
        ['net/minecraft/server/network/ServerGamePacketListenerImpl', 'f_9743_', 'player', 'Lnet/minecraft/server/level/ServerPlayer;'],
    ];
    fieldRefMap['earth/terrarium/adastra/mixins/common/ServerLevelMixin'] = [
        ['net/minecraft/world/level/Level', 'f_46428_', 'OVERWORLD', 'Lnet/minecraft/resources/ResourceKey;'],
        ['net/minecraft/server/level/ServerLevel', 'f_8558_', 'customSpawners', 'Ljava/util/List;'],
    ];
    fieldRefMap['earth/terrarium/adastra/mixins/common/environment/IceBlockMixin'] = [
        ['net/minecraft/world/level/block/Blocks', 'f_50016_', 'AIR', 'Lnet/minecraft/world/level/block/Block;'],
    ];
    fieldRefMap['earth/terrarium/adastra/mixins/forge/common/DimensionSpecialEffectsMixin'] = [
        ['net/minecraft/core/registries/Registries', 'f_256858_', 'DIMENSION', 'Lnet/minecraft/resources/ResourceKey;'],
    ];
    fieldRefMap['giselle/jei_mekanism_multiblocks/client/mixin/minecraft/TooltipMixin'] = [
        ['net/minecraft/client/gui/components/Tooltip', 'f_256850_', 'message', 'Lnet/minecraft/network/chat/Component;'],
        ['net/minecraft/client/gui/components/Tooltip', 'f_257004_', 'narration', 'Lnet/minecraft/network/chat/Component;'],
    ];
    fieldRefMap['icyllis/modernui/mc/mixin/MixinChatScreen'] = [
        ['net/minecraft/client/gui/screens/ChatScreen', 'f_95573_', 'input', 'Lnet/minecraft/client/gui/components/EditBox;'],
    ];
    fieldRefMap['icyllis/modernui/mc/mixin/MixinClientTelemetryManager'] = [
        ['net/minecraft/client/telemetry/TelemetryEventSender', 'f_260501_', 'DISABLED', 'Lnet/minecraft/client/telemetry/TelemetryEventSender;'],
    ];
    fieldRefMap['icyllis/modernui/mc/mixin/MixinCommandSuggestions'] = [
        ['net/minecraft/client/Minecraft', 'f_91066_', 'options', 'Lnet/minecraft/client/Options;'],
        ['net/minecraft/client/gui/components/CommandSuggestions', 'f_93851_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
        ['net/minecraft/client/gui/components/CommandSuggestions', 'f_93853_', 'input', 'Lnet/minecraft/client/gui/components/EditBox;'],
        ['net/minecraft/client/gui/components/CommandSuggestions', 'f_93855_', 'commandsOnly', 'Z'],
        ['net/minecraft/client/gui/components/CommandSuggestions', 'f_93865_', 'pendingSuggestions', 'Ljava/util/concurrent/CompletableFuture;'],
    ];
    fieldRefMap['icyllis/modernui/mc/mixin/MixinEditBox'] = [
        ['net/minecraft/client/gui/components/EditBox', 'f_94093_', 'value', 'Ljava/lang/String;'],
        ['net/minecraft/client/gui/components/EditBox', 'f_94095_', 'frame', 'I'],
        ['net/minecraft/client/gui/components/EditBox', 'f_94101_', 'cursorPos', 'I'],
    ];
    fieldRefMap['icyllis/modernui/mc/mixin/MixinFoodData'] = [
        ['net/minecraft/world/food/FoodData', 'f_38697_', 'saturationLevel', 'F'],
        ['net/minecraft/world/food/FoodData', 'f_38698_', 'exhaustionLevel', 'F'],
    ];
    fieldRefMap['icyllis/modernui/mc/mixin/MixinLevelLoadingScreen'] = [
        ['net/minecraft/client/gui/screens/LevelLoadingScreen', 'f_96138_', 'progressListener', 'Lnet/minecraft/server/level/progress/StoringChunkProgressListener;'],
    ];
    fieldRefMap['icyllis/modernui/mc/mixin/MixinLevelRendererDBG'] = [
        ['net/minecraft/client/Minecraft', 'f_91063_', 'gameRenderer', 'Lnet/minecraft/client/renderer/GameRenderer;'],
        ['net/minecraft/client/Minecraft', 'f_91074_', 'player', 'Lnet/minecraft/client/player/LocalPlayer;'],
        ['net/minecraft/client/Minecraft', 'f_91075_', 'cameraEntity', 'Lnet/minecraft/world/entity/Entity;'],
    ];
    fieldRefMap['icyllis/modernui/mc/mixin/MixinMinecraft'] = [
        ['net/minecraft/client/Minecraft', 'f_90990_', 'window', 'Lcom/mojang/blaze3d/platform/Window;'],
        ['net/minecraft/client/Minecraft', 'f_91080_', 'screen', 'Lnet/minecraft/client/gui/screens/Screen;'],
    ];
    fieldRefMap['icyllis/modernui/mc/mixin/MixinSelectionList'] = [
        ['net/minecraft/client/gui/components/AbstractSelectionList', 'f_93386_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
        ['net/minecraft/client/gui/components/AbstractSelectionList', 'f_93387_', 'itemHeight', 'I'],
        ['net/minecraft/client/gui/components/AbstractSelectionList', 'f_93396_', 'scrollAmount', 'D'],
    ];
    fieldRefMap['icyllis/modernui/mc/mixin/MixinShaderInstance'] = [
        ['net/minecraft/client/renderer/ShaderInstance', 'f_173299_', 'programId', 'I'],
        ['net/minecraft/client/renderer/ShaderInstance', 'f_173301_', 'dirty', 'Z'],
        ['net/minecraft/client/renderer/ShaderInstance', 'f_173329_', 'samplerNames', 'Ljava/util/List;'],
        ['net/minecraft/client/renderer/ShaderInstance', 'f_173330_', 'samplerLocations', 'Ljava/util/List;'],
        ['net/minecraft/client/renderer/ShaderInstance', 'f_173331_', 'uniforms', 'Ljava/util/List;'],
    ];
    fieldRefMap['icyllis/modernui/mc/mixin/MixinWindow'] = [
        ['com/mojang/blaze3d/platform/Window', 'f_85365_', 'guiScale', 'D'],
    ];
    fieldRefMap['icyllis/modernui/mc/text/mixin/MixinEditBox'] = [
        ['net/minecraft/network/chat/Style', 'f_131099_', 'EMPTY', 'Lnet/minecraft/network/chat/Style;'],
        ['net/minecraft/client/gui/components/EditBox', 'f_169004_', 'CURSOR_APPEND_CHARACTER', 'Ljava/lang/String;'],
        ['icyllis/modernui/mc/text/mixin/MixinEditBox', 'f_93618_', 'width', 'I'],
        ['icyllis/modernui/mc/text/mixin/MixinEditBox', 'f_93619_', 'height', 'I'],
        ['net/minecraft/client/gui/components/EditBox', 'f_94088_', 'suggestion', 'Ljava/lang/String;'],
        ['net/minecraft/client/gui/components/EditBox', 'f_94091_', 'formatter', 'Ljava/util/function/BiFunction;'],
        ['net/minecraft/client/gui/components/EditBox', 'f_94093_', 'value', 'Ljava/lang/String;'],
        ['net/minecraft/client/gui/components/EditBox', 'f_94095_', 'frame', 'I'],
        ['net/minecraft/client/gui/components/EditBox', 'f_94096_', 'bordered', 'Z'],
        ['net/minecraft/client/gui/components/EditBox', 'f_94098_', 'isEditable', 'Z'],
        ['net/minecraft/client/gui/components/EditBox', 'f_94100_', 'displayPos', 'I'],
        ['net/minecraft/client/gui/components/EditBox', 'f_94101_', 'cursorPos', 'I'],
        ['net/minecraft/client/gui/components/EditBox', 'f_94102_', 'highlightPos', 'I'],
        ['net/minecraft/client/gui/components/EditBox', 'f_94103_', 'textColor', 'I'],
        ['net/minecraft/client/gui/components/EditBox', 'f_94104_', 'textColorUneditable', 'I'],
    ];
    fieldRefMap['icyllis/modernui/mc/text/mixin/MixinLevelRenderer'] = [
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109464_', 'renderBuffers', 'Lnet/minecraft/client/renderer/RenderBuffers;'],
    ];
    fieldRefMap['io/github/lounode/ae2cs/mixin/CableBusBlockEntityMixin'] = [
        ['io/github/lounode/ae2cs/mixin/CableBusBlockEntityMixin', 'f_58857_', 'level', 'Lnet/minecraft/world/level/Level;'],
        ['io/github/lounode/ae2cs/mixin/CableBusBlockEntityMixin', 'f_58858_', 'worldPosition', 'Lnet/minecraft/core/BlockPos;'],
    ];
    fieldRefMap['io/github/lounode/ae2cs/mixin/GrowthAcceleratorBlockEntityMixin'] = [
        ['io/github/lounode/ae2cs/mixin/GrowthAcceleratorBlockEntityMixin', 'f_58857_', 'level', 'Lnet/minecraft/world/level/Level;'],
        ['io/github/lounode/ae2cs/mixin/GrowthAcceleratorBlockEntityMixin', 'f_58858_', 'worldPosition', 'Lnet/minecraft/core/BlockPos;'],
    ];
    fieldRefMap['io/github/lounode/eventwrapper/mixin/ItemCooldownEventPoster'] = [
        ['net/minecraft/world/item/ServerItemCooldowns', 'f_43065_', 'player', 'Lnet/minecraft/server/level/ServerPlayer;'],
    ];
    fieldRefMap['io/github/lounode/extrabotany/mixin/ElementiumHammerFilter'] = [
        ['net/minecraft/world/level/storage/loot/parameters/LootContextParams', 'f_81455_', 'THIS_ENTITY', 'Lnet/minecraft/world/level/storage/loot/parameters/LootContextParam;'],
        ['net/minecraft/world/level/storage/loot/parameters/LootContextParams', 'f_81463_', 'TOOL', 'Lnet/minecraft/world/level/storage/loot/parameters/LootContextParam;'],
    ];
    fieldRefMap['io/github/lounode/extrabotany/mixin/ItemCustomEnchantableEnchantTableSupporter'] = [
        ['net/minecraft/core/registries/BuiltInRegistries', 'f_256876_', 'ENCHANTMENT', 'Lnet/minecraft/core/Registry;'],
        ['net/minecraft/world/item/Items', 'f_42517_', 'BOOK', 'Lnet/minecraft/world/item/Item;'],
    ];
    fieldRefMap['io/github/lounode/extrabotany/mixin/botania/WandOfTheForestExtension'] = [
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
    ];
    fieldRefMap['io/github/lounode/extrabotany/mixin/client/HUDHandlerMixin'] = [
        ['net/minecraft/client/Minecraft', 'f_91062_', 'font', 'Lnet/minecraft/client/gui/Font;'],
        ['net/minecraft/client/Minecraft', 'f_91074_', 'player', 'Lnet/minecraft/client/player/LocalPlayer;'],
    ];
    fieldRefMap['io/github/projectet/ae2things/mixin/CursedInternalSlotMixin'] = [
        ['net/minecraft/world/inventory/AbstractContainerMenu', 'f_38839_', 'slots', 'Lnet/minecraft/core/NonNullList;'],
    ];
    fieldRefMap['malte0811/ferritecore/mixin/blockstatecache/BlockStateCacheMixin'] = [
        ['net/minecraft/world/level/block/state/BlockBehaviour$BlockStateBase$Cache', 'f_60842_', 'collisionShape', 'Lnet/minecraft/world/phys/shapes/VoxelShape;'],
        ['net/minecraft/world/level/block/state/BlockBehaviour$BlockStateBase$Cache', 'f_60849_', 'occlusionShapes', '[Lnet/minecraft/world/phys/shapes/VoxelShape;'],
        ['net/minecraft/world/level/block/state/BlockBehaviour$BlockStateBase$Cache', 'f_60850_', 'faceSturdy', '[Z'],
    ];
    fieldRefMap['malte0811/ferritecore/mixin/fastmap/FastMapStateHolderMixin'] = [
        ['net/minecraft/world/level/block/state/StateHolder', 'f_61111_', 'values', 'Lcom/google/common/collect/ImmutableMap;'],
        ['net/minecraft/world/level/block/state/StateHolder', 'f_61114_', 'neighbours', 'Lcom/google/common/collect/Table;'],
    ];
    fieldRefMap['malte0811/ferritecore/mixin/modelsides/SimpleBakedModelMixin'] = [
        ['net/minecraft/client/resources/model/SimpleBakedModel', 'f_119480_', 'unculledFaces', 'Ljava/util/List;'],
        ['net/minecraft/client/resources/model/SimpleBakedModel', 'f_119481_', 'culledFaces', 'Ljava/util/Map;'],
    ];
    fieldRefMap['malte0811/ferritecore/mixin/mrl/ModelResourceLocationMixin'] = [
        ['net/minecraft/client/resources/model/ModelResourceLocation', 'f_119435_', 'variant', 'Ljava/lang/String;'],
    ];
    fieldRefMap['malte0811/ferritecore/mixin/predicates/AndConditionMixin'] = [
        ['net/minecraft/client/renderer/block/model/multipart/AndCondition', 'f_111908_', 'conditions', 'Ljava/lang/Iterable;'],
    ];
    fieldRefMap['malte0811/ferritecore/mixin/predicates/KeyValueConditionMixin'] = [
        ['net/minecraft/client/renderer/block/model/multipart/KeyValueCondition', 'f_111934_', 'PIPE_SPLITTER', 'Lcom/google/common/base/Splitter;'],
        ['net/minecraft/client/renderer/block/model/multipart/KeyValueCondition', 'f_111935_', 'key', 'Ljava/lang/String;'],
        ['net/minecraft/client/renderer/block/model/multipart/KeyValueCondition', 'f_111936_', 'value', 'Ljava/lang/String;'],
    ];
    fieldRefMap['malte0811/ferritecore/mixin/predicates/OrConditionMixin'] = [
        ['net/minecraft/client/renderer/block/model/multipart/OrCondition', 'f_112001_', 'conditions', 'Ljava/lang/Iterable;'],
    ];
    fieldRefMap['malte0811/ferritecore/mixin/threaddetec/PalettedContainerMixin'] = [
        ['net/minecraft/world/level/chunk/PalettedContainer', 'f_199441_', 'threadingDetector', 'Lnet/minecraft/util/ThreadingDetector;'],
    ];
    fieldRefMap['me/flashyreese/mods/sodiumextra/mixin/instant_sneak/MixinCamera'] = [
        ['net/minecraft/client/Camera', 'f_90551_', 'entity', 'Lnet/minecraft/world/entity/Entity;'],
        ['net/minecraft/client/Camera', 'f_90562_', 'eyeHeight', 'F'],
    ];
    fieldRefMap['me/flashyreese/mods/sodiumextra/mixin/optimizations/beacon_beam_rendering/MixinBeaconBlockEntityRenderer'] = [
        ['net/minecraft/client/renderer/texture/OverlayTexture', 'f_118083_', 'NO_OVERLAY', 'I'],
        ['com/mojang/math/Axis', 'f_252436_', 'YP', 'Lcom/mojang/math/Axis;'],
        ['net/minecraft/client/Minecraft', 'f_91060_', 'levelRenderer', 'Lnet/minecraft/client/renderer/LevelRenderer;'],
    ];
    fieldRefMap['me/flashyreese/mods/sodiumextra/mixin/optimizations/beacon_beam_rendering/MixinVertexSerializerRegistryImpl'] = [
        ['com/mojang/blaze3d/vertex/DefaultVertexFormat', 'f_85812_', 'NEW_ENTITY', 'Lcom/mojang/blaze3d/vertex/VertexFormat;'],
    ];
    fieldRefMap['me/flashyreese/mods/sodiumextra/mixin/optimizations/draw_helpers/MixinDrawContext'] = [
        ['net/minecraft/client/gui/GuiGraphics', 'f_279612_', 'pose', 'Lcom/mojang/blaze3d/vertex/PoseStack;'],
        ['net/minecraft/client/gui/GuiGraphics', 'f_279627_', 'bufferSource', 'Lnet/minecraft/client/renderer/MultiBufferSource$BufferSource;'],
        ['com/mojang/blaze3d/vertex/DefaultVertexFormat', 'f_85817_', 'POSITION_TEX', 'Lcom/mojang/blaze3d/vertex/VertexFormat;'],
        ['com/mojang/blaze3d/vertex/DefaultVertexFormat', 'f_85818_', 'POSITION_COLOR_TEX', 'Lcom/mojang/blaze3d/vertex/VertexFormat;'],
    ];
    fieldRefMap['me/flashyreese/mods/sodiumextra/mixin/optimizations/fast_weather/MixinWorldRenderer'] = [
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109451_', 'rainSizeX', '[F'],
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109452_', 'rainSizeZ', '[F'],
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109459_', 'RAIN_LOCATION', 'Lnet/minecraft/resources/ResourceLocation;'],
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109460_', 'SNOW_LOCATION', 'Lnet/minecraft/resources/ResourceLocation;'],
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109461_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109477_', 'ticks', 'I'],
        ['com/mojang/blaze3d/vertex/DefaultVertexFormat', 'f_85813_', 'PARTICLE', 'Lcom/mojang/blaze3d/vertex/VertexFormat;'],
        ['net/minecraft/client/Minecraft', 'f_91073_', 'level', 'Lnet/minecraft/client/multiplayer/ClientLevel;'],
    ];
    fieldRefMap['me/flashyreese/mods/sodiumextra/mixin/particle/MixinParticleManager'] = [
        ['net/minecraft/core/registries/BuiltInRegistries', 'f_257034_', 'PARTICLE_TYPE', 'Lnet/minecraft/core/Registry;'],
    ];
    fieldRefMap['me/flashyreese/mods/sodiumextra/mixin/reduce_resolution_on_mac/MixinWindow'] = [
        ['com/mojang/blaze3d/platform/Window', 'f_85361_', 'framebufferWidth', 'I'],
        ['com/mojang/blaze3d/platform/Window', 'f_85362_', 'framebufferHeight', 'I'],
        ['net/minecraft/client/Minecraft', 'f_91002_', 'ON_OSX', 'Z'],
    ];
    fieldRefMap['me/flashyreese/mods/sodiumextra/mixin/sodium/fog/MixinOcclusionCuller'] = [
        ['net/minecraft/client/Minecraft', 'f_91073_', 'level', 'Lnet/minecraft/client/multiplayer/ClientLevel;'],
    ];
    fieldRefMap['me/flashyreese/mods/sodiumextra/mixin/sodium/scrollable_page/MixinSodiumOptionsGUI'] = [
        ['me/flashyreese/mods/sodiumextra/mixin/sodium/scrollable_page/MixinSodiumOptionsGUI', 'f_96544_', 'height', 'I'],
    ];
    fieldRefMap['me/flashyreese/mods/sodiumextra/mixin/sun_moon/MixinWorldRenderer'] = [
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109454_', 'MOON_LOCATION', 'Lnet/minecraft/resources/ResourceLocation;'],
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109455_', 'SUN_LOCATION', 'Lnet/minecraft/resources/ResourceLocation;'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/core/MinecraftClientMixin'] = [
        ['net/minecraft/client/Minecraft', 'f_91036_', 'resourceManager', 'Lnet/minecraft/server/packs/resources/ReloadableResourceManager;'],
        ['net/minecraft/client/Minecraft', 'f_91080_', 'screen', 'Lnet/minecraft/client/gui/screens/Screen;'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/core/model/colors/BlockColorsMixin'] = [
        ['net/minecraft/core/registries/BuiltInRegistries', 'f_256975_', 'BLOCK', 'Lnet/minecraft/core/DefaultedRegistry;'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/core/model/quad/BakedQuadMixin'] = [
        ['net/minecraft/client/renderer/block/model/BakedQuad', 'f_111292_', 'vertices', '[I'],
        ['net/minecraft/client/renderer/block/model/BakedQuad', 'f_111293_', 'tintIndex', 'I'],
        ['net/minecraft/client/renderer/block/model/BakedQuad', 'f_111294_', 'direction', 'Lnet/minecraft/core/Direction;'],
        ['net/minecraft/client/renderer/block/model/BakedQuad', 'f_111295_', 'sprite', 'Lnet/minecraft/client/renderer/texture/TextureAtlasSprite;'],
        ['net/minecraft/client/renderer/block/model/BakedQuad', 'f_111296_', 'shade', 'Z'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/core/render/MatrixStackMixin'] = [
        ['com/mojang/blaze3d/vertex/PoseStack', 'f_85834_', 'poseStack', 'Ljava/util/Deque;'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/core/render/frustum/FrustumMixin'] = [
        ['net/minecraft/client/renderer/culling/Frustum', 'f_112996_', 'camX', 'D'],
        ['net/minecraft/client/renderer/culling/Frustum', 'f_112997_', 'camY', 'D'],
        ['net/minecraft/client/renderer/culling/Frustum', 'f_112998_', 'camZ', 'D'],
        ['net/minecraft/client/renderer/culling/Frustum', 'f_252531_', 'intersection', 'Lorg/joml/FrustumIntersection;'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/core/render/immediate/consumer/BufferBuilderMixin'] = [
        ['com/mojang/blaze3d/vertex/BufferBuilder', 'f_85648_', 'buffer', 'Ljava/nio/ByteBuffer;'],
        ['com/mojang/blaze3d/vertex/BufferBuilder', 'f_85652_', 'nextElementByte', 'I'],
        ['com/mojang/blaze3d/vertex/BufferBuilder', 'f_85654_', 'vertices', 'I'],
        ['com/mojang/blaze3d/vertex/BufferBuilder', 'f_85657_', 'mode', 'Lcom/mojang/blaze3d/vertex/VertexFormat$Mode;'],
        ['me/jellysquid/mods/sodium/mixin/core/render/immediate/consumer/BufferBuilderMixin', 'f_85824_', 'defaultColorSet', 'Z'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/core/render/immediate/consumer/OutlineVertexConsumerMixin'] = [
        ['net/minecraft/client/renderer/OutlineBufferSource$EntityOutlineGenerator', 'f_109936_', 'delegate', 'Lcom/mojang/blaze3d/vertex/VertexConsumer;'],
        ['me/jellysquid/mods/sodium/mixin/core/render/immediate/consumer/OutlineVertexConsumerMixin', 'f_85825_', 'defaultR', 'I'],
        ['me/jellysquid/mods/sodium/mixin/core/render/immediate/consumer/OutlineVertexConsumerMixin', 'f_85826_', 'defaultG', 'I'],
        ['me/jellysquid/mods/sodium/mixin/core/render/immediate/consumer/OutlineVertexConsumerMixin', 'f_85827_', 'defaultB', 'I'],
        ['me/jellysquid/mods/sodium/mixin/core/render/immediate/consumer/OutlineVertexConsumerMixin', 'f_85828_', 'defaultA', 'I'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/core/render/immediate/consumer/OverlayVertexConsumerMixin'] = [
        ['com/mojang/blaze3d/vertex/SheetedDecalTextureGenerator', 'f_256811_', 'textureScale', 'F'],
        ['com/mojang/blaze3d/vertex/SheetedDecalTextureGenerator', 'f_85867_', 'delegate', 'Lcom/mojang/blaze3d/vertex/VertexConsumer;'],
        ['com/mojang/blaze3d/vertex/SheetedDecalTextureGenerator', 'f_85868_', 'cameraInversePose', 'Lorg/joml/Matrix4f;'],
        ['com/mojang/blaze3d/vertex/SheetedDecalTextureGenerator', 'f_85869_', 'normalInversePose', 'Lorg/joml/Matrix3f;'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/core/render/immediate/consumer/SpriteTexturedVertexConsumerMixin'] = [
        ['net/minecraft/client/renderer/SpriteCoordinateExpander', 'f_110795_', 'delegate', 'Lcom/mojang/blaze3d/vertex/VertexConsumer;'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/core/render/immediate/consumer/VertexConsumersMixin$DualMixin'] = [
        ['com/mojang/blaze3d/vertex/VertexMultiConsumer$Double', 'f_86171_', 'first', 'Lcom/mojang/blaze3d/vertex/VertexConsumer;'],
        ['com/mojang/blaze3d/vertex/VertexMultiConsumer$Double', 'f_86172_', 'second', 'Lcom/mojang/blaze3d/vertex/VertexConsumer;'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/core/render/immediate/consumer/VertexConsumersMixin$UnionMixin'] = [
        ['com/mojang/blaze3d/vertex/VertexMultiConsumer$Multiple', 'f_167071_', 'delegates', '[Lcom/mojang/blaze3d/vertex/VertexConsumer;'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/core/render/world/WorldRendererMixin'] = [
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109409_', 'destructionProgress', 'Lit/unimi/dsi/fastutil/longs/Long2ObjectMap;'],
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109461_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109464_', 'renderBuffers', 'Lnet/minecraft/client/renderer/RenderBuffers;'],
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109477_', 'ticks', 'I'],
        ['net/minecraft/client/renderer/LevelRenderer', 'f_194299_', 'needsFrustumUpdate', 'Ljava/util/concurrent/atomic/AtomicBoolean;'],
        ['net/minecraft/client/renderer/LevelRenderer', 'f_194300_', 'needsFullRenderChunkUpdate', 'Z'],
        ['net/minecraft/client/Minecraft', 'f_91063_', 'gameRenderer', 'Lnet/minecraft/client/renderer/GameRenderer;'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/core/world/chunk/EmptyPaletteStorageMixin'] = [
        ['net/minecraft/util/ZeroBitStorage', 'f_184788_', 'size', 'I'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/core/world/chunk/PackedIntegerArrayMixin'] = [
        ['net/minecraft/util/SimpleBitStorage', 'f_184707_', 'data', '[J'],
        ['net/minecraft/util/SimpleBitStorage', 'f_184708_', 'bits', 'I'],
        ['net/minecraft/util/SimpleBitStorage', 'f_184709_', 'mask', 'J'],
        ['net/minecraft/util/SimpleBitStorage', 'f_184710_', 'size', 'I'],
        ['net/minecraft/util/SimpleBitStorage', 'f_184711_', 'valuesPerLong', 'I'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/core/world/chunk/PalettedContainerMixin'] = [
        ['net/minecraft/world/level/chunk/PalettedContainer', 'f_188032_', 'data', 'Lnet/minecraft/world/level/chunk/PalettedContainer$Data;'],
        ['net/minecraft/world/level/chunk/PalettedContainer', 'f_188033_', 'strategy', 'Lnet/minecraft/world/level/chunk/PalettedContainer$Strategy;'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/core/world/map/ClientPlayNetworkHandlerMixin'] = [
        ['net/minecraft/client/multiplayer/ClientPacketListener', 'f_104889_', 'level', 'Lnet/minecraft/client/multiplayer/ClientLevel;'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/core/world/map/ClientWorldMixin'] = [
        ['net/minecraft/world/level/ChunkPos', 'f_45578_', 'x', 'I'],
        ['net/minecraft/world/level/ChunkPos', 'f_45579_', 'z', 'I'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/features/gui/hooks/console/GameRendererMixin'] = [
        ['net/minecraft/client/renderer/GameRenderer', 'f_109059_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
        ['net/minecraft/client/renderer/GameRenderer', 'f_109064_', 'renderBuffers', 'Lnet/minecraft/client/renderer/RenderBuffers;'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/features/gui/screen/LevelLoadingScreenMixin'] = [
        ['com/mojang/blaze3d/vertex/DefaultVertexFormat', 'f_85815_', 'POSITION_COLOR', 'Lcom/mojang/blaze3d/vertex/VertexFormat;'],
        ['net/minecraft/client/gui/screens/LevelLoadingScreen', 'f_96140_', 'COLORS', 'Lit/unimi/dsi/fastutil/objects/Object2IntMap;'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/features/model/BlockElementMixin'] = [
        ['net/minecraft/client/renderer/block/model/BlockElement', 'f_111308_', 'from', 'Lorg/joml/Vector3f;'],
        ['net/minecraft/client/renderer/block/model/BlockElement', 'f_111309_', 'to', 'Lorg/joml/Vector3f;'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/features/model/MultipartBakedModelMixin'] = [
        ['net/minecraft/client/resources/model/MultiPartBakedModel', 'f_119459_', 'selectors', 'Ljava/util/List;'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/features/model/WeightedBakedModelMixin'] = [
        ['net/minecraft/client/resources/model/WeightedBakedModel', 'f_119540_', 'totalWeight', 'I'],
        ['net/minecraft/client/resources/model/WeightedBakedModel', 'f_119541_', 'list', 'Ljava/util/List;'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/features/options/render_layers/LeavesBlockMixin'] = [
        ['net/minecraft/world/level/block/Blocks', 'f_50016_', 'AIR', 'Lnet/minecraft/world/level/block/Block;'],
        ['net/minecraft/client/Minecraft', 'f_91066_', 'options', 'Lnet/minecraft/client/Options;'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/features/options/weather/WorldRendererMixin'] = [
        ['net/minecraft/client/Minecraft', 'f_91066_', 'options', 'Lnet/minecraft/client/Options;'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/features/render/entity/fast_render/CuboidMixin'] = [
        ['net/minecraft/client/model/geom/ModelPart$Cube', 'f_104335_', 'minX', 'F'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/features/render/entity/fast_render/ModelPartMixin'] = [
        ['net/minecraft/client/model/geom/ModelPart', 'f_104200_', 'x', 'F'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_104201_', 'y', 'F'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_104202_', 'z', 'F'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_104203_', 'xRot', 'F'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_104204_', 'yRot', 'F'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_104205_', 'zRot', 'F'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_104207_', 'visible', 'Z'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_104212_', 'cubes', 'Ljava/util/List;'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_233553_', 'xScale', 'F'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_233554_', 'yScale', 'F'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_233555_', 'zScale', 'F'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_233556_', 'skipDraw', 'Z'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/features/render/entity/remove_streams/ModelPartMixin'] = [
        ['net/minecraft/client/model/geom/ModelPart', 'f_104213_', 'children', 'Ljava/util/Map;'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/features/render/entity/shadows/EntityRenderDispatcherMixin'] = [
        ['net/minecraft/client/renderer/texture/OverlayTexture', 'f_118083_', 'NO_OVERLAY', 'I'],
        ['net/minecraft/world/phys/AABB', 'f_82288_', 'minX', 'D'],
        ['net/minecraft/world/phys/AABB', 'f_82289_', 'minY', 'D'],
        ['net/minecraft/world/phys/AABB', 'f_82290_', 'minZ', 'D'],
        ['net/minecraft/world/phys/AABB', 'f_82291_', 'maxX', 'D'],
        ['net/minecraft/world/phys/AABB', 'f_82293_', 'maxZ', 'D'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/features/render/gui/font/GlyphRendererMixin'] = [
        ['net/minecraft/client/gui/font/glyphs/BakedGlyph', 'f_95201_', 'u0', 'F'],
        ['net/minecraft/client/gui/font/glyphs/BakedGlyph', 'f_95202_', 'u1', 'F'],
        ['net/minecraft/client/gui/font/glyphs/BakedGlyph', 'f_95203_', 'v0', 'F'],
        ['net/minecraft/client/gui/font/glyphs/BakedGlyph', 'f_95204_', 'v1', 'F'],
        ['net/minecraft/client/gui/font/glyphs/BakedGlyph', 'f_95205_', 'left', 'F'],
        ['net/minecraft/client/gui/font/glyphs/BakedGlyph', 'f_95206_', 'right', 'F'],
        ['net/minecraft/client/gui/font/glyphs/BakedGlyph', 'f_95207_', 'up', 'F'],
        ['net/minecraft/client/gui/font/glyphs/BakedGlyph', 'f_95208_', 'down', 'F'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/features/render/immediate/buffer_builder/BufferBuilderMixin'] = [
        ['com/mojang/blaze3d/vertex/BufferBuilder', 'f_85652_', 'nextElementByte', 'I'],
        ['com/mojang/blaze3d/vertex/BufferBuilder', 'f_85655_', 'currentElement', 'Lcom/mojang/blaze3d/vertex/VertexFormatElement;'],
        ['com/mojang/blaze3d/vertex/BufferBuilder', 'f_85656_', 'elementIndex', 'I'],
        ['me/jellysquid/mods/sodium/mixin/features/render/immediate/buffer_builder/BufferBuilderMixin', 'f_85824_', 'defaultColorSet', 'Z'],
        ['me/jellysquid/mods/sodium/mixin/features/render/immediate/buffer_builder/BufferBuilderMixin', 'f_85825_', 'defaultR', 'I'],
        ['me/jellysquid/mods/sodium/mixin/features/render/immediate/buffer_builder/BufferBuilderMixin', 'f_85826_', 'defaultG', 'I'],
        ['me/jellysquid/mods/sodium/mixin/features/render/immediate/buffer_builder/BufferBuilderMixin', 'f_85827_', 'defaultB', 'I'],
        ['me/jellysquid/mods/sodium/mixin/features/render/immediate/buffer_builder/BufferBuilderMixin', 'f_85828_', 'defaultA', 'I'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/features/render/immediate/buffer_builder/VertexFormatMixin'] = [
        ['com/mojang/blaze3d/vertex/VertexFormat', 'f_86012_', 'elements', 'Lcom/google/common/collect/ImmutableList;'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/features/render/immediate/buffer_builder/fast_delegate/BufferSourceMixin'] = [
        ['net/minecraft/client/renderer/MultiBufferSource$BufferSource', 'f_109907_', 'startedBuffers', 'Ljava/util/Set;'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/features/render/immediate/buffer_builder/intrinsics/BufferBuilderMixin'] = [
        ['com/mojang/blaze3d/vertex/BufferBuilder', 'f_85659_', 'fastFormat', 'Z'],
        ['me/jellysquid/mods/sodium/mixin/features/render/immediate/buffer_builder/intrinsics/BufferBuilderMixin', 'f_85824_', 'defaultColorSet', 'Z'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/features/render/immediate/buffer_builder/sorting/BufferBuilderMixin'] = [
        ['com/mojang/blaze3d/vertex/BufferBuilder', 'f_166766_', 'sortingPoints', '[Lorg/joml/Vector3f;'],
        ['com/mojang/blaze3d/vertex/VertexFormat$IndexType', 'f_166924_', 'bytes', 'I'],
        ['com/mojang/blaze3d/vertex/BufferBuilder', 'f_231157_', 'renderedBufferPointer', 'I'],
        ['com/mojang/blaze3d/vertex/BufferBuilder', 'f_276463_', 'sorting', 'Lcom/mojang/blaze3d/vertex/VertexSorting;'],
        ['com/mojang/blaze3d/vertex/BufferBuilder', 'f_85648_', 'buffer', 'Ljava/nio/ByteBuffer;'],
        ['com/mojang/blaze3d/vertex/BufferBuilder', 'f_85652_', 'nextElementByte', 'I'],
        ['com/mojang/blaze3d/vertex/BufferBuilder', 'f_85654_', 'vertices', 'I'],
        ['com/mojang/blaze3d/vertex/BufferBuilder', 'f_85658_', 'format', 'Lcom/mojang/blaze3d/vertex/VertexFormat;'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/features/render/model/RenderLayersMixin'] = [
        ['net/minecraft/client/renderer/ItemBlockRenderTypes', 'f_109275_', 'TYPE_BY_BLOCK', 'Ljava/util/Map;'],
        ['net/minecraft/client/renderer/ItemBlockRenderTypes', 'f_109276_', 'TYPE_BY_FLUID', 'Ljava/util/Map;'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/features/render/model/item/ItemRendererMixin'] = [
        ['net/minecraft/client/renderer/entity/ItemRenderer', 'f_115097_', 'itemColors', 'Lnet/minecraft/client/color/item/ItemColors;'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/features/render/particle/BillboardParticleMixin'] = [
        ['me/jellysquid/mods/sodium/mixin/features/render/particle/BillboardParticleMixin', 'f_107204_', 'oRoll', 'F'],
        ['me/jellysquid/mods/sodium/mixin/features/render/particle/BillboardParticleMixin', 'f_107209_', 'xo', 'D'],
        ['me/jellysquid/mods/sodium/mixin/features/render/particle/BillboardParticleMixin', 'f_107210_', 'yo', 'D'],
        ['me/jellysquid/mods/sodium/mixin/features/render/particle/BillboardParticleMixin', 'f_107211_', 'zo', 'D'],
        ['me/jellysquid/mods/sodium/mixin/features/render/particle/BillboardParticleMixin', 'f_107212_', 'x', 'D'],
        ['me/jellysquid/mods/sodium/mixin/features/render/particle/BillboardParticleMixin', 'f_107213_', 'y', 'D'],
        ['me/jellysquid/mods/sodium/mixin/features/render/particle/BillboardParticleMixin', 'f_107214_', 'z', 'D'],
        ['me/jellysquid/mods/sodium/mixin/features/render/particle/BillboardParticleMixin', 'f_107227_', 'rCol', 'F'],
        ['me/jellysquid/mods/sodium/mixin/features/render/particle/BillboardParticleMixin', 'f_107228_', 'gCol', 'F'],
        ['me/jellysquid/mods/sodium/mixin/features/render/particle/BillboardParticleMixin', 'f_107229_', 'bCol', 'F'],
        ['me/jellysquid/mods/sodium/mixin/features/render/particle/BillboardParticleMixin', 'f_107230_', 'alpha', 'F'],
        ['me/jellysquid/mods/sodium/mixin/features/render/particle/BillboardParticleMixin', 'f_107231_', 'roll', 'F'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/features/render/world/ClientLevelMixin'] = [
        ['net/minecraft/core/particles/ParticleTypes', 'f_194652_', 'BLOCK_MARKER', 'Lnet/minecraft/core/particles/ParticleType;'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/features/render/world/clouds/WorldRendererMixin'] = [
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109461_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109465_', 'level', 'Lnet/minecraft/client/multiplayer/ClientLevel;'],
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109477_', 'ticks', 'I'],
        ['net/minecraft/client/Minecraft', 'f_91074_', 'player', 'Lnet/minecraft/client/player/LocalPlayer;'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/features/shader/uniform/ShaderProgramMixin'] = [
        ['net/minecraft/client/renderer/ShaderInstance', 'f_173299_', 'programId', 'I'],
        ['net/minecraft/client/renderer/ShaderInstance', 'f_173329_', 'samplerNames', 'Ljava/util/List;'],
        ['net/minecraft/client/renderer/ShaderInstance', 'f_173331_', 'uniforms', 'Ljava/util/List;'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/features/textures/animations/tracking/SpriteBillboardParticleMixin'] = [
        ['net/minecraft/client/particle/TextureSheetParticle', 'f_108321_', 'sprite', 'Lnet/minecraft/client/renderer/texture/TextureAtlasSprite;'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/features/textures/animations/tracking/SpriteContentsAnimatorImplMixin'] = [
        ['net/minecraft/client/renderer/texture/SpriteContents$Ticker', 'f_243921_', 'animationInfo', 'Lnet/minecraft/client/renderer/texture/SpriteContents$AnimatedTexture;'],
        ['net/minecraft/client/renderer/texture/SpriteContents$Ticker', 'f_244511_', 'subFrame', 'I'],
        ['net/minecraft/client/renderer/texture/SpriteContents$Ticker', 'f_244631_', 'frame', 'I'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/features/textures/animations/tracking/SpriteContentsMixin'] = [
        ['net/minecraft/client/renderer/texture/SpriteContents', 'f_244575_', 'animatedTexture', 'Lnet/minecraft/client/renderer/texture/SpriteContents$AnimatedTexture;'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/features/textures/animations/tracking/SpriteMixin'] = [
        ['net/minecraft/client/renderer/texture/TextureAtlasSprite', 'f_244165_', 'contents', 'Lnet/minecraft/client/renderer/texture/SpriteContents;'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/features/textures/animations/upload/SpriteContentsInterpolationMixin'] = [
        ['net/minecraft/client/renderer/texture/SpriteContents$InterpolationData', 'f_244527_', 'activeFrame', '[Lcom/mojang/blaze3d/platform/NativeImage;'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/features/textures/mipmaps/SpriteContentsMixin'] = [
        ['net/minecraft/client/renderer/texture/SpriteContents', 'f_243877_', 'name', 'Lnet/minecraft/resources/ResourceLocation;'],
        ['net/minecraft/client/renderer/texture/SpriteContents', 'f_243904_', 'originalImage', 'Lcom/mojang/blaze3d/platform/NativeImage;'],
        ['net/minecraft/client/Minecraft', 'f_91066_', 'options', 'Lnet/minecraft/client/Options;'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/features/world/biome/BiomeMixin'] = [
        ['net/minecraft/world/level/biome/Biome', 'f_47437_', 'climateSettings', 'Lnet/minecraft/world/level/biome/Biome$ClimateSettings;'],
        ['net/minecraft/world/level/biome/Biome', 'f_47443_', 'specialEffects', 'Lnet/minecraft/world/level/biome/BiomeSpecialEffects;'],
    ];
    fieldRefMap['me/jellysquid/mods/sodium/mixin/workarounds/context_creation/WindowMixin'] = [
        ['com/mojang/blaze3d/platform/Window', 'f_85345_', 'LOGGER', 'Lorg/slf4j/Logger;'],
    ];
    fieldRefMap['me/srrapero720/chloride/mixins/impl/BorderlessMixin$KeyboardHandlerMixin'] = [
        ['net/minecraft/client/KeyboardHandler', 'f_90867_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
    ];
    fieldRefMap['me/srrapero720/chloride/mixins/impl/CloudHeightMixin'] = [
        ['net/minecraft/client/renderer/DimensionSpecialEffects', 'f_108859_', 'cloudLevel', 'F'],
    ];
    fieldRefMap['me/srrapero720/chloride/mixins/impl/EntityDistanceCullingMixin$EntityTypeMixin'] = [
        ['net/minecraft/core/registries/BuiltInRegistries', 'f_256780_', 'ENTITY_TYPE', 'Lnet/minecraft/core/DefaultedRegistry;'],
    ];
    fieldRefMap['me/srrapero720/chloride/mixins/impl/EntityDistanceCullingMixin$TileDispatcherMixin'] = [
        ['net/minecraft/client/renderer/blockentity/BlockEntityRenderDispatcher', 'f_112249_', 'camera', 'Lnet/minecraft/client/Camera;'],
    ];
    fieldRefMap['me/srrapero720/chloride/mixins/impl/FogAndBandMixin'] = [
        ['net/minecraft/client/renderer/FogRenderer$FogData', 'f_234200_', 'start', 'F'],
        ['net/minecraft/client/renderer/FogRenderer$FogData', 'f_234201_', 'end', 'F'],
        ['net/minecraft/client/renderer/FogRenderer$FogData', 'f_234202_', 'shape', 'Lcom/mojang/blaze3d/shaders/FogShape;'],
        ['net/minecraft/world/level/Level', 'f_46428_', 'OVERWORLD', 'Lnet/minecraft/resources/ResourceKey;'],
        ['net/minecraft/world/level/Level', 'f_46429_', 'NETHER', 'Lnet/minecraft/resources/ResourceKey;'],
        ['net/minecraft/world/level/Level', 'f_46430_', 'END', 'Lnet/minecraft/resources/ResourceKey;'],
        ['net/minecraft/client/Minecraft', 'f_91063_', 'gameRenderer', 'Lnet/minecraft/client/renderer/GameRenderer;'],
        ['net/minecraft/client/Minecraft', 'f_91073_', 'level', 'Lnet/minecraft/client/multiplayer/ClientLevel;'],
    ];
    fieldRefMap['me/srrapero720/chloride/mixins/impl/FontShadowMixin$StringRenderOutputMixin'] = [
        ['net/minecraft/client/gui/Font$StringRenderOutput', 'f_92939_', 'dropShadow', 'Z'],
    ];
    fieldRefMap['me/srrapero720/chloride/mixins/impl/OverlayMixin'] = [
        ['net/minecraft/client/Minecraft', 'f_167846_', 'metricsRecorder', 'Lnet/minecraft/util/profiling/metrics/profiling/MetricsRecorder;'],
        ['net/minecraft/client/Minecraft', 'f_231341_', 'gpuUtilization', 'D'],
        ['net/minecraft/client/Minecraft', 'f_91021_', 'fps', 'I'],
        ['net/minecraft/client/Minecraft', 'f_91066_', 'options', 'Lnet/minecraft/client/Options;'],
        ['net/minecraft/client/Minecraft', 'f_91073_', 'level', 'Lnet/minecraft/client/multiplayer/ClientLevel;'],
        ['net/minecraft/client/Options', 'f_92063_', 'renderDebug', 'Z'],
    ];
    fieldRefMap['me/srrapero720/chloride/mixins/impl/ParticlesMixins$FireworkStarterMixin'] = [
        ['net/minecraft/core/particles/ParticleTypes', 'f_123815_', 'FIREWORK', 'Lnet/minecraft/core/particles/SimpleParticleType;'],
        ['net/minecraft/core/registries/BuiltInRegistries', 'f_257034_', 'PARTICLE_TYPE', 'Lnet/minecraft/core/Registry;'],
    ];
    fieldRefMap['me/srrapero720/chloride/mixins/impl/ParticlesMixins$ParticleTypeMixin'] = [
        ['net/minecraft/core/registries/BuiltInRegistries', 'f_257034_', 'PARTICLE_TYPE', 'Lnet/minecraft/core/Registry;'],
    ];
    fieldRefMap['me/srrapero720/chloride/mixins/impl/QuickLanguageReloadMixin'] = [
        ['me/srrapero720/chloride/mixins/impl/QuickLanguageReloadMixin', 'f_96541_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
    ];
    fieldRefMap['me/srrapero720/chloride/mixins/impl/darkness/DynamicTextureMixin'] = [
        ['net/minecraft/client/renderer/texture/DynamicTexture', 'f_117977_', 'pixels', 'Lcom/mojang/blaze3d/platform/NativeImage;'],
    ];
    fieldRefMap['me/srrapero720/chloride/mixins/impl/darkness/GameRendererMixin'] = [
        ['net/minecraft/client/renderer/GameRenderer', 'f_109059_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
        ['net/minecraft/client/renderer/GameRenderer', 'f_109074_', 'lightTexture', 'Lnet/minecraft/client/renderer/LightTexture;'],
        ['net/minecraft/client/renderer/LightTexture', 'f_109873_', 'updateLightTexture', 'Z'],
        ['net/minecraft/client/renderer/LightTexture', 'f_109874_', 'blockLightRedFlicker', 'F'],
    ];
    fieldRefMap['me/srrapero720/chloride/mixins/impl/darkness/LightTextureMixin'] = [
        ['net/minecraft/client/renderer/LightTexture', 'f_109870_', 'lightTexture', 'Lnet/minecraft/client/renderer/texture/DynamicTexture;'],
    ];
    fieldRefMap['me/srrapero720/chloride/mixins/impl/jei_rei_emi/JeiOverlayMixin'] = [
        ['net/minecraft/client/Minecraft', 'f_91062_', 'font', 'Lnet/minecraft/client/gui/Font;'],
        ['net/minecraft/client/Minecraft', 'f_91080_', 'screen', 'Lnet/minecraft/client/gui/screens/Screen;'],
    ];
    fieldRefMap['me/srrapero720/chloride/mixins/impl/jei_rei_emi/ReiOverlayMixin'] = [
        ['net/minecraft/client/Minecraft', 'f_91062_', 'font', 'Lnet/minecraft/client/gui/Font;'],
    ];
    fieldRefMap['net/creeperhost/polylib/mixins/MixinLevelSettings'] = [
        ['net/minecraft/world/level/LevelSettings', 'f_46905_', 'difficulty', 'Lnet/minecraft/world/Difficulty;'],
    ];
    fieldRefMap['net/irisshaders/batchedentityrendering/mixin/MixinBufferBuilder'] = [
        ['com/mojang/blaze3d/vertex/BufferBuilder', 'f_85648_', 'buffer', 'Ljava/nio/ByteBuffer;'],
    ];
    fieldRefMap['net/irisshaders/batchedentityrendering/mixin/MixinBufferBuilder_SegmentRendering'] = [
        ['com/mojang/blaze3d/vertex/BufferBuilder', 'f_85648_', 'buffer', 'Ljava/nio/ByteBuffer;'],
        ['com/mojang/blaze3d/vertex/BufferBuilder', 'f_85652_', 'nextElementByte', 'I'],
        ['com/mojang/blaze3d/vertex/BufferBuilder', 'f_85654_', 'vertices', 'I'],
        ['com/mojang/blaze3d/vertex/BufferBuilder', 'f_85658_', 'format', 'Lcom/mojang/blaze3d/vertex/VertexFormat;'],
    ];
    fieldRefMap['net/irisshaders/batchedentityrendering/mixin/MixinBufferSource'] = [
        ['net/minecraft/client/renderer/MultiBufferSource$BufferSource', 'f_109904_', 'builder', 'Lcom/mojang/blaze3d/vertex/BufferBuilder;'],
        ['net/minecraft/client/renderer/MultiBufferSource$BufferSource', 'f_109905_', 'fixedBuffers', 'Ljava/util/Map;'],
    ];
    fieldRefMap['net/irisshaders/batchedentityrendering/mixin/MixinCompositeRenderType'] = [
        ['net/irisshaders/batchedentityrendering/mixin/MixinCompositeRenderType', 'f_110133_', 'name', 'Ljava/lang/String;'],
    ];
    fieldRefMap['net/irisshaders/batchedentityrendering/mixin/MixinLevelRenderer'] = [
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109464_', 'renderBuffers', 'Lnet/minecraft/client/renderer/RenderBuffers;'],
    ];
    fieldRefMap['net/irisshaders/batchedentityrendering/mixin/MixinLevelRenderer_EntityListSorting'] = [
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109465_', 'level', 'Lnet/minecraft/client/multiplayer/ClientLevel;'],
    ];
    fieldRefMap['net/irisshaders/batchedentityrendering/mixin/MixinRenderBuffers'] = [
        ['net/minecraft/client/renderer/RenderBuffers', 'f_110092_', 'fixedBufferPack', 'Lnet/minecraft/client/renderer/ChunkBufferBuilderPack;'],
        ['net/minecraft/client/renderer/RenderBuffers', 'f_110094_', 'bufferSource', 'Lnet/minecraft/client/renderer/MultiBufferSource$BufferSource;'],
        ['net/minecraft/client/renderer/RenderBuffers', 'f_110095_', 'crumblingBufferSource', 'Lnet/minecraft/client/renderer/MultiBufferSource$BufferSource;'],
    ];
    fieldRefMap['net/irisshaders/batchedentityrendering/mixin/MixinSheets'] = [
        ['net/minecraft/client/renderer/Sheets', 'f_266092_', 'ARMOR_TRIMS_SHEET_TYPE', 'Lnet/minecraft/client/renderer/RenderType;'],
    ];
    fieldRefMap['net/irisshaders/iris/compat/sodium/mixin/clouds/MixinCloudRenderer'] = [
        ['net/minecraft/client/renderer/FogRenderer$FogData', 'f_234200_', 'start', 'F'],
        ['net/minecraft/client/renderer/FogRenderer$FogData', 'f_234201_', 'end', 'F'],
        ['net/minecraft/world/phys/Vec3', 'f_82479_', 'x', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82480_', 'y', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82481_', 'z', 'D'],
        ['net/minecraft/client/Minecraft', 'f_91066_', 'options', 'Lnet/minecraft/client/Options;'],
    ];
    fieldRefMap['net/irisshaders/iris/compat/sodium/mixin/copyEntity/CuboidMixin'] = [
        ['net/minecraft/client/model/geom/ModelPart$Cube', 'f_104335_', 'minX', 'F'],
    ];
    fieldRefMap['net/irisshaders/iris/compat/sodium/mixin/copyEntity/ModelPartMixin'] = [
        ['net/minecraft/client/model/geom/ModelPart', 'f_104200_', 'x', 'F'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_104201_', 'y', 'F'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_104202_', 'z', 'F'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_104203_', 'xRot', 'F'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_104204_', 'yRot', 'F'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_104205_', 'zRot', 'F'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_104207_', 'visible', 'Z'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_104212_', 'cubes', 'Ljava/util/List;'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_104213_', 'children', 'Ljava/util/Map;'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_233553_', 'xScale', 'F'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_233554_', 'yScale', 'F'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_233555_', 'zScale', 'F'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_233556_', 'skipDraw', 'Z'],
    ];
    fieldRefMap['net/irisshaders/iris/compat/sodium/mixin/copyEntity/shadows/EntityRenderDispatcherMixin'] = [
        ['net/minecraft/client/renderer/texture/OverlayTexture', 'f_118083_', 'NO_OVERLAY', 'I'],
        ['net/minecraft/world/phys/AABB', 'f_82288_', 'minX', 'D'],
        ['net/minecraft/world/phys/AABB', 'f_82289_', 'minY', 'D'],
        ['net/minecraft/world/phys/AABB', 'f_82290_', 'minZ', 'D'],
        ['net/minecraft/world/phys/AABB', 'f_82291_', 'maxX', 'D'],
        ['net/minecraft/world/phys/AABB', 'f_82293_', 'maxZ', 'D'],
    ];
    fieldRefMap['net/irisshaders/iris/compat/sodium/mixin/font/MixinGlyphRenderer'] = [
        ['net/minecraft/client/gui/font/glyphs/BakedGlyph', 'f_95201_', 'u0', 'F'],
        ['net/minecraft/client/gui/font/glyphs/BakedGlyph', 'f_95202_', 'u1', 'F'],
        ['net/minecraft/client/gui/font/glyphs/BakedGlyph', 'f_95203_', 'v0', 'F'],
        ['net/minecraft/client/gui/font/glyphs/BakedGlyph', 'f_95204_', 'v1', 'F'],
        ['net/minecraft/client/gui/font/glyphs/BakedGlyph', 'f_95205_', 'left', 'F'],
        ['net/minecraft/client/gui/font/glyphs/BakedGlyph', 'f_95206_', 'right', 'F'],
        ['net/minecraft/client/gui/font/glyphs/BakedGlyph', 'f_95207_', 'up', 'F'],
        ['net/minecraft/client/gui/font/glyphs/BakedGlyph', 'f_95208_', 'down', 'F'],
    ];
    fieldRefMap['net/irisshaders/iris/compat/sodium/mixin/options/MixinSodiumOptionsGUI'] = [
        ['net/irisshaders/iris/compat/sodium/mixin/options/MixinSodiumOptionsGUI', 'f_96541_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
    ];
    fieldRefMap['net/irisshaders/iris/compat/sodium/mixin/shadow_map/frustum/MixinNonCullingFrustum'] = [
        ['net/minecraft/world/phys/Vec3', 'f_82479_', 'x', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82480_', 'y', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82481_', 'z', 'D'],
        ['net/minecraft/client/Minecraft', 'f_91063_', 'gameRenderer', 'Lnet/minecraft/client/renderer/GameRenderer;'],
    ];
    fieldRefMap['net/irisshaders/iris/compat/sodium/mixin/sky/MixinLevelRenderer'] = [
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109461_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
        ['net/minecraft/world/effect/MobEffects', 'f_19610_', 'BLINDNESS', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['net/minecraft/client/Minecraft', 'f_91065_', 'gui', 'Lnet/minecraft/client/gui/Gui;'],
        ['net/minecraft/client/Minecraft', 'f_91073_', 'level', 'Lnet/minecraft/client/multiplayer/ClientLevel;'],
    ];
    fieldRefMap['net/irisshaders/iris/compat/sodium/mixin/vertex_format/MixinVertexSerializerCache'] = [
        ['com/mojang/blaze3d/vertex/DefaultVertexFormat', 'f_85812_', 'NEW_ENTITY', 'Lcom/mojang/blaze3d/vertex/VertexFormat;'],
        ['com/mojang/blaze3d/vertex/DefaultVertexFormat', 'f_85820_', 'POSITION_COLOR_TEX_LIGHTMAP', 'Lcom/mojang/blaze3d/vertex/VertexFormat;'],
    ];
    fieldRefMap['net/irisshaders/iris/compat/sodium/mixin/vertex_format/entity/MixinEntityRenderDispatcher'] = [
        ['net/minecraft/client/renderer/texture/OverlayTexture', 'f_118083_', 'NO_OVERLAY', 'I'],
    ];
    fieldRefMap['net/irisshaders/iris/mixin/MixinBiome'] = [
        ['net/minecraft/world/level/biome/Biome', 'f_47437_', 'climateSettings', 'Lnet/minecraft/world/level/biome/Biome$ClimateSettings;'],
    ];
    fieldRefMap['net/irisshaders/iris/mixin/MixinBooleanState'] = [
        ['com/mojang/blaze3d/platform/GlStateManager$BooleanState', 'f_84585_', 'state', 'I'],
        ['com/mojang/blaze3d/platform/GlStateManager$BooleanState', 'f_84586_', 'enabled', 'Z'],
    ];
    fieldRefMap['net/irisshaders/iris/mixin/MixinClientLanguage'] = [
        ['net/minecraft/client/resources/language/ClientLanguage', 'f_118910_', 'storage', 'Ljava/util/Map;'],
    ];
    fieldRefMap['net/irisshaders/iris/mixin/MixinClientPacketListener'] = [
        ['net/minecraft/client/multiplayer/ClientPacketListener', 'f_104888_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
        ['net/minecraft/client/Minecraft', 'f_91065_', 'gui', 'Lnet/minecraft/client/gui/Gui;'],
        ['net/minecraft/client/Minecraft', 'f_91074_', 'player', 'Lnet/minecraft/client/player/LocalPlayer;'],
    ];
    fieldRefMap['net/irisshaders/iris/mixin/MixinFogRenderer'] = [
        ['net/minecraft/client/renderer/FogRenderer', 'f_109010_', 'fogRed', 'F'],
        ['net/minecraft/client/renderer/FogRenderer', 'f_109011_', 'fogGreen', 'F'],
        ['net/minecraft/client/renderer/FogRenderer', 'f_109012_', 'fogBlue', 'F'],
        ['net/minecraft/tags/BiomeTags', 'f_215802_', 'HAS_CLOSER_WATER_FOG', 'Lnet/minecraft/tags/TagKey;'],
    ];
    fieldRefMap['net/irisshaders/iris/mixin/MixinGameRenderer'] = [
        ['net/minecraft/client/renderer/GameRenderer', 'f_109070_', 'renderHand', 'Z'],
    ];
    fieldRefMap['net/irisshaders/iris/mixin/MixinGameRenderer_NightVisionCompat'] = [
        ['net/minecraft/world/effect/MobEffects', 'f_19611_', 'NIGHT_VISION', 'Lnet/minecraft/world/effect/MobEffect;'],
    ];
    fieldRefMap['net/irisshaders/iris/mixin/MixinLevelRenderer'] = [
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109461_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109464_', 'renderBuffers', 'Lnet/minecraft/client/renderer/RenderBuffers;'],
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109465_', 'level', 'Lnet/minecraft/client/multiplayer/ClientLevel;'],
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109477_', 'ticks', 'I'],
        ['net/minecraft/client/renderer/LevelRenderer', 'f_172938_', 'cullingFrustum', 'Lnet/minecraft/client/renderer/culling/Frustum;'],
        ['com/mojang/math/Axis', 'f_252403_', 'ZP', 'Lcom/mojang/math/Axis;'],
        ['net/minecraft/client/Minecraft', 'f_90980_', 'smartCull', 'Z'],
    ];
    fieldRefMap['net/irisshaders/iris/mixin/MixinLightTexture'] = [
        ['net/minecraft/client/renderer/LightTexture', 'f_109876_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
        ['net/minecraft/client/Minecraft', 'f_91066_', 'options', 'Lnet/minecraft/client/Options;'],
    ];
    fieldRefMap['net/irisshaders/iris/mixin/MixinRenderTarget'] = [
        ['com/mojang/blaze3d/pipeline/RenderTarget', 'f_83924_', 'depthBufferId', 'I'],
    ];
    fieldRefMap['net/irisshaders/iris/mixin/MixinTheEndPortalRenderer'] = [
        ['net/minecraft/client/renderer/blockentity/TheEndPortalRenderer', 'f_112627_', 'END_PORTAL_LOCATION', 'Lnet/minecraft/resources/ResourceLocation;'],
    ];
    fieldRefMap['net/irisshaders/iris/mixin/MixinTweakFarPlane'] = [
        ['net/minecraft/client/renderer/GameRenderer', 'f_109062_', 'renderDistance', 'F'],
    ];
    fieldRefMap['net/irisshaders/iris/mixin/bettermipmaps/MixinTextureAtlasSprite'] = [
        ['net/minecraft/client/renderer/texture/SpriteContents', 'f_243904_', 'originalImage', 'Lcom/mojang/blaze3d/platform/NativeImage;'],
        ['com/mojang/blaze3d/platform/NativeImage', 'f_84964_', 'pixels', 'J'],
    ];
    fieldRefMap['net/irisshaders/iris/mixin/entity_render_context/MixinElytraLayer'] = [
        ['net/minecraft/core/registries/BuiltInRegistries', 'f_257033_', 'ITEM', 'Lnet/minecraft/core/DefaultedRegistry;'],
        ['net/minecraft/world/item/Items', 'f_42741_', 'ELYTRA', 'Lnet/minecraft/world/item/Item;'],
    ];
    fieldRefMap['net/irisshaders/iris/mixin/entity_render_context/MixinEntityRenderDispatcher'] = [
        ['net/minecraft/core/registries/BuiltInRegistries', 'f_256780_', 'ENTITY_TYPE', 'Lnet/minecraft/core/DefaultedRegistry;'],
    ];
    fieldRefMap['net/irisshaders/iris/mixin/entity_render_context/MixinHorseArmorLayer'] = [
        ['net/minecraft/core/registries/BuiltInRegistries', 'f_257033_', 'ITEM', 'Lnet/minecraft/core/DefaultedRegistry;'],
    ];
    fieldRefMap['net/irisshaders/iris/mixin/entity_render_context/MixinHumanoidArmorLayer'] = [
        ['net/minecraft/core/registries/BuiltInRegistries', 'f_257033_', 'ITEM', 'Lnet/minecraft/core/DefaultedRegistry;'],
    ];
    fieldRefMap['net/irisshaders/iris/mixin/entity_render_context/MixinItemRenderer'] = [
        ['net/minecraft/core/registries/BuiltInRegistries', 'f_257033_', 'ITEM', 'Lnet/minecraft/core/DefaultedRegistry;'],
    ];
    fieldRefMap['net/irisshaders/iris/mixin/fabulous/MixinDisableFabulousGraphics'] = [
        ['net/minecraft/client/Minecraft', 'f_91066_', 'options', 'Lnet/minecraft/client/Options;'],
    ];
    fieldRefMap['net/irisshaders/iris/mixin/fantastic/MixinFireworkSparkParticle'] = [
        ['net/minecraft/client/particle/ParticleRenderType', 'f_107430_', 'PARTICLE_SHEET_OPAQUE', 'Lnet/minecraft/client/particle/ParticleRenderType;'],
    ];
    fieldRefMap['net/irisshaders/iris/mixin/fantastic/MixinLevelRenderer'] = [
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109461_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109464_', 'renderBuffers', 'Lnet/minecraft/client/renderer/RenderBuffers;'],
        ['net/minecraft/client/Minecraft', 'f_91061_', 'particleEngine', 'Lnet/minecraft/client/particle/ParticleEngine;'],
    ];
    fieldRefMap['net/irisshaders/iris/mixin/fantastic/MixinParticleEngine'] = [
        ['net/minecraft/client/particle/ParticleEngine', 'f_107289_', 'particles', 'Ljava/util/Map;'],
        ['net/minecraft/client/particle/ParticleRenderType', 'f_107430_', 'PARTICLE_SHEET_OPAQUE', 'Lnet/minecraft/client/particle/ParticleRenderType;'],
        ['net/minecraft/client/particle/ParticleRenderType', 'f_107431_', 'PARTICLE_SHEET_TRANSLUCENT', 'Lnet/minecraft/client/particle/ParticleRenderType;'],
        ['net/minecraft/client/particle/ParticleRenderType', 'f_107432_', 'PARTICLE_SHEET_LIT', 'Lnet/minecraft/client/particle/ParticleRenderType;'],
        ['net/minecraft/client/particle/ParticleRenderType', 'f_107433_', 'CUSTOM', 'Lnet/minecraft/client/particle/ParticleRenderType;'],
        ['net/minecraft/client/particle/ParticleRenderType', 'f_107434_', 'NO_RENDER', 'Lnet/minecraft/client/particle/ParticleRenderType;'],
    ];
    fieldRefMap['net/irisshaders/iris/mixin/fantastic/MixinStationaryItemParticle'] = [
        ['net/minecraft/client/particle/ParticleRenderType', 'f_107429_', 'TERRAIN_SHEET', 'Lnet/minecraft/client/particle/ParticleRenderType;'],
        ['net/minecraft/client/multiplayer/ClientLevel', 'f_46441_', 'random', 'Lnet/minecraft/util/RandomSource;'],
    ];
    fieldRefMap['net/irisshaders/iris/mixin/fantastic/MixinTerrainParticle'] = [
        ['net/minecraft/client/particle/ParticleRenderType', 'f_107429_', 'TERRAIN_SHEET', 'Lnet/minecraft/client/particle/ParticleRenderType;'],
        ['net/minecraft/client/multiplayer/ClientLevel', 'f_46441_', 'random', 'Lnet/minecraft/util/RandomSource;'],
    ];
    fieldRefMap['net/irisshaders/iris/mixin/gui/MixinForgeGui'] = [
        ['net/minecraft/client/Minecraft', 'f_91080_', 'screen', 'Lnet/minecraft/client/gui/screens/Screen;'],
    ];
    fieldRefMap['net/irisshaders/iris/mixin/gui/MixinGui'] = [
        ['net/minecraft/client/Minecraft', 'f_91080_', 'screen', 'Lnet/minecraft/client/gui/screens/Screen;'],
        ['net/minecraft/client/gui/Gui', 'f_92986_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
    ];
    fieldRefMap['net/irisshaders/iris/mixin/gui/MixinVideoSettingsScreen'] = [
        ['net/minecraft/client/OptionInstance', 'f_231471_', 'BOOLEAN_VALUES', 'Lnet/minecraft/client/OptionInstance$Enum;'],
        ['net/irisshaders/iris/mixin/gui/MixinVideoSettingsScreen', 'f_96541_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
    ];
    fieldRefMap['net/irisshaders/iris/mixin/sky/MixinClientLevelData_DisableVoidPlane'] = [
        ['net/minecraft/client/Minecraft', 'f_91063_', 'gameRenderer', 'Lnet/minecraft/client/renderer/GameRenderer;'],
    ];
    fieldRefMap['net/irisshaders/iris/mixin/sky/MixinDimensionSpecialEffects'] = [
        ['net/minecraft/world/effect/MobEffects', 'f_19610_', 'BLINDNESS', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['net/minecraft/client/Minecraft', 'f_91063_', 'gameRenderer', 'Lnet/minecraft/client/renderer/GameRenderer;'],
    ];
    fieldRefMap['net/irisshaders/iris/mixin/sky/MixinLevelRenderer_SunMoonToggle'] = [
        ['com/mojang/blaze3d/vertex/DefaultVertexFormat', 'f_85814_', 'POSITION', 'Lcom/mojang/blaze3d/vertex/VertexFormat;'],
    ];
    fieldRefMap['net/irisshaders/iris/mixin/sky/MixinOptions_CloudsOverride'] = [
        ['net/minecraft/client/Options', 'f_92106_', 'renderDistance', 'Lnet/minecraft/client/OptionInstance;'],
    ];
    fieldRefMap['net/irisshaders/iris/mixin/texture/MixinAbstractTexture'] = [
        ['net/minecraft/client/renderer/texture/AbstractTexture', 'f_117950_', 'id', 'I'],
    ];
    fieldRefMap['net/irisshaders/iris/mixin/texture/pbr/MixinDirectoryLister'] = [
        ['net/minecraft/client/renderer/texture/atlas/sources/DirectoryLister', 'f_260442_', 'sourcePath', 'Ljava/lang/String;'],
        ['net/minecraft/client/renderer/texture/atlas/sources/DirectoryLister', 'f_260464_', 'idPrefix', 'Ljava/lang/String;'],
    ];
    fieldRefMap['net/irisshaders/iris/mixin/texture/pbr/MixinTextureAtlas'] = [
        ['net/minecraft/client/renderer/texture/TextureAtlas', 'f_118265_', 'location', 'Lnet/minecraft/resources/ResourceLocation;'],
    ];
    fieldRefMap['net/irisshaders/iris/mixin/vertices/MixinBufferBuilder'] = [
        ['com/mojang/blaze3d/vertex/BufferBuilder', 'f_85648_', 'buffer', 'Ljava/nio/ByteBuffer;'],
        ['com/mojang/blaze3d/vertex/BufferBuilder', 'f_85652_', 'nextElementByte', 'I'],
        ['com/mojang/blaze3d/vertex/BufferBuilder', 'f_85655_', 'currentElement', 'Lcom/mojang/blaze3d/vertex/VertexFormatElement;'],
        ['com/mojang/blaze3d/vertex/BufferBuilder', 'f_85657_', 'mode', 'Lcom/mojang/blaze3d/vertex/VertexFormat$Mode;'],
        ['com/mojang/blaze3d/vertex/BufferBuilder', 'f_85658_', 'format', 'Lcom/mojang/blaze3d/vertex/VertexFormat;'],
        ['com/mojang/blaze3d/vertex/DefaultVertexFormat', 'f_85809_', 'ELEMENT_NORMAL', 'Lcom/mojang/blaze3d/vertex/VertexFormatElement;'],
        ['com/mojang/blaze3d/vertex/DefaultVertexFormat', 'f_85811_', 'BLOCK', 'Lcom/mojang/blaze3d/vertex/VertexFormat;'],
        ['com/mojang/blaze3d/vertex/DefaultVertexFormat', 'f_85812_', 'NEW_ENTITY', 'Lcom/mojang/blaze3d/vertex/VertexFormat;'],
        ['com/mojang/blaze3d/vertex/DefaultVertexFormat', 'f_85820_', 'POSITION_COLOR_TEX_LIGHTMAP', 'Lcom/mojang/blaze3d/vertex/VertexFormat;'],
    ];
    fieldRefMap['net/irisshaders/iris/mixin/vertices/MixinVertexFormat'] = [
        ['com/mojang/blaze3d/vertex/DefaultVertexFormat', 'f_85811_', 'BLOCK', 'Lcom/mojang/blaze3d/vertex/VertexFormat;'],
        ['com/mojang/blaze3d/vertex/DefaultVertexFormat', 'f_85812_', 'NEW_ENTITY', 'Lcom/mojang/blaze3d/vertex/VertexFormat;'],
        ['com/mojang/blaze3d/vertex/DefaultVertexFormat', 'f_85820_', 'POSITION_COLOR_TEX_LIGHTMAP', 'Lcom/mojang/blaze3d/vertex/VertexFormat;'],
    ];
    fieldRefMap['net/p3pp3rf1y/sophisticatedcore/mixin/MixinAllay'] = [
        ['net/minecraft/world/level/gameevent/GameEvent', 'f_238690_', 'JUKEBOX_PLAY', 'Lnet/minecraft/world/level/gameevent/GameEvent;'],
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
    ];
    fieldRefMap['net/p3pp3rf1y/sophisticatedcore/mixin/MixinParrot'] = [
        ['net/minecraft/world/entity/animal/Parrot', 'f_29348_', 'partyParrot', 'Z'],
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/bugfix/buffer_builder_leak/BufferBuilderMixin'] = [
        ['com/mojang/blaze3d/vertex/BufferBuilder', 'f_85648_', 'buffer', 'Ljava/nio/ByteBuffer;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/bugfix/chunk_deadlock/ChunkMapLoadMixin'] = [
        ['net/minecraft/server/level/ChunkMap', 'f_140135_', 'mainThreadExecutor', 'Lnet/minecraft/util/thread/BlockableEventLoop;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/bugfix/chunk_deadlock/EntityMixin'] = [
        ['net/minecraft/world/level/ChunkPos', 'f_45578_', 'x', 'I'],
        ['net/minecraft/world/level/ChunkPos', 'f_45579_', 'z', 'I'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/bugfix/concurrency/MappedRegistryMixin'] = [
        ['net/minecraft/core/MappedRegistry', 'f_205844_', 'tags', 'Ljava/util/Map;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/bugfix/concurrency/ReloadableResourceManagerMixin'] = [
        ['net/minecraft/server/packs/resources/ReloadableResourceManager', 'f_203817_', 'type', 'Lnet/minecraft/server/packs/PackType;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/bugfix/ender_dragon_leak/EnderDragonRendererMixin'] = [
        ['net/minecraft/client/renderer/entity/EnderDragonRenderer', 'f_114183_', 'model', 'Lnet/minecraft/client/renderer/entity/EnderDragonRenderer$DragonModel;'],
        ['net/minecraft/client/renderer/entity/EnderDragonRenderer$DragonModel', 'f_114233_', 'entity', 'Lnet/minecraft/world/entity/boss/enderdragon/EnderDragon;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/bugfix/forge_vehicle_packets/ServerGamePacketListenerImplMixin'] = [
        ['net/minecraft/server/level/ServerPlayer', 'f_19854_', 'xo', 'D'],
        ['net/minecraft/server/level/ServerPlayer', 'f_19855_', 'yo', 'D'],
        ['net/minecraft/server/level/ServerPlayer', 'f_19856_', 'zo', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82479_', 'x', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82480_', 'y', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82481_', 'z', 'D'],
        ['net/minecraft/server/network/ServerGamePacketListenerImpl', 'f_9743_', 'player', 'Lnet/minecraft/server/level/ServerPlayer;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/bugfix/missing_block_entities/LevelChunkMixin'] = [
        ['org/embeddedt/modernfix/common/mixin/bugfix/missing_block_entities/LevelChunkMixin', 'f_187604_', 'chunkPos', 'Lnet/minecraft/world/level/ChunkPos;'],
        ['org/embeddedt/modernfix/common/mixin/bugfix/missing_block_entities/LevelChunkMixin', 'f_187609_', 'pendingBlockEntities', 'Ljava/util/Map;'],
        ['org/embeddedt/modernfix/common/mixin/bugfix/missing_block_entities/LevelChunkMixin', 'f_187610_', 'blockEntities', 'Ljava/util/Map;'],
        ['org/embeddedt/modernfix/common/mixin/bugfix/missing_block_entities/LevelChunkMixin', 'f_187612_', 'sections', '[Lnet/minecraft/world/level/chunk/LevelChunkSection;'],
        ['net/minecraft/world/level/ChunkPos', 'f_45578_', 'x', 'I'],
        ['net/minecraft/world/level/ChunkPos', 'f_45579_', 'z', 'I'],
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
        ['net/minecraft/world/level/chunk/LevelChunk', 'f_62776_', 'level', 'Lnet/minecraft/world/level/Level;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/bugfix/model_data_manager_cme/ModelDataManagerMixin'] = [
        ['net/minecraft/world/level/ChunkPos', 'f_45578_', 'x', 'I'],
        ['net/minecraft/world/level/ChunkPos', 'f_45579_', 'z', 'I'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/bugfix/paper_chunk_patches/ChunkMapMixin'] = [
        ['net/minecraft/server/level/ChunkMap', 'f_140135_', 'mainThreadExecutor', 'Lnet/minecraft/util/thread/BlockableEventLoop;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/bugfix/paper_chunk_patches/SortedArraySetMixin'] = [
        ['net/minecraft/util/SortedArraySet', 'f_14241_', 'contents', '[Ljava/lang/Object;'],
        ['net/minecraft/util/SortedArraySet', 'f_14242_', 'size', 'I'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/bugfix/registry_ops_cme/RegistryOpsMemoizedMixin'] = [
        ['net/minecraft/resources/RegistryOps$1', 'f_254621_', 'lookups', 'Ljava/util/Map;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/bugfix/world_leaks/MinecraftMixin'] = [
        ['net/minecraft/client/multiplayer/ClientChunkCache', 'f_104409_', 'lightEngine', 'Lnet/minecraft/world/level/lighting/LevelLightEngine;'],
        ['net/minecraft/client/multiplayer/ClientChunkCache', 'f_104410_', 'storage', 'Lnet/minecraft/client/multiplayer/ClientChunkCache$Storage;'],
        ['net/minecraft/client/multiplayer/ClientChunkCache$Storage', 'f_104466_', 'chunks', 'Ljava/util/concurrent/atomic/AtomicReferenceArray;'],
        ['net/minecraft/client/multiplayer/ClientLevel', 'f_151512_', 'blockEntityTickers', 'Ljava/util/List;'],
        ['net/minecraft/client/Minecraft', 'f_91073_', 'level', 'Lnet/minecraft/client/multiplayer/ClientLevel;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/bugfix/world_screen_skipped/WorldSelectionListMixin'] = [
        ['net/minecraft/client/gui/screens/worldselection/WorldSelectionList$WorldListEntry', 'f_101693_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
        ['net/minecraft/client/Minecraft', 'f_91080_', 'screen', 'Lnet/minecraft/client/gui/screens/Screen;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/core/BootstrapMixin'] = [
        ['net/minecraft/server/Bootstrap', 'f_135867_', 'isBootstrapped', 'Z'],
        ['net/minecraft/server/Bootstrap', 'f_135868_', 'LOGGER', 'Lorg/slf4j/Logger;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/core/PalettedContainerMixin'] = [
        ['net/minecraft/world/level/chunk/PalettedContainer', 'f_188032_', 'data', 'Lnet/minecraft/world/level/chunk/PalettedContainer$Data;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/feature/blockentity_incorrect_thread/ChunkAccessMixin'] = [
        ['net/minecraft/world/level/chunk/ChunkAccess', 'f_187610_', 'blockEntities', 'Ljava/util/Map;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/feature/cause_lag_by_disabling_threads/UtilMixin'] = [
        ['net/minecraft/Util', 'f_137444_', 'BACKGROUND_EXECUTOR', 'Ljava/util/concurrent/ExecutorService;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/feature/mcfunction_profiling/ServerFunctionManagerMixin'] = [
        ['net/minecraft/server/ServerFunctionManager', 'f_136099_', 'TICK_FUNCTION_TAG', 'Lnet/minecraft/resources/ResourceLocation;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/feature/measure_time/BootstrapMixin'] = [
        ['net/minecraft/server/Bootstrap', 'f_135868_', 'LOGGER', 'Lorg/slf4j/Logger;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/feature/measure_time/MinecraftMixin'] = [
        ['net/minecraft/client/Minecraft', 'f_91081_', 'overlay', 'Lnet/minecraft/client/gui/screens/Overlay;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/feature/measure_time/ProfiledReloadInstanceMixin'] = [
        ['net/minecraft/server/packs/resources/ProfiledReloadInstance$State', 'f_10689_', 'preparationNanos', 'Ljava/util/concurrent/atomic/AtomicLong;'],
        ['net/minecraft/server/packs/resources/ProfiledReloadInstance$State', 'f_10690_', 'reloadNanos', 'Ljava/util/concurrent/atomic/AtomicLong;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/feature/remove_chat_signing/ProfileKeyPairManagerMixin'] = [
        ['net/minecraft/client/multiplayer/ProfileKeyPairManager', 'f_252532_', 'EMPTY_KEY_MANAGER', 'Lnet/minecraft/client/multiplayer/ProfileKeyPairManager;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/feature/remove_telemetry/ClientTelemetryManagerMixin'] = [
        ['net/minecraft/client/telemetry/TelemetryEventSender', 'f_260501_', 'DISABLED', 'Lnet/minecraft/client/telemetry/TelemetryEventSender;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/attribute_supplier_dedup/AttributeSupplierBuilderMixin'] = [
        ['net/minecraft/world/entity/ai/attributes/AttributeSupplier$Builder', 'f_22262_', 'builder', 'Ljava/util/Map;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/attribute_supplier_dedup/AttributeSupplierMixin'] = [
        ['net/minecraft/world/entity/ai/attributes/AttributeSupplier', 'f_22241_', 'instances', 'Ljava/util/Map;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/blast_search_trees/MinecraftMixin'] = [
        ['net/minecraft/client/searchtree/SearchRegistry', 'f_119943_', 'RECIPE_COLLECTIONS', 'Lnet/minecraft/client/searchtree/SearchRegistry$Key;'],
        ['net/minecraft/client/KeyMapping', 'f_90809_', 'ALL', 'Ljava/util/Map;'],
        ['net/minecraft/client/Minecraft', 'f_90997_', 'searchRegistry', 'Lnet/minecraft/client/searchtree/SearchRegistry;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/cache_strongholds/ChunkGeneratorMixin'] = [
        ['net/minecraft/nbt/NbtOps', 'f_128958_', 'INSTANCE', 'Lnet/minecraft/nbt/NbtOps;'],
        ['net/minecraft/world/level/levelgen/structure/placement/ConcentricRingsStructurePlacement', 'f_204949_', 'CODEC', 'Lcom/mojang/serialization/Codec;'],
        ['net/minecraft/world/level/chunk/ChunkGeneratorStructureState', 'f_254681_', 'biomeSource', 'Lnet/minecraft/world/level/biome/BiomeSource;'],
        ['net/minecraft/world/level/chunk/ChunkGeneratorStructureState', 'f_254746_', 'concentricRingsSeed', 'J'],
        ['net/minecraft/world/level/ChunkPos', 'f_45578_', 'x', 'I'],
        ['net/minecraft/world/level/ChunkPos', 'f_45579_', 'z', 'I'],
        ['net/minecraft/world/level/biome/BiomeSource', 'f_47888_', 'CODEC', 'Lcom/mojang/serialization/Codec;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/cache_strongholds/ConcentricRingsStructurePlacementMixin'] = [
        ['net/minecraft/world/level/levelgen/structure/placement/ConcentricRingsStructurePlacement', 'f_204950_', 'distance', 'I'],
        ['net/minecraft/world/level/levelgen/structure/placement/ConcentricRingsStructurePlacement', 'f_204951_', 'spread', 'I'],
        ['net/minecraft/world/level/levelgen/structure/placement/ConcentricRingsStructurePlacement', 'f_204952_', 'count', 'I'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/cache_upgraded_structures/StructureManagerMixin'] = [
        ['net/minecraft/world/level/levelgen/structure/templatesystem/StructureTemplateManager', 'f_230346_', 'fixerUpper', 'Lcom/mojang/datafixers/DataFixer;'],
        ['net/minecraft/world/level/levelgen/structure/templatesystem/StructureTemplateManager', 'f_230347_', 'resourceManager', 'Lnet/minecraft/server/packs/resources/ResourceManager;'],
        ['net/minecraft/world/level/levelgen/structure/templatesystem/StructureTemplateManager', 'f_243724_', 'blockLookup', 'Lnet/minecraft/core/HolderGetter;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/compact_bit_storage/PalettedContainerMixin'] = [
        ['net/minecraft/world/level/chunk/PalettedContainer', 'f_188032_', 'data', 'Lnet/minecraft/world/level/chunk/PalettedContainer$Data;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/compact_imposterprotochunks/ChunkAccessMixin'] = [
        ['net/minecraft/world/level/chunk/ChunkAccess', 'f_187612_', 'sections', '[Lnet/minecraft/world/level/chunk/LevelChunkSection;'],
        ['net/minecraft/world/level/chunk/ChunkAccess', 'f_283754_', 'skyLightSources', 'Lnet/minecraft/world/level/lighting/ChunkSkyLightSources;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/compact_imposterprotochunks/ImposterProtoChunkMixin'] = [
        ['org/embeddedt/modernfix/common/mixin/perf/compact_imposterprotochunks/ImposterProtoChunkMixin', 'f_187612_', 'sections', '[Lnet/minecraft/world/level/chunk/LevelChunkSection;'],
        ['org/embeddedt/modernfix/common/mixin/perf/compact_imposterprotochunks/ImposterProtoChunkMixin', 'f_283754_', 'skyLightSources', 'Lnet/minecraft/world/level/lighting/ChunkSkyLightSources;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/compact_mojang_registries/MappedRegistryMixin'] = [
        ['net/minecraft/core/MappedRegistry', 'f_122676_', 'lifecycles', 'Ljava/util/Map;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/deduplicate_wall_shapes/WallBlockMixin'] = [
        ['org/embeddedt/modernfix/common/mixin/perf/deduplicate_wall_shapes/WallBlockMixin', 'f_49792_', 'stateDefinition', 'Lnet/minecraft/world/level/block/state/StateDefinition;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/dynamic_resources/BlockModelShaperMixin'] = [
        ['net/minecraft/client/renderer/block/BlockModelShaper', 'f_110877_', 'modelByStateCache', 'Ljava/util/Map;'],
        ['net/minecraft/client/renderer/block/BlockModelShaper', 'f_110878_', 'modelManager', 'Lnet/minecraft/client/resources/model/ModelManager;'],
        ['net/minecraft/core/registries/BuiltInRegistries', 'f_256975_', 'BLOCK', 'Lnet/minecraft/core/DefaultedRegistry;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/dynamic_resources/ItemModelShaperMixin'] = [
        ['net/minecraft/client/renderer/ItemModelShaper', 'f_109389_', 'shapesCache', 'Lit/unimi/dsi/fastutil/ints/Int2ObjectMap;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/dynamic_resources/ModelBakerImplMixin'] = [
        ['net/minecraft/client/resources/model/ModelBakery', 'f_119214_', 'topLevelModels', 'Ljava/util/Map;'],
        ['net/minecraft/client/resources/model/ModelBakery', 'f_119230_', 'MISSING_MODEL_LOCATION', 'Lnet/minecraft/client/resources/model/ModelResourceLocation;'],
        ['net/minecraft/client/resources/model/ModelBakery$ModelBakerImpl', 'f_243920_', 'modelTextureGetter', 'Ljava/util/function/Function;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/dynamic_resources/ModelBakeryMixin'] = [
        ['net/minecraft/client/resources/model/ModelBakery', 'f_119209_', 'blockColors', 'Lnet/minecraft/client/color/block/BlockColors;'],
        ['net/minecraft/client/resources/model/ModelBakery', 'f_119210_', 'loadingStack', 'Ljava/util/Set;'],
        ['net/minecraft/client/resources/model/ModelBakery', 'f_119212_', 'unbakedCache', 'Ljava/util/Map;'],
        ['net/minecraft/client/resources/model/ModelBakery', 'f_119213_', 'bakedCache', 'Ljava/util/Map;'],
        ['net/minecraft/client/resources/model/ModelBakery', 'f_119215_', 'bakedTopLevelModels', 'Ljava/util/Map;'],
        ['net/minecraft/client/resources/model/ModelBakery', 'f_119230_', 'MISSING_MODEL_LOCATION', 'Lnet/minecraft/client/resources/model/ModelResourceLocation;'],
        ['net/minecraft/client/resources/model/ModelBakery', 'f_119235_', 'LOGGER', 'Lorg/slf4j/Logger;'],
        ['net/minecraft/client/Minecraft', 'f_91073_', 'level', 'Lnet/minecraft/client/multiplayer/ClientLevel;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/dynamic_resources/ModelManagerMixin'] = [
        ['net/minecraft/client/resources/model/ModelBakery', 'f_119231_', 'MISSING_MODEL_MESH', 'Ljava/lang/String;'],
        ['net/minecraft/client/resources/model/ModelManager', 'f_119397_', 'bakedRegistry', 'Ljava/util/Map;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/dynamic_structure_manager/StructureManagerMixin'] = [
        ['net/minecraft/world/level/levelgen/structure/templatesystem/StructureTemplateManager', 'f_230345_', 'structureRepository', 'Ljava/util/Map;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/fast_forge_dummies/NamespacedHolderHelperMixin'] = [
        ['org/embeddedt/modernfix/common/mixin/perf/fast_forge_dummies/NamespacedHolderHelperMixin', 'f_244282_', 'unregisteredIntrusiveHolders', 'Ljava/util/Map;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/faster_ingredients/IngredientMixin'] = [
        ['net/minecraft/core/registries/BuiltInRegistries', 'f_257033_', 'ITEM', 'Lnet/minecraft/core/DefaultedRegistry;'],
        ['net/minecraft/world/item/Items', 'f_42127_', 'BARRIER', 'Lnet/minecraft/world/item/Item;'],
        ['net/minecraft/world/item/crafting/Ingredient', 'f_43902_', 'values', '[Lnet/minecraft/world/item/crafting/Ingredient$Value;'],
        ['net/minecraft/world/item/crafting/Ingredient', 'f_43903_', 'itemStacks', '[Lnet/minecraft/world/item/ItemStack;'],
        ['net/minecraft/world/item/crafting/Ingredient', 'f_43904_', 'stackingIds', 'Lit/unimi/dsi/fastutil/ints/IntList;'],
        ['net/minecraft/world/item/crafting/Ingredient$TagValue', 'f_43959_', 'tag', 'Lnet/minecraft/tags/TagKey;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/faster_item_rendering/ItemRendererMixin'] = [
        ['net/minecraft/client/renderer/block/model/ItemTransform', 'f_111754_', 'NO_TRANSFORM', 'Lnet/minecraft/client/renderer/block/model/ItemTransform;'],
        ['net/minecraft/client/renderer/block/model/ItemTransform', 'f_111755_', 'rotation', 'Lorg/joml/Vector3f;'],
        ['net/minecraft/client/renderer/block/model/ItemTransforms', 'f_111792_', 'gui', 'Lnet/minecraft/client/renderer/block/model/ItemTransform;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/faster_structure_location/ServerLevelMixin'] = [
        ['net/minecraft/server/level/ServerLevel', 'f_8547_', 'chunkSource', 'Lnet/minecraft/server/level/ServerChunkCache;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/faster_structure_location/StructureCheckMixin'] = [
        ['net/minecraft/world/level/levelgen/structure/StructureCheck', 'f_204945_', 'structureConfigs', 'Lnet/minecraft/core/Registry;'],
        ['net/minecraft/world/level/ChunkPos', 'f_45578_', 'x', 'I'],
        ['net/minecraft/world/level/ChunkPos', 'f_45579_', 'z', 'I'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/faster_texture_stitching/StitcherMixin'] = [
        ['net/minecraft/client/renderer/texture/Stitcher', 'f_118161_', 'HOLDER_COMPARATOR', 'Ljava/util/Comparator;'],
        ['net/minecraft/client/renderer/texture/Stitcher', 'f_118163_', 'texturesToBeStitched', 'Ljava/util/List;'],
        ['net/minecraft/client/renderer/texture/Stitcher', 'f_118165_', 'storageX', 'I'],
        ['net/minecraft/client/renderer/texture/Stitcher', 'f_118166_', 'storageY', 'I'],
        ['net/minecraft/client/renderer/texture/Stitcher', 'f_118167_', 'maxWidth', 'I'],
        ['net/minecraft/client/renderer/texture/Stitcher', 'f_118168_', 'maxHeight', 'I'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/fix_loop_spin_waiting/MinecraftServerMixin'] = [
        ['net/minecraft/server/MinecraftServer', 'f_129726_', 'nextTickTime', 'J'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/memoize_creative_tab_build/CreativeModeTabMixin'] = [
        ['net/minecraft/core/registries/BuiltInRegistries', 'f_279662_', 'CREATIVE_MODE_TAB', 'Lnet/minecraft/core/Registry;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/model_optimizations/PropertyMixin'] = [
        ['net/minecraft/world/level/block/state/properties/Property', 'f_61686_', 'clazz', 'Ljava/lang/Class;'],
        ['net/minecraft/world/level/block/state/properties/Property', 'f_61687_', 'name', 'Ljava/lang/String;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/model_optimizations/TransformationMatrixMixin'] = [
        ['com/mojang/math/Transformation', 'f_121078_', 'matrix', 'Lorg/joml/Matrix4f;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/mojang_registry_size/StateHolderMixin'] = [
        ['net/minecraft/world/level/block/state/StateHolder', 'f_61114_', 'neighbours', 'Lcom/google/common/collect/Table;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/optimize_surface_rules/BiomeConditionSourceMixin'] = [
        ['net/minecraft/world/level/levelgen/SurfaceRules$BiomeConditionSource', 'f_189489_', 'biomes', 'Ljava/util/List;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/optimize_surface_rules/NoiseBasedChunkGeneratorMixin'] = [
        ['net/minecraft/world/level/ChunkPos', 'f_45578_', 'x', 'I'],
        ['net/minecraft/world/level/ChunkPos', 'f_45579_', 'z', 'I'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/patchouli_deduplicate_books/ClientBookRegistryMixin'] = [
        ['net/minecraft/world/item/ItemStack', 'f_41583_', 'EMPTY', 'Lnet/minecraft/world/item/ItemStack;'],
        ['net/minecraft/world/item/Items', 'f_41852_', 'AIR', 'Lnet/minecraft/world/item/Item;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/reduce_blockstate_cache_rebuilds/BlockStateBaseMixin'] = [
        ['net/minecraft/world/level/block/state/BlockBehaviour$BlockStateBase', 'f_243896_', 'fluidState', 'Lnet/minecraft/world/level/material/FluidState;'],
        ['net/minecraft/world/level/block/state/BlockBehaviour$BlockStateBase', 'f_244227_', 'isRandomlyTicking', 'Z'],
        ['net/minecraft/world/level/block/state/BlockBehaviour$BlockStateBase', 'f_279551_', 'legacySolid', 'Z'],
        ['net/minecraft/world/level/block/state/BlockBehaviour$BlockStateBase', 'f_60593_', 'cache', 'Lnet/minecraft/world/level/block/state/BlockBehaviour$BlockStateBase$Cache;'],
        ['org/embeddedt/modernfix/common/mixin/perf/reduce_blockstate_cache_rebuilds/BlockStateBaseMixin', 'f_61112_', 'owner', 'Ljava/lang/Object;'],
        ['net/minecraft/world/level/material/Fluids', 'f_76191_', 'EMPTY', 'Lnet/minecraft/world/level/material/Fluid;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/reduce_blockstate_cache_rebuilds/BlocksMixin'] = [
        ['net/minecraft/world/item/Items', 'f_41852_', 'AIR', 'Lnet/minecraft/world/item/Item;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/release_protochunks/ChunkHolderMixin'] = [
        ['net/minecraft/server/level/ChunkHolder', 'f_140001_', 'futures', 'Ljava/util/concurrent/atomic/AtomicReferenceArray;'],
        ['net/minecraft/server/level/ChunkHolder', 'f_140005_', 'chunkToSave', 'Ljava/util/concurrent/CompletableFuture;'],
        ['net/minecraft/server/level/ChunkHolder', 'f_140007_', 'ticketLevel', 'I'],
        ['net/minecraft/server/level/ChunkHolder', 'f_140009_', 'pos', 'Lnet/minecraft/world/level/ChunkPos;'],
        ['net/minecraft/server/level/ChunkHolder', 'f_140016_', 'playerProvider', 'Lnet/minecraft/server/level/ChunkHolder$PlayerProvider;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/release_protochunks/ChunkMapMixin'] = [
        ['net/minecraft/server/level/ChunkMap', 'f_140129_', 'updatingChunkMap', 'Lit/unimi/dsi/fastutil/longs/Long2ObjectLinkedOpenHashMap;'],
        ['net/minecraft/server/level/ChunkMap', 'f_140131_', 'pendingUnloads', 'Lit/unimi/dsi/fastutil/longs/Long2ObjectLinkedOpenHashMap;'],
        ['net/minecraft/server/level/ChunkMap', 'f_140135_', 'mainThreadExecutor', 'Lnet/minecraft/util/thread/BlockableEventLoop;'],
        ['net/minecraft/world/level/ChunkPos', 'f_45578_', 'x', 'I'],
        ['net/minecraft/world/level/ChunkPos', 'f_45579_', 'z', 'I'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/release_protochunks/ImposterProtoChunkMixin'] = [
        ['net/minecraft/world/level/chunk/ImposterProtoChunk', 'f_187918_', 'allowWrites', 'Z'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/remove_spawn_chunks/EntityMixin'] = [
        ['net/minecraft/server/level/ServerLevel', 'f_46428_', 'OVERWORLD', 'Lnet/minecraft/resources/ResourceKey;'],
        ['net/minecraft/server/level/TicketType', 'f_9447_', 'PORTAL', 'Lnet/minecraft/server/level/TicketType;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/remove_spawn_chunks/MinecraftServerMixin'] = [
        ['net/minecraft/nbt/NbtOps', 'f_128958_', 'INSTANCE', 'Lnet/minecraft/nbt/NbtOps;'],
        ['net/minecraft/world/level/ChunkPos', 'f_45578_', 'x', 'I'],
        ['net/minecraft/world/level/ChunkPos', 'f_45579_', 'z', 'I'],
        ['net/minecraft/world/level/Level', 'f_46428_', 'OVERWORLD', 'Lnet/minecraft/resources/ResourceKey;'],
        ['net/minecraft/server/level/TicketType', 'f_9442_', 'START', 'Lnet/minecraft/server/level/TicketType;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/remove_spawn_chunks/PlayerListMixin'] = [
        ['net/minecraft/server/level/ServerPlayer', 'f_8924_', 'server', 'Lnet/minecraft/server/MinecraftServer;'],
        ['net/minecraft/server/level/TicketType', 'f_9442_', 'START', 'Lnet/minecraft/server/level/TicketType;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/resourcepacks/FilePackResourcesMixin'] = [
        ['net/minecraft/server/packs/FilePackResources', 'f_243750_', 'file', 'Ljava/io/File;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/smart_ingredient_sync/ClientPacketListenerMixin'] = [
        ['net/minecraft/client/multiplayer/ClientPacketListener', 'f_104885_', 'connection', 'Lnet/minecraft/network/Connection;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/smart_ingredient_sync/IngredientMixin'] = [
        ['net/minecraft/core/registries/Registries', 'f_256913_', 'ITEM', 'Lnet/minecraft/resources/ResourceKey;'],
        ['net/minecraft/core/registries/BuiltInRegistries', 'f_257033_', 'ITEM', 'Lnet/minecraft/core/DefaultedRegistry;'],
        ['net/minecraft/world/item/crafting/Ingredient', 'f_43902_', 'values', '[Lnet/minecraft/world/item/crafting/Ingredient$Value;'],
        ['net/minecraft/world/item/crafting/Ingredient$TagValue', 'f_43959_', 'tag', 'Lnet/minecraft/tags/TagKey;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/state_definition_construct/StateDefinitionMixin'] = [
        ['net/minecraft/world/level/block/state/StateDefinition', 'f_61048_', 'propertiesByName', 'Lcom/google/common/collect/ImmutableSortedMap;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/suspend_integrated_server_during_load/ClientPacketListenerMixin'] = [
        ['net/minecraft/client/multiplayer/ClientPacketListener', 'f_104888_', 'minecraft', 'Lnet/minecraft/client/Minecraft;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/suspend_integrated_server_during_load/IntegratedServerMixin'] = [
        ['net/minecraft/client/server/IntegratedServer', 'f_120016_', 'paused', 'Z'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/suspend_integrated_server_during_load/PlayerListMixin'] = [
        ['net/minecraft/server/level/ServerPlayer', 'f_8906_', 'connection', 'Lnet/minecraft/server/network/ServerGamePacketListenerImpl;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/tag_id_caching/TagEntryMixin'] = [
        ['net/minecraft/tags/TagEntry', 'f_215913_', 'id', 'Lnet/minecraft/resources/ResourceLocation;'],
        ['net/minecraft/tags/TagEntry', 'f_215914_', 'tag', 'Z'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/tag_id_caching/TagOrElementLocationMixin'] = [
        ['net/minecraft/util/ExtraCodecs$TagOrElementLocation', 'f_216195_', 'id', 'Lnet/minecraft/resources/ResourceLocation;'],
        ['net/minecraft/util/ExtraCodecs$TagOrElementLocation', 'f_216196_', 'tag', 'Z'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/ticking_chunk_alloc/ChunkAccessMixin'] = [
        ['net/minecraft/world/level/chunk/ChunkAccess', 'f_187618_', 'structuresRefences', 'Ljava/util/Map;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/worldgen_allocation/ClimateParameterListMixin'] = [
        ['net/minecraft/world/level/biome/Climate$ParameterList', 'f_186846_', 'values', 'Ljava/util/List;'],
        ['net/minecraft/world/level/biome/Climate$ParameterList', 'f_186847_', 'index', 'Lnet/minecraft/world/level/biome/Climate$RTree;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/worldgen_allocation/MaterialRuleListMixin'] = [
        ['net/minecraft/world/level/levelgen/material/MaterialRuleList', 'f_191545_', 'materialRuleList', 'Ljava/util/List;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/worldgen_allocation/NoiseChunkMixin'] = [
        ['net/minecraft/world/level/levelgen/NoiseChunk', 'f_209161_', 'wrapped', 'Ljava/util/Map;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/worldgen_allocation/SequenceRuleMixin'] = [
        ['net/minecraft/world/level/levelgen/SurfaceRules$SequenceRule', 'f_189685_', 'rules', 'Ljava/util/List;'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/perf/worldgen_allocation/SurfaceRulesContextMixin'] = [
        ['net/minecraft/world/level/levelgen/SurfaceRules$Context', 'f_189542_', 'biomeGetter', 'Ljava/util/function/Function;'],
        ['net/minecraft/world/level/levelgen/SurfaceRules$Context', 'f_189553_', 'lastUpdateY', 'J'],
        ['net/minecraft/world/level/levelgen/SurfaceRules$Context', 'f_189554_', 'pos', 'Lnet/minecraft/core/BlockPos$MutableBlockPos;'],
        ['net/minecraft/world/level/levelgen/SurfaceRules$Context', 'f_189555_', 'biome', 'Ljava/util/function/Supplier;'],
        ['net/minecraft/world/level/levelgen/SurfaceRules$Context', 'f_189557_', 'blockY', 'I'],
        ['net/minecraft/world/level/levelgen/SurfaceRules$Context', 'f_189558_', 'waterHeight', 'I'],
        ['net/minecraft/world/level/levelgen/SurfaceRules$Context', 'f_189559_', 'stoneDepthBelow', 'I'],
        ['net/minecraft/world/level/levelgen/SurfaceRules$Context', 'f_189560_', 'stoneDepthAbove', 'I'],
    ];
    fieldRefMap['org/embeddedt/modernfix/common/mixin/safety/ItemPropertiesMixin'] = [
        ['net/minecraft/client/renderer/item/ItemProperties', 'f_117820_', 'GENERIC_PROPERTIES', 'Ljava/util/Map;'],
        ['net/minecraft/client/renderer/item/ItemProperties', 'f_117825_', 'PROPERTIES', 'Ljava/util/Map;'],
    ];
    fieldRefMap['snownee/jade/mixin/StringRenderOutputMixin'] = [
        ['net/minecraft/client/gui/Font$StringRenderOutput', 'f_92940_', 'dimFactor', 'F'],
        ['net/minecraft/client/gui/Font$StringRenderOutput', 'f_92941_', 'r', 'F'],
        ['net/minecraft/client/gui/Font$StringRenderOutput', 'f_92942_', 'g', 'F'],
        ['net/minecraft/client/gui/Font$StringRenderOutput', 'f_92943_', 'b', 'F'],
        ['net/minecraft/client/gui/Font$StringRenderOutput', 'f_92944_', 'a', 'F'],
    ];
    fieldRefMap['software/bernie/geckolib/mixin/client/TextureManagerMixin'] = [
        ['net/minecraft/client/renderer/texture/TextureManager', 'f_118468_', 'byPath', 'Ljava/util/Map;'],
    ];
    fieldRefMap['studio/fantasyit/ars_botania/mixin/ArsReceiveOrGiveManaPool'] = [
        ['studio/fantasyit/ars_botania/mixin/ArsReceiveOrGiveManaPool', 'f_58857_', 'level', 'Lnet/minecraft/world/level/Level;'],
        ['studio/fantasyit/ars_botania/mixin/ArsReceiveOrGiveManaPool', 'f_58858_', 'worldPosition', 'Lnet/minecraft/core/BlockPos;'],
    ];
    fieldRefMap['studio/fantasyit/ars_botania/mixin/ArsRelaySplitterTile'] = [
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
        ['studio/fantasyit/ars_botania/mixin/ArsRelaySplitterTile', 'f_58857_', 'level', 'Lnet/minecraft/world/level/Level;'],
        ['studio/fantasyit/ars_botania/mixin/ArsRelaySplitterTile', 'f_58858_', 'worldPosition', 'Lnet/minecraft/core/BlockPos;'],
    ];
    fieldRefMap['studio/fantasyit/ars_botania/mixin/ArsRelayTile'] = [
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
        ['studio/fantasyit/ars_botania/mixin/ArsRelayTile', 'f_58857_', 'level', 'Lnet/minecraft/world/level/Level;'],
        ['studio/fantasyit/ars_botania/mixin/ArsRelayTile', 'f_58858_', 'worldPosition', 'Lnet/minecraft/core/BlockPos;'],
    ];
    fieldRefMap['top/theillusivec4/curios/mixin/core/MixinApplyBonusCount'] = [
        ['net/minecraft/world/item/enchantment/Enchantments', 'f_44987_', 'BLOCK_FORTUNE', 'Lnet/minecraft/world/item/enchantment/Enchantment;'],
        ['net/minecraft/world/level/storage/loot/functions/ApplyBonusCount', 'f_79899_', 'enchantment', 'Lnet/minecraft/world/item/enchantment/Enchantment;'],
    ];
    fieldRefMap['top/theillusivec4/curios/mixin/core/MixinCuriosTriggers'] = [
        ['net/minecraft/advancements/critereon/ContextAwarePredicate', 'f_285567_', 'ANY', 'Lnet/minecraft/advancements/critereon/ContextAwarePredicate;'],
        ['net/minecraft/advancements/critereon/LocationPredicate', 'f_52592_', 'ANY', 'Lnet/minecraft/advancements/critereon/LocationPredicate;'],
    ];
    fieldRefMap['top/theillusivec4/curios/mixin/core/MixinCuriosTriggersEquip'] = [
        ['net/minecraft/advancements/critereon/ContextAwarePredicate', 'f_285567_', 'ANY', 'Lnet/minecraft/advancements/critereon/ContextAwarePredicate;'],
    ];
    fieldRefMap['top/theillusivec4/curios/mixin/core/MixinInventory'] = [
        ['net/minecraft/world/entity/player/Inventory', 'f_35978_', 'player', 'Lnet/minecraft/world/entity/player/Player;'],
    ];
    fieldRefMap['vazkii/botania/forge/mixin/BotaniaGrassBlockForgeMixin'] = [
        ['net/minecraft/world/level/block/Blocks', 'f_152481_', 'DIRT_PATH', 'Lnet/minecraft/world/level/block/Block;'],
        ['net/minecraft/world/level/block/Blocks', 'f_50093_', 'FARMLAND', 'Lnet/minecraft/world/level/block/Block;'],
    ];
    fieldRefMap['vazkii/botania/mixin/CollectingNeighborUpdaterMixin'] = [
        ['net/minecraft/world/level/redstone/CollectingNeighborUpdater', 'f_230637_', 'maxChainedNeighborUpdates', 'I'],
        ['net/minecraft/world/level/redstone/CollectingNeighborUpdater', 'f_230640_', 'count', 'I'],
    ];
    fieldRefMap['vazkii/botania/mixin/CreeperMixin'] = [
        ['vazkii/botania/mixin/CreeperMixin', 'f_21345_', 'goalSelector', 'Lnet/minecraft/world/entity/ai/goal/GoalSelector;'],
    ];
    fieldRefMap['vazkii/botania/mixin/InventoryMixin'] = [
        ['net/minecraft/world/entity/player/Abilities', 'f_35937_', 'instabuild', 'Z'],
        ['net/minecraft/world/entity/player/Inventory', 'f_35974_', 'items', 'Lnet/minecraft/core/NonNullList;'],
        ['net/minecraft/world/entity/player/Inventory', 'f_35978_', 'player', 'Lnet/minecraft/world/entity/player/Player;'],
    ];
    fieldRefMap['vazkii/botania/mixin/ItemEntityMixin'] = [
        ['net/minecraft/world/entity/item/ItemEntity', 'f_31985_', 'age', 'I'],
    ];
    fieldRefMap['vazkii/botania/mixin/LoomMenuMixin'] = [
        ['net/minecraft/core/registries/BuiltInRegistries', 'f_256878_', 'BANNER_PATTERN', 'Lnet/minecraft/core/Registry;'],
        ['net/minecraft/world/inventory/LoomMenu', 'f_39850_', 'patternSlot', 'Lnet/minecraft/world/inventory/Slot;'],
        ['net/minecraft/world/inventory/Slot', 'f_40219_', 'index', 'I'],
        ['net/minecraft/world/item/ItemStack', 'f_41583_', 'EMPTY', 'Lnet/minecraft/world/item/ItemStack;'],
    ];
    fieldRefMap['vazkii/botania/mixin/LootTableMixin'] = [
        ['net/minecraft/world/level/storage/loot/parameters/LootContextParams', 'f_81455_', 'THIS_ENTITY', 'Lnet/minecraft/world/level/storage/loot/parameters/LootContextParam;'],
        ['net/minecraft/world/level/storage/loot/parameters/LootContextParams', 'f_81463_', 'TOOL', 'Lnet/minecraft/world/level/storage/loot/parameters/LootContextParam;'],
    ];
    fieldRefMap['vazkii/botania/mixin/PistonStructureResolverMixin'] = [
        ['net/minecraft/world/level/block/piston/PistonStructureResolver', 'f_60410_', 'pistonPos', 'Lnet/minecraft/core/BlockPos;'],
    ];
    fieldRefMap['vazkii/botania/mixin/PlacementContextMixin'] = [
        ['net/minecraft/world/level/levelgen/placement/PlacementContext', 'f_191814_', 'level', 'Lnet/minecraft/world/level/WorldGenLevel;'],
        ['net/minecraft/world/level/levelgen/placement/PlacementContext', 'f_191815_', 'generator', 'Lnet/minecraft/world/level/chunk/ChunkGenerator;'],
    ];
    fieldRefMap['vazkii/botania/mixin/PollinateGoalMixin'] = [
        ['net/minecraft/world/entity/animal/Bee$BeePollinateGoal', 'f_28063_', 'VALID_POLLINATION_BLOCKS', 'Ljava/util/function/Predicate;'],
    ];
    fieldRefMap['vazkii/botania/mixin/client/LevelRendererMixin'] = [
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109464_', 'renderBuffers', 'Lnet/minecraft/client/renderer/RenderBuffers;'],
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109465_', 'level', 'Lnet/minecraft/client/multiplayer/ClientLevel;'],
        ['net/minecraft/client/renderer/LevelRenderer', 'f_109471_', 'starBuffer', 'Lcom/mojang/blaze3d/vertex/VertexBuffer;'],
        ['net/minecraft/world/level/Level', 'f_46428_', 'OVERWORLD', 'Lnet/minecraft/resources/ResourceKey;'],
        ['net/minecraft/client/Minecraft', 'f_91073_', 'level', 'Lnet/minecraft/client/multiplayer/ClientLevel;'],
    ];
    fieldRefMap['vazkii/botania/mixin/client/SkullBlockRendererMixin'] = [
        ['net/minecraft/client/renderer/blockentity/SkullBlockRenderer', 'f_112519_', 'SKIN_BY_TYPE', 'Ljava/util/Map;'],
    ];
    fieldRefMap['vazkii/botania/mixin/client/SoundEngineMixin'] = [
        ['net/minecraft/client/Minecraft', 'f_91073_', 'level', 'Lnet/minecraft/client/multiplayer/ClientLevel;'],
    ];
    fieldRefMap['vazkii/botania/mixin/client/SplashManagerMixin'] = [
        ['net/minecraft/client/resources/SplashManager', 'f_118862_', 'splashes', 'Ljava/util/List;'],
    ];
    fieldRefMap['z1gned/goetyrevelation/mixin/AbstractSpellCloudMixin'] = [
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
        ['net/minecraft/world/phys/Vec3', 'f_82478_', 'ZERO', 'Lnet/minecraft/world/phys/Vec3;'],
    ];
    fieldRefMap['z1gned/goetyrevelation/mixin/ApostleMixin'] = [
        ['net/minecraft/network/syncher/EntityDataSerializers', 'f_135028_', 'INT', 'Lnet/minecraft/network/syncher/EntityDataSerializer;'],
        ['net/minecraft/network/syncher/EntityDataSerializers', 'f_135035_', 'BOOLEAN', 'Lnet/minecraft/network/syncher/EntityDataSerializer;'],
        ['net/minecraft/world/effect/MobEffects', 'f_19596_', 'MOVEMENT_SPEED', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['net/minecraft/world/effect/MobEffects', 'f_19597_', 'MOVEMENT_SLOWDOWN', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['net/minecraft/world/effect/MobEffects', 'f_19600_', 'DAMAGE_BOOST', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['net/minecraft/world/effect/MobEffects', 'f_19601_', 'HEAL', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['net/minecraft/world/effect/MobEffects', 'f_19602_', 'HARM', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['net/minecraft/world/effect/MobEffects', 'f_19606_', 'DAMAGE_RESISTANCE', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['net/minecraft/world/effect/MobEffects', 'f_19610_', 'BLINDNESS', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['net/minecraft/world/effect/MobEffects', 'f_19612_', 'HUNGER', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['net/minecraft/world/effect/MobEffects', 'f_19613_', 'WEAKNESS', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['net/minecraft/world/effect/MobEffects', 'f_19614_', 'POISON', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['net/minecraft/world/effect/MobEffects', 'f_19615_', 'WITHER', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['net/minecraft/world/effect/MobEffects', 'f_19619_', 'GLOWING', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['z1gned/goetyrevelation/mixin/ApostleMixin', 'f_19796_', 'random', 'Lnet/minecraft/util/RandomSource;'],
        ['z1gned/goetyrevelation/mixin/ApostleMixin', 'f_19797_', 'tickCount', 'I'],
        ['z1gned/goetyrevelation/mixin/ApostleMixin', 'f_19804_', 'entityData', 'Lnet/minecraft/network/syncher/SynchedEntityData;'],
        ['z1gned/goetyrevelation/mixin/ApostleMixin', 'f_21345_', 'goalSelector', 'Lnet/minecraft/world/entity/ai/goal/GoalSelector;'],
        ['net/minecraft/world/effect/MobEffects', 'f_216964_', 'DARKNESS', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['net/minecraft/world/entity/ai/attributes/Attributes', 'f_22276_', 'MAX_HEALTH', 'Lnet/minecraft/world/entity/ai/attributes/Attribute;'],
        ['net/minecraft/world/entity/ai/attributes/Attributes', 'f_22284_', 'ARMOR', 'Lnet/minecraft/world/entity/ai/attributes/Attribute;'],
        ['net/minecraft/world/entity/ai/attributes/Attributes', 'f_22285_', 'ARMOR_TOUGHNESS', 'Lnet/minecraft/world/entity/ai/attributes/Attribute;'],
        ['net/minecraft/world/level/Level', 'f_46441_', 'random', 'Lnet/minecraft/util/RandomSource;'],
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
        ['net/minecraft/world/phys/Vec3', 'f_82479_', 'x', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82481_', 'z', 'D'],
    ];
    fieldRefMap['z1gned/goetyrevelation/mixin/ApostleModelMixin'] = [
        ['z1gned/goetyrevelation/mixin/ApostleModelMixin', 'f_102809_', 'hat', 'Lnet/minecraft/client/model/geom/ModelPart;'],
        ['net/minecraft/client/model/geom/ModelPart', 'f_104207_', 'visible', 'Z'],
    ];
    fieldRefMap['z1gned/goetyrevelation/mixin/BlazeSpellMixin'] = [
        ['net/minecraft/world/level/Level', 'f_46441_', 'random', 'Lnet/minecraft/util/RandomSource;'],
    ];
    fieldRefMap['z1gned/goetyrevelation/mixin/BowItemMixin'] = [
        ['net/minecraft/world/entity/projectile/AbstractArrow', 'f_36705_', 'pickup', 'Lnet/minecraft/world/entity/projectile/AbstractArrow$Pickup;'],
    ];
    fieldRefMap['z1gned/goetyrevelation/mixin/CycloneSpellMixin'] = [
        ['net/minecraft/world/phys/Vec3', 'f_82479_', 'x', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82480_', 'y', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82481_', 'z', 'D'],
    ];
    fieldRefMap['z1gned/goetyrevelation/mixin/DeathArrowMixin'] = [
        ['net/minecraft/world/effect/MobEffects', 'f_19614_', 'POISON', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['z1gned/goetyrevelation/mixin/DeathArrowMixin', 'f_19796_', 'random', 'Lnet/minecraft/util/RandomSource;'],
    ];
    fieldRefMap['z1gned/goetyrevelation/mixin/FireballSpellMixin'] = [
        ['net/minecraft/sounds/SoundEvents', 'f_11705_', 'BLAZE_SHOOT', 'Lnet/minecraft/sounds/SoundEvent;'],
        ['net/minecraft/world/phys/Vec3', 'f_82479_', 'x', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82480_', 'y', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82481_', 'z', 'D'],
    ];
    fieldRefMap['z1gned/goetyrevelation/mixin/GhastSpellMixin'] = [
        ['net/minecraft/world/effect/MobEffects', 'f_19613_', 'WEAKNESS', 'Lnet/minecraft/world/effect/MobEffect;'],
    ];
    fieldRefMap['z1gned/goetyrevelation/mixin/HailSpellMixin'] = [
        ['net/minecraft/sounds/SoundEvents', 'f_144205_', 'PLAYER_HURT_FREEZE', 'Lnet/minecraft/sounds/SoundEvent;'],
    ];
    fieldRefMap['z1gned/goetyrevelation/mixin/HauntedSkullSpellMixin'] = [
        ['net/minecraft/sounds/SoundEvents', 'f_11862_', 'EVOKER_CAST_SPELL', 'Lnet/minecraft/sounds/SoundEvent;'],
        ['net/minecraft/core/particles/ParticleTypes', 'f_123759_', 'POOF', 'Lnet/minecraft/core/particles/SimpleParticleType;'],
        ['net/minecraft/world/level/Level', 'f_46441_', 'random', 'Lnet/minecraft/util/RandomSource;'],
    ];
    fieldRefMap['z1gned/goetyrevelation/mixin/LavaballSpellMixin'] = [
        ['net/minecraft/server/level/ServerLevel', 'f_46441_', 'random', 'Lnet/minecraft/util/RandomSource;'],
        ['net/minecraft/world/phys/Vec3', 'f_82479_', 'x', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82480_', 'y', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82481_', 'z', 'D'],
    ];
    fieldRefMap['z1gned/goetyrevelation/mixin/LivingEntityMixin'] = [
        ['net/minecraft/world/entity/ai/attributes/Attributes', 'f_22277_', 'FOLLOW_RANGE', 'Lnet/minecraft/world/entity/ai/attributes/Attribute;'],
        ['net/minecraft/world/entity/ai/targeting/TargetingConditions', 'f_26872_', 'DEFAULT', 'Lnet/minecraft/world/entity/ai/targeting/TargetingConditions;'],
        ['net/minecraft/world/level/material/Fluids', 'f_76195_', 'LAVA', 'Lnet/minecraft/world/level/material/FlowingFluid;'],
    ];
    fieldRefMap['z1gned/goetyrevelation/mixin/PlayerMixin'] = [
        ['net/minecraft/network/syncher/EntityDataSerializers', 'f_135028_', 'INT', 'Lnet/minecraft/network/syncher/EntityDataSerializer;'],
        ['net/minecraft/network/syncher/EntityDataSerializers', 'f_135029_', 'FLOAT', 'Lnet/minecraft/network/syncher/EntityDataSerializer;'],
        ['z1gned/goetyrevelation/mixin/PlayerMixin', 'f_19797_', 'tickCount', 'I'],
        ['z1gned/goetyrevelation/mixin/PlayerMixin', 'f_19804_', 'entityData', 'Lnet/minecraft/network/syncher/SynchedEntityData;'],
        ['net/minecraft/tags/DamageTypeTags', 'f_268415_', 'IS_EXPLOSION', 'Lnet/minecraft/tags/TagKey;'],
        ['net/minecraft/world/damagesource/DamageTypes', 'f_268724_', 'FELL_OUT_OF_WORLD', 'Lnet/minecraft/resources/ResourceKey;'],
        ['net/minecraft/tags/DamageTypeTags', 'f_268745_', 'IS_FIRE', 'Lnet/minecraft/tags/TagKey;'],
        ['net/minecraft/world/level/Level', 'f_46429_', 'NETHER', 'Lnet/minecraft/resources/ResourceKey;'],
        ['net/minecraft/world/level/Level', 'f_46441_', 'random', 'Lnet/minecraft/util/RandomSource;'],
        ['net/minecraft/world/level/Level', 'f_46443_', 'isClientSide', 'Z'],
    ];
    fieldRefMap['z1gned/goetyrevelation/mixin/StringRenderOutputMixin'] = [
        ['net/minecraft/client/gui/Font$StringRenderOutput', 'f_181362_', 'mode', 'Lnet/minecraft/client/gui/Font$DisplayMode;'],
        ['net/minecraft/client/gui/Font$StringRenderOutput', 'f_92937_', 'bufferSource', 'Lnet/minecraft/client/renderer/MultiBufferSource;'],
        ['net/minecraft/client/gui/Font$StringRenderOutput', 'f_92939_', 'dropShadow', 'Z'],
        ['net/minecraft/client/gui/Font$StringRenderOutput', 'f_92940_', 'dimFactor', 'F'],
        ['net/minecraft/client/gui/Font$StringRenderOutput', 'f_92941_', 'r', 'F'],
        ['net/minecraft/client/gui/Font$StringRenderOutput', 'f_92942_', 'g', 'F'],
        ['net/minecraft/client/gui/Font$StringRenderOutput', 'f_92943_', 'b', 'F'],
        ['net/minecraft/client/gui/Font$StringRenderOutput', 'f_92944_', 'a', 'F'],
        ['net/minecraft/client/gui/Font$StringRenderOutput', 'f_92945_', 'pose', 'Lorg/joml/Matrix4f;'],
        ['net/minecraft/client/gui/Font$StringRenderOutput', 'f_92947_', 'packedLightCoords', 'I'],
        ['net/minecraft/client/gui/Font$StringRenderOutput', 'f_92948_', 'x', 'F'],
        ['net/minecraft/client/gui/Font$StringRenderOutput', 'f_92949_', 'y', 'F'],
    ];
    fieldRefMap['z1gned/goetyrevelation/mixin/SummonRitualMixin'] = [
        ['net/minecraft/world/level/Level', 'f_46441_', 'random', 'Lnet/minecraft/util/RandomSource;'],
    ];
    fieldRefMap['z1gned/goetyrevelation/mixin/TargetGoalMixin'] = [
        ['net/minecraft/world/entity/MobType', 'f_21641_', 'UNDEAD', 'Lnet/minecraft/world/entity/MobType;'],
        ['net/minecraft/world/entity/ai/goal/target/TargetGoal', 'f_26135_', 'mob', 'Lnet/minecraft/world/entity/Mob;'],
    ];
    fieldRefMap['z1gned/goetyrevelation/mixin/WitherSkullSpellMixin'] = [
        ['net/minecraft/sounds/SoundEvents', 'f_11705_', 'BLAZE_SHOOT', 'Lnet/minecraft/sounds/SoundEvent;'],
        ['net/minecraft/world/phys/Vec3', 'f_82479_', 'x', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82480_', 'y', 'D'],
        ['net/minecraft/world/phys/Vec3', 'f_82481_', 'z', 'D'],
    ];
    fieldRefMap['z1gned/goetyrevelation/mixin/ZPiglinServantMixin'] = [
        ['z1gned/goetyrevelation/mixin/ZPiglinServantMixin', 'f_21345_', 'goalSelector', 'Lnet/minecraft/world/entity/ai/goal/GoalSelector;'],
        ['net/minecraft/world/entity/ai/attributes/Attributes', 'f_22279_', 'MOVEMENT_SPEED', 'Lnet/minecraft/world/entity/ai/attributes/Attribute;'],
    ];
    fieldRefMap['z1gned/goetyrevelation/mixin/ZombieSpellMixin'] = [
        ['net/minecraft/world/effect/MobEffects', 'f_19596_', 'MOVEMENT_SPEED', 'Lnet/minecraft/world/effect/MobEffect;'],
        ['net/minecraft/world/item/Items', 'f_42396_', 'NETHERITE_AXE', 'Lnet/minecraft/world/item/Item;'],
        ['net/minecraft/world/item/Items', 'f_42480_', 'NETHERITE_HELMET', 'Lnet/minecraft/world/item/Item;'],
        ['net/minecraft/world/item/Items', 'f_42481_', 'NETHERITE_CHESTPLATE', 'Lnet/minecraft/world/item/Item;'],
        ['net/minecraft/world/item/Items', 'f_42482_', 'NETHERITE_LEGGINGS', 'Lnet/minecraft/world/item/Item;'],
        ['net/minecraft/world/item/Items', 'f_42483_', 'NETHERITE_BOOTS', 'Lnet/minecraft/world/item/Item;'],
        ['net/minecraft/world/level/Level', 'f_46441_', 'random', 'Lnet/minecraft/util/RandomSource;'],
    ];
    var targets = {};
    var seen = {};
    for (var i = 0; i < fixes.length; i++) {
        var cls = fixes[i][0];
        if (!seen[cls]) {
            seen[cls] = true;
            targets['gtgcore_fix_inj_' + i] = {
                'target': { 'type': 'CLASS', 'name': cls },
                'transformer': makeTransformer()
            };
        }
    }
    // @Shadow 字段引用改写的类也要注册 transformer（可能没有注入注解条目）
    for (var fk in fieldRefMap) {
        if (!seen[fk]) {
            seen[fk] = true;
            targets['gtgcore_fix_inj_field_' + fk.replace(/\//g, '_')] = {
                'target': { 'type': 'CLASS', 'name': fk },
                'transformer': makeTransformer()
            };
        }
    }
    return targets;
}
