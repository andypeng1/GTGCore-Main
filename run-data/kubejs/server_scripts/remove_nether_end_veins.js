// priority: 100
GTCEuServerEvents.oreVeins(event => {
    event.removeAll((id, vein) => {
        const dims = vein.dimensionFilter();
        if (!dims) return false;
        let hit = false;
        for (const dim of dims) {
            const loc = String(dim.location());
            if (loc === 'minecraft:the_nether' || loc === 'minecraft:the_end') {
                hit = true;
                break;
            }
        }
        return hit;
    });
});
