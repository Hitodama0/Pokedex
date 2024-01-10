const container = document.getElementById("container");
const pokemonNameInput = document.getElementById("pokemonName");
const searchButton = document.getElementById("search");

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
    container.textContent = "";
    const pokemons = await fetchPokemon();
    for (const pokemon of pokemons) {
        const pokemonDetails = await fetchPokemonDetails(pokemon.url);

        const pokemonDiv = document.createElement("div");
        pokemonDiv.classList.add("pokemonDiv");
        const pokemonName = document.createElement("p");
        pokemonName.classList.add("pokemonName");
        const pokemonImg = document.createElement("img");
        pokemonImg.classList.add("pokemonImg");
        const pokemonType = document.createElement("p");
        pokemonType.classList.add("pokemonType");
        const typesArray = [];

        for (const type of pokemonDetails.types) {
            typesArray.push(type.type.name.toUpperCase());
        }

        pokemonName.textContent = pokemonDetails.name.toUpperCase();
        pokemonImg.src = pokemonDetails.sprites.front_default;
        pokemonType.textContent = typesArray.join(", ");

        if (typesArray[0] === "GRASS") {
            pokemonDiv.classList.add("grass");
        } else if (typesArray[0] === "FIRE") {
            pokemonDiv.classList.add("fire");
        } else if (typesArray[0] === "WATER") {
            pokemonDiv.classList.add("water");
        } else if (typesArray[0] === "NORMAL") {
            pokemonDiv.classList.add("normal");
        } else if (typesArray[0] === "BUG") {
            pokemonDiv.classList.add("bug");
        } else if (typesArray[0] === "POISON") {
            pokemonDiv.classList.add("poison");
        } else if (typesArray[0] === "ELECTRIC") {
            pokemonDiv.classList.add("electric");
        } else if (typesArray[0] === "GROUND") {
            pokemonDiv.classList.add("ground");
        } else if (typesArray[0] === "FAIRY") {
            pokemonDiv.classList.add("fairy");
        } else if (typesArray[0] === "FOGHTING") {
            pokemonDiv.classList.add("fighting");
        }

        pokemonDiv.appendChild(pokemonName);
        pokemonDiv.appendChild(pokemonImg);
        pokemonDiv.appendChild(pokemonType);

        container.appendChild(pokemonDiv);
    }
}

displayPokemon();