// priority: 100
ItemEvents.tooltip(event => {
    const text = '内部蕴含着迷宫的力量';
    const colors = [0x7B2FBE, 0x9D4EDD, 0xC77DFF, 0xE0AAFF, 0xC77DFF, 0x9D4EDD];
    let line = Text.empty();
    Array.from(text).forEach((ch, i) => {
        line = line.append(Text.of(ch).color(colors[i % colors.length]));
    });
    event.add('twilightforest:twilight_gem', line);
});
