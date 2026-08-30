StartupEvents.registry('item', event => {
    const ids = [
        'lv', 'mv', 'hv', 'ev', 'iv', 'luv', 'zpm', 'uv', 'uhv',
        'uev', 'uiv', 'ulv', 'uxv', 'opv', 'max'
    ];
    ids.forEach(id => {
        event.create(`gtceu:${id}_universal_circuit`, 'basic');
    });
});