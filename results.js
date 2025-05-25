async function getPokemonType(answers) {
  const { environment, trait } = answers;

  if (environment === 'forest' && trait === 'calm') return 'grass';
  if (environment === 'ocean' && trait === 'playful') return 'water';
  if (environment === 'mountains' && trait === 'brave') return 'rock';
  if (environment === 'city' && trait === 'loyal') return 'electric';
  return 'normal';
}

async function fetchRandomPokemonByType(type) {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  const data = await res.json();
  const allPokemon = data.pokemon;
  const random = allPokemon[Math.floor(Math.random() * allPokemon.length)];
  return random.pokemon.name;
}

async function displayPokemon() {
  const answers = JSON.parse(localStorage.getItem('quizAnswers'));
  if (!answers) {
    document.getElementById('pokemonName').innerText = 'No quiz data found!';
    return;
  }

  const type = await getPokemonType(answers);
  const name = await fetchRandomPokemonByType(type);

  const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokeData = await pokeRes.json();

  // Display name and image
  document.getElementById('pokemonName').innerText = pokeData.name.toUpperCase();
  document.getElementById('pokemonImage').src = pokeData.sprites.other['official-artwork'].front_default;
  document.getElementById('pokemonImage').alt = pokeData.name;

  // Display types
  const types = pokeData.types.map(t => t.type.name).join(', ');
  document.getElementById('pokemonTypes').innerText = types;

  // Abilities
  const abilities = pokeData.abilities.map(a => a.ability.name).join(', ');
  document.getElementById('pokemonAbilities').innerText = abilities;

  // Stats
  const statsList = document.getElementById('pokemonStats');
  statsList.innerHTML = '';
  pokeData.stats.forEach(stat => {
    const li = document.createElement('li');
    li.textContent = `${stat.stat.name}: ${stat.base_stat}`;
    statsList.appendChild(li);
  });

  // Height & Weight (convert to meters and kg)
  document.getElementById('pokemonHeight').innerText = `${pokeData.height / 10} m`;
  document.getElementById('pokemonWeight').innerText = `${pokeData.weight / 10} kg`;

  // Held Items
  const items = pokeData.held_items.length > 0
    ? pokeData.held_items.map(i => i.item.name).join(', ')
    : 'None';
  document.getElementById('pokemonItems').innerText = items;

  // Sample Moves (limit to 5)
  const sampleMoves = pokeData.moves.slice(0, 5).map(m => m.move.name).join(', ');
  document.getElementById('pokemonMoves').innerText = sampleMoves;
}

displayPokemon();
