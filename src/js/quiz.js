
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

  const userAnswers = { type , trait };
  localStorage.setItem('quizAnswers', JSON.stringify(userAnswers));

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);

    const typeData = await res.json();
    const allPokemon = typeData.pokemon.map(p => p.pokemon); // array of { name, url }

    // Filter by type included in name 
    const filtered = allPokemon.filter(pokemon =>
      pokemon.name.includes(type)
    );

    // Function to pick a random Pokémon from a list that meets Pokédex ID <= 1025
    async function pickValidPokemon(pokemonList) {
      // Shuffle the list to randomize
      const shuffled = pokemonList.sort(() => 0.5 - Math.random());

      for (const pkm of shuffled) {
        const pokeRes = await fetch(pkm.url);
        if (!pokeRes.ok) continue; // skip if fetch failed

        const pokeData = await pokeRes.json();
        if (pokeData.id <= 1025) {
          return pkm; // valid Pokémon found
        }
      }
      return null; // none found under 1026
    }

    // Pick from filtered list first
    let selected = await pickValidPokemon(filtered);

    // If none found in filtered, try allPokémon list
    if (!selected) {
      selected = await pickValidPokemon(allPokemon);
    }

    // If still none found, fallback to klang
    if (!selected) {
      selected = { name: 'klang' };
    }

    window.location.href = `results.html?pokemon=${selected.name}`;
  } catch (error) {
    console.error("Failed to fetch Pokémon:", error);
    window.location.href = `results.html?pokemon=klang`;
  }
});
