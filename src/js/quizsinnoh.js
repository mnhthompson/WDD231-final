const environmentTypeMap = {
  forest: "grass",
  mountains: "rock",
  ocean: "water",
  city: "electric",
  desert: "ground",
  cave: "dark",
  swamp: "poison",
  plains: "normal",
  tundra: "ice",
  jungle: "bug",
  volcano: "fire",
  river: "flying",
  beach: "fairy",
  grassland: "fighting",
  urban: "steel",
  mountain_peak: "psychic"
};

document.getElementById('quizForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const environment = form.environment.value.trim().toLowerCase();
  const trait = form.trait.value.trim().toLowerCase();
  const color = form.color.value.trim().toLowerCase();

  const type = environmentTypeMap[environment] || "steel";

  const userAnswers = { environment, type, trait, color };
  localStorage.setItem('quizAnswers', JSON.stringify(userAnswers));

  try {
    // Fetch Pokémon by type
    const typeRes = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const typeData = await typeRes.json();
    const typePokemon = typeData.pokemon.map(p => p.pokemon); 

    // Fetch Pokémon by color
    const colorRes = await fetch(`https://pokeapi.co/api/v2/pokemon-color/${color}`);
    const colorData = await colorRes.json();
    const colorPokemon = colorData.pokemon_species.map(species => {
      // The color endpoint returns species, we need to convert to Pokémon endpoint url
      const id = species.url.split('/').filter(Boolean).pop();
      return {
        name: species.name,
        url: `https://pokeapi.co/api/v2/pokemon/${id}/`
      };
    });

    // Find intersection by name (Pokémon that are both type and color)
    const typeNames = new Set(typePokemon.map(p => p.name));
    const intersectPokemon = colorPokemon.filter(p => typeNames.has(p.name));

    // Function to pick a valid Pokémon (id <= 1025)
    async function pickValidPokemon(pokemonList) {
      const shuffled = pokemonList.sort(() => 0.5 - Math.random());

      for (const pkm of shuffled) {
        try {
          const pokeRes = await fetch(pkm.url);
          if (!pokeRes.ok) continue;

          const pokeData = await pokeRes.json();
          if (pokeData.id >= 387 && pokeData.id <= 493) {
            return pkm;
          }
        } catch {
          continue;
        }
      }
      return null;
    }

    // Pick from intersection list first, fallback to type list, fallback to color list
    let selected = await pickValidPokemon(intersectPokemon);

    if (!selected) {
      selected = await pickValidPokemon(typePokemon);
    }

    if (!selected) {
      selected = await pickValidPokemon(colorPokemon);
    }

    if (!selected) {
      selected = { name: 'klang' };
    }

    window.location.href = `results.html?pokemon=${selected.name}`;
  } catch (error) {
    console.error("Failed to fetch Pokémon:", error);
    window.location.href = `results.html?pokemon=klang`;
  }
});
