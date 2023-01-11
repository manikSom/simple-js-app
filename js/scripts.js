/*  defined pokemonRepository and wrap in IIFE to avoid accidentally 
    accessing the global state */
let pokemonRepository = (function() {
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

    function add(pokemon){
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll
    };

}) ();

//  adding new Pokemons with the new add function
pokemonRepository.add({ name: 'Floragato', height: 0.9, type: ['Grass'] });
pokemonRepository.add({ name: 'Crocalor', height: 1.0, type: ['Fire'] });
pokemonRepository.add({ name: 'Quaxwell', height: 1.2, type: ['Water'] });

/*  have used forEach instead of the usual for loop to loop around all entries
    since the list is protected by IIFE */
pokemonRepository.getAll().forEach(function(pokemon) {
    //  for the pokemons with height more than 1m, Wow that's big shall be shown next to it
    if (pokemon.height >=1) {
        document.write(pokemon.name + " (height: " + pokemon.height + "m) - Wow, that's big!" + "<br>")
        }
    else if (pokemon.height >= 0.6 && pokemon.height < 1) {
        document.write(pokemon.name + " (height: " + pokemon.height + "m) - That's a small pokemon!" + "<br>")
        }
    else {
        document.write(pokemon.name + " (height: " + pokemon.height + "m) - That's a very small pokemon!" + "<br>")
        }
});