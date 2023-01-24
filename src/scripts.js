/*  defined pokemonRepository and wrap in IIFE to avoid accidentally 
    accessing the global state */
let pokemonRepository = (function () {
    let pokemonList = []
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let pokemonListElement = document.querySelector('.pokemon-list');
    let inputField = document.querySelector('.search');
    let pokemonModal = document.querySelector('.modal-dialog');

    function showLoadingSpinner(spinnerLocation) {
        let spinnerContainer = document.createElement('div');
        spinnerContainer.classList.add('text-center');

        let loadingSpinner = document.createElement('div');
        loadingSpinner.classList.add('spinner-border');
        loadingSpinner.setAttribute('role', 'status');

        let spinnerText = document.createElement('span');
        spinnerText.classList.add('sr-only');
        spinnerText.innerText = 'Loading...';

        loadingSpinner.appendChild(spinnerText);
        spinnerContainer.appendChild(loadingSpinner);
        spinnerLocation.appendChild(spinnerContainer);
    }

    function hideLoadingSpinner(spinnerLocation) {
        spinnerLocation.removeChild(spinnerLocation.lastChild);
    }

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    /* from bootstrap list group item and button */
    function addListItem(pokemon) {
        loadDetails(pokemon).then(function () {
            let listPokemon = document.createElement('li');
            listPokemon.classList.add('col');

            let button = document.createElement('button');
            let buttonText = document.createElement('h2');
            button.appendChild(buttonText);
            buttonText.innerText =
                pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            button.classList.add('pokemon-button');
            button.setAttribute('data-toggle', 'modal');
            button.setAttribute('data-target', '.modal');

            let pokemonImage = document.createElement('img');
            pokemonImage.src = pokemon.frontImageUrl;
            button.appendChild(pokemonImage);

            listPokemon.appendChild(button);
            printedList.appendChild(listPokemon);

            // Triggering showDetails() of respective Pokemon upon button click
            button.addEventListener('click', function () {
                showDetails(pokemon);
            });
        });
    }

    // search box functionality
    function filterPokemons(query) {
        return pokemonList.filter(function (pokemon) {
            // toLowerCase() method to make input not case-sensitive
            let pokemonLowerCase = pokemon.name.toLowerCase();
            let queryLowerCase = query.toLowerCase();
            return pokemonLowerCase.startsWith(queryLowerCase);
        });
    }
    inputField.addEventListener('input', function () {
        let query = inputField.value;
        let filteredList = filterPokemons(query);
        removeList();
        if (filteredList.length === 0) {
            showErrorMessage(
                'Sorry. There are no Pokémon matching your search criteria.'
            );
        } else {
            filteredList.forEach(addListPokemon);
        }
    });

    /* getting data from the pokemon API using promise */
    function loadList() {
        let spinnerLocation = document.querySelector('.main');
        showLoadingSpinner(spinnerLocation);
    
        return fetch(apiUrl)
          .then(function (response) {
            return response.json();
          })
          .then(function (json) {
            hideLoadingSpinner(spinnerLocation);
            pokemonArray = json.results;
            pokemonArray.forEach(function (item) {
              let pokemon = {
                name: item.name,
                detailsUrl: item.url,
              };
              add(pokemon);
            });
          })
          .catch(function (e) {
            hideLoadingSpinner(spinnerLocation);
            removeList();
            hideModal();
            showErrorMessage(
              "There don't seem to be any Pokémon around. If you are not offline, try again later."
            );
            console.error(e);
          });
    }

    function loadDetails(item) {
        let spinnerLocation = document.querySelector('.modal-body');
        showLoadingSpinner(spinnerLocation);

        let url = pokemon.detailsUrl;

        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                hideLoadingSpinner(spinnerLocation);
                // Adding details to Pokemon by defining pokemon object-keys.
                pokemon.frontImageUrl = details.sprites.front_default;
                pokemon.backImageUrl = details.sprites.back_default;
                pokemon.height = details.height;

                let arrayOfTypes = [];
                details.types.forEach(function (item) {
                    arrayOfTypes.push(item.type.name);
                });
                // Defining separator between printed array items
                pokemon.types = arrayOfTypes.join(', ');

                let arrayOfAbilities = [];
                details.abilities.forEach(function (item) {
                    arrayOfAbilities.push(item.ability.name);
                });
                pokemon.abilities = arrayOfAbilities.join(', ');
            })
            .catch(function (e) {
                hideLoadingSpinner(spinnerLocation);
                console.error(e);
            });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            let modalTitle = document.querySelector('.modal-title');
            let modalBody = document.querySelector('.modal-body');

            // Clearing previous modal content
            modalTitle.innerHTML = '';
            modalBody.innerHTML = '';

            // Creating modal content elements
            let nameElement = document.querySelector('.modal-title');
            nameElement.innerText =
                pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

            let imageElementFront = document.createElement('img');
            imageElementFront.classList.add('modal-img');
            imageElementFront.src = pokemon.frontImageUrl;

            let imageElementBack = document.createElement('img');
            imageElementBack.classList.add('modal-img');
            imageElementBack.src = pokemon.backImageUrl;

            let modalText = document.createElement('div');
            modalText.classList.add('modal-text');

            let heightElement = document.createElement('p');
            heightElement.innerText = 'Height: ' + pokemon.height / 10 + ' m';

            let typesElement = document.createElement('p');
            typesElement.innerText = 'Types: ' + pokemon.types;

            let abilitiesElement = document.createElement('p');
            abilitiesElement.innerText = 'Abilities: ' + pokemon.abilities;

            modalBody.appendChild(imageElementFront);
            modalBody.appendChild(imageElementBack);
            modalBody.appendChild(modalText);
            modalText.appendChild(heightElement);
            modalText.appendChild(typesElement);
            modalText.appendChild(abilitiesElement);
        });
    }

    // Called in case of loading error and while executing search
    function removeList() {
        printedList.innerHTML = '';
    }

    // Called in case of loading error and when manually hiding modal
    function hideModal() {
        pokemonModal.classList.add('hidden');
    }

    // Hiding modal using Escape key.
    window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            hideModal();
        }
    });

    function showErrorMessage(message) {
        let errorMessage = document.createElement('p');
        errorMessage.classList.add('error-message');
        errorMessage.classList.add('col-6');
        errorMessage.innerText = message;

        printedList.appendChild(errorMessage);
    }

    return {
        showLoadingSpinner: showLoadingSpinner,
        hideLoadingSpinner: hideLoadingSpinner,
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        filterPokemons: filterPokemons,
        removeList: removeList,
        hideModal: hideModal,
        showErrorMessage: showErrorMessage
    };

})();

/* this displays all the pokemons from the API list*/
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});