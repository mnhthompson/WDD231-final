
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

  const userAnswers = { environment, trait };
  localStorage.setItem('quizAnswers', JSON.stringify(userAnswers));


  const type = environmentTypeMap[environment] || "steel"; // fallback if map fails


  try {
    // Fetch full Pokémon list (names and URLs)
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
    const data = await res.json();
    const allPokemon =  typeData.pokemon.map(p => p.pokemon);

    // Flexible filtering logic: checks if name contains either value
    const filtered = allPokemon.filter(pokemon =>
        pokemon.name.includes(type) 
    );

    // || pokemon.name.includes(trait) || pokemon.name.includes(color)

    // Pick random from filtered list or default to Klang
    const selected = filtered.length > 0
      ? filtered[Math.floor(Math.random() * filtered.length)]
      : { name: 'klang' };

    // Go to result page with only Pokémon name
    window.location.href = `results.html?pokemon=${selected.name}`;
  } catch (error) {
    console.error("Failed to fetch Pokémon:", error);
    window.location.href = `results.html?pokemon=klang`; // fallback on error
  }
});



