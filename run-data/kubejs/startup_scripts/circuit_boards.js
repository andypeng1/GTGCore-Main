// priority: 10

StartupEvents.registry('item', event => {
    const circuits = ['bioware', 'optical']
    circuits.forEach((circuit) => {
        event.create('gtceu:' + circuit + '_processor')
        event.create('gtceu:' + circuit + '_assembly')
        event.create('gtceu:' + circuit + '_computer')
        event.create('gtceu:' + circuit + '_mainframe')
        event.create('gtceu:' + circuit + '_circuit_board')
        event.create('gtceu:' + circuit + '_printed_circuit_board')
        event.create('gtceu:smd_capacitor_' + circuit)
        event.create('gtceu:smd_diode_' + circuit)
        event.create('gtceu:smd_resistor_' + circuit)
        event.create('gtceu:smd_transistor_' + circuit)
        event.create('gtceu:smd_inductor_' + circuit)
    })
    // bioware 中间件
    event.create('gtceu:bioware_boule')
    event.create('gtceu:bioware_chip')
    event.create('gtceu:bioware_processing_core')
    event.create('gtceu:biological_cells')
    // optical 中间件
    event.create('gtceu:optical_soc')
    event.create('gtceu:optical_soc_containment_housing')
    event.create('gtceu:optical_slice')
    event.create('gtceu:optical_processing_core')
    event.create('gtceu:optical_wafer')
    event.create('gtceu:optical_ram_wafer')
    event.create('gtceu:optical_ram_chip')
    event.create('gtceu:photon_carrying_wafer')
    event.create('gtceu:raw_photon_carrying_wafer')
    event.create('gtceu:non_linear_optical_lens')
        .texture('gtceu:item/yellow_glass_lens')
})
