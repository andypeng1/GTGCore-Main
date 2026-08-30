// priority: 100

ServerEvents.tags('item', event => {
    event.add('twilightforest:portal/activator', 'twilightforest:twilight_gem');
    event.remove('twilightforest:portal/activator', '#forge:gems/diamond');
});

ServerEvents.recipes(event => {
    const dyes = [
        'black_dye', 'red_dye', 'green_dye', 'brown_dye',
        'blue_dye', 'purple_dye', 'cyan_dye', 'light_gray_dye',
        'gray_dye', 'pink_dye', 'lime_dye', 'yellow_dye',
        'light_blue_dye', 'magenta_dye', 'orange_dye', 'white_dye'
    ];

    dyes.forEach(dye => {
        event.recipes.gtceu.assembler(`twilight_gem_from_${dye}`)
            .itemInputs('2x #gtceu:circuits/mv', '1x gtceu:ender_pearl_dust', '4x gtceu:silicon_wafer', '4x gtceu:diamond_dust')
            .inputFluids(Fluid.of(`gtceu:${dye}`, 3456))
            .itemOutputs('1x twilightforest:twilight_gem')
            .duration(1200)
            .EUt(120);
    });
});
