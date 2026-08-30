// priority: 100
ServerEvents.recipes(event => {
    event.remove({ output: /botania:apothecary_.*/ });
    event.remove({ output: /botania:.*_mushroom/ });
});
