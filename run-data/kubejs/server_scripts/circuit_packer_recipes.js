// priority: 100

ServerEvents.recipes(event => {
    const tierCircuits = {
        ulv: ['gtceu:vacuum_tube', 'gtceu:nand_chip'],
        lv: ['gtceu:basic_electronic_circuit', 'gtceu:basic_integrated_circuit', 'gtceu:microchip_processor'],
        mv: ['gtceu:good_electronic_circuit', 'gtceu:good_integrated_circuit', 'gtceu:micro_processor'],
        hv: ['gtceu:advanced_integrated_circuit', 'gtceu:micro_processor_assembly', 'gtceu:nano_processor'],
        ev: ['gtceu:micro_processor_computer', 'gtceu:nano_processor_assembly', 'gtceu:quantum_processor'],
        iv: ['gtceu:micro_processor_mainframe', 'gtceu:nano_processor_computer', 'gtceu:quantum_processor_assembly', 'gtceu:crystal_processor'],
        luv: ['gtceu:nano_processor_mainframe', 'gtceu:quantum_processor_computer', 'gtceu:crystal_processor_assembly', 'gtceu:wetware_processor'],
        zpm: ['gtceu:quantum_processor_mainframe', 'gtceu:crystal_processor_computer', 'gtceu:wetware_processor_assembly'],
        uv: ['gtceu:crystal_processor_mainframe', 'gtceu:wetware_processor_computer'],
        uhv: ['gtceu:wetware_processor_mainframe'],
    };

    for (const [tier, circuits] of Object.entries(tierCircuits)) {
        circuits.forEach(circuit => {
            const name = circuit.split(':')[1];
            event.recipes.gtceu.packer('kubejs:packer/' + tier + '_universal_circuit_from_' + name)
                .itemInputs('1x ' + circuit)
                .itemOutputs('gtceu:' + tier + '_universal_circuit')
                .duration(100)
                .EUt(30);
        });
    }

    const gtlCircuits = {
        zpm: ['gtceu:bioware_processor'],
        uv: ['gtceu:optical_processor', 'gtceu:bioware_assembly'],
        uhv: ['gtceu:optical_assembly', 'gtceu:bioware_computer'],
        uev: ['gtceu:optical_computer', 'gtceu:bioware_mainframe'],
        uiv: ['gtceu:optical_mainframe'],
    };

    for (const [tier, circuits] of Object.entries(gtlCircuits)) {
        circuits.forEach(circuit => {
            const name = circuit.split(':')[1];
            event.recipes.gtceu.packer('kubejs:packer/' + tier + '_universal_circuit_from_' + name)
                .itemInputs('1x ' + circuit)
                .itemOutputs('gtceu:' + tier + '_universal_circuit')
                .duration(100)
                .EUt(30);
        });
    }
});
