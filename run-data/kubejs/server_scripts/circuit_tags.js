// priority: 100

ServerEvents.tags('item', event => {
    const tiers = ['ulv', 'lv', 'mv', 'hv', 'ev', 'iv', 'luv', 'zpm', 'uv', 'uhv', 'uev', 'uiv', 'uxv', 'opv', 'max'];

    tiers.forEach(tier => {
        const item = 'gtceu:' + tier + '_universal_circuit';
        event.add('gtceu:circuits', item);
        event.add('gtceu:circuits/' + tier, item);
    });

    event.add('gtceu:circuits/zpm', 'gtceu:bioware_processor')
    event.add('gtceu:circuits/uv', ['gtceu:optical_processor', 'gtceu:bioware_assembly'])
    event.add('gtceu:circuits/uhv', ['gtceu:optical_assembly', 'gtceu:bioware_computer'])
    event.add('gtceu:circuits/uev', ['gtceu:optical_computer', 'gtceu:bioware_mainframe'])
    event.add('gtceu:circuits/uiv', 'gtceu:optical_mainframe')

    event.add('gtceu:circuits', [
        'gtceu:bioware_processor', 'gtceu:optical_processor',
        'gtceu:bioware_assembly', 'gtceu:optical_assembly',
        'gtceu:bioware_computer', 'gtceu:optical_computer',
        'gtceu:bioware_mainframe', 'gtceu:optical_mainframe'
    ])
});
