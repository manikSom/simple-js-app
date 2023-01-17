/*  defined pokemonRepository and wrap in IIFE to avoid accidentally 
    accessing the global state */
let pokemonRepository = (function() {
    let pokemonList = []
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon){
        "name" in pokemon &&
        "detailsUrl" in pokemon &&
        "imageURL" in pokemon
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

    /* getting data from the pokemon API using promise */  
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
            let pokemon = {
                name: item.name,
                detailsUrl: item.url
            };
            add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch(function (e) {     
          console.error(e);
        });
    }

    function showDetails(pokemon){
        loadDetails(pokemon).then(function(){
            console.log(pokemon);
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };

}) ();

/* this displays all the pokemons from the API list*/
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});