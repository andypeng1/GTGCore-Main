// priority: 10
StartupEvents.registry('item', event => {
    event.create('kubejs:overworld_data', 'basic').texture('gtceu:item/machine_memory_card');
    event.create('kubejs:nether_data', 'basic').texture('gtceu:item/machine_memory_card');
    event.create('kubejs:end_data', 'basic').texture('gtceu:item/machine_memory_card');
});
