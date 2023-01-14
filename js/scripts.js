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

    function addListItem (pokemon) {
        //index file has a list class with this name pokemon-list
        let repository = document.querySelector(".pokemon-list"); 
        let listPokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        //css file has setting for this button under button-class
        button.classList.add("button-class"); 
        //added event listener: returns all pokemon info to console when button is clicked
        button.addEventListener("click", (Event) => showDetails(pokemon));
        listPokemon.appendChild(button);
        repository.appendChild(listPokemon);
    }

    // this logs data in console, later task this function will be expanded
    function showDetails(pokemon){
        console.log(pokemon);
      }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };

}) ();

//  adding new Pokemons with the new add function
pokemonRepository.add({ name: 'Floragato', height: 0.9, type: ['Grass'] });
pokemonRepository.add({ name: 'Crocalor', height: 1.0, type: ['Fire'] });
pokemonRepository.add({ name: 'Quaxwell', height: 1.2, type: ['Water'] });

pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });