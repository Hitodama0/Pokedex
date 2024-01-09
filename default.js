const container = document.getElementById("container");
const pokemonNameInput = document.getElementById("pokemonName");
const searchButton = document.getElementById("search");

searchButton.addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent form submission and page reload
    const name = pokemonNameInput.value.trim().toLowerCase();
    container.textContent = "";

    if (name !== "") {
        try {
            const pokemon = await searchPokemon(name);
            if (pokemon) {
                displayPokemon([pokemon]);
            } else {
                console.log("Pokemon not found");
            }
        } catch (error) {
            console.error(error);
        }
    }
});

// ... rest of your code


async function searchPokemon(pokemonName) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const pokemon = await response.json();
    return pokemon;
}

// ... rest of your code



async function fetchPokemonDetails(url) {
  const request = new Request(url);

  try {
    const response = await fetch(request);
    const pokemonDetails = await response.json();

    return pokemonDetails;
  } catch (error) {
    console.log("Error fetching Pokemon details");
  }
}

async function fetchPokemon() {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=1305"; 
  const request = new Request(url);

  try {
    const response = await fetch(request);
    const pokemonList = await response.json();

    return pokemonList.results;
  } catch (error) {
    console.log("Error fetching Pokemon list");
  }
}

async function displayPokemon() {
  const pokemonList = await fetchPokemon();

  container.textContent = "";
  for (const pokemon of pokemonList) {
    const pokemonDetails = await fetchPokemonDetails(pokemon.url);

    const pokemonDiv = document.createElement("div")
    pokemonDiv.classList.add("pokemonDiv")
    const pokemonName = document.createElement("p");
    pokemonName.classList.add("pokemonName")
    const pokemonImg = document.createElement("img");
    pokemonImg.classList.add("pokemonImg")
    const pokemonType = document.createElement("p");
    pokemonType.classList.add("pokemonType")
    const typesArray = [];

    for(const type of pokemonDetails.types) {
        typesArray.push(type.type.name)
    }
    
    pokemonName.textContent = pokemonDetails.name;
    pokemonImg.src = pokemonDetails.sprites.front_default;
    pokemonType.textContent = typesArray.join(", ");
    
    if(typesArray[0] === "grass") {
        pokemonDiv.classList.add("grass")
    } else if (typesArray[0] === "fire"){
        pokemonDiv.classList.add("fire")
    } else if (typesArray[0] === "water") {
        pokemonDiv.classList.add("water")
    } else if (typesArray[0] === "normal") {
        pokemonDiv.classList.add("normal")
    } else if (typesArray[0] === "bug") {
        pokemonDiv.classList.add("bug")
    } else if (typesArray[0] === "poison") {
        pokemonDiv.classList.add("poison")
    } else if (typesArray[0] === "electric") {
        pokemonDiv.classList.add("electric")
    } else if (typesArray[0] === "ground") {
        pokemonDiv.classList.add("ground")
    } else if (typesArray[0] === "fairy") {
        pokemonDiv.classList.add("fairy")
    } else if (typesArray[0] === "fighting") {
        pokemonDiv.classList.add("fighting")
    } 


    pokemonDiv.appendChild(pokemonName);
    pokemonDiv.appendChild(pokemonImg)
    pokemonDiv.appendChild(pokemonType)

    container.appendChild(pokemonDiv)
  }
}

displayPokemon();
