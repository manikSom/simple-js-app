let pokemonList = [
    {
        name: "Butterfree",
        height: 1.1,
        type: ["bug","flying"],
    },

    {
        name: "Charizad",
        height: 1.7,
        type: ["fire","flying"],
    },

    {
        name: "Bulbasaur",
        height: 0.7,
        type: ["grass", "poison"]
    },

    {
        name: "Ivysaur",
        height: 1,
        type: ["grass", "poison"]
    },

    {
        name: "Venusaur",
        height: 2,
        type: ["grass", "poison"]
    },

    {
        name: "Metapod",
        height : 0.7,
        type: "bug",
    }
]

for (let i = 0; i < pokemonList.length; i++) {
    // for the pokemons with height more than 1m, Wow that's big shall be shown next to it
    if (pokemonList[i].height >=1) {
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + "m) - Wow, that's big!" + "<br>")
        }
    else if (pokemonList[i].height >= 0.6 && pokemonList[i].height < 1) {
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + "m) - That's a small pokemon!" + "<br>")
        }
    else {
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + "m) - That's a very small pokemon!" + "<br>")
        }
}