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

  // Display on page
  document.getElementById('pokemonName').innerText = name.toUpperCase();
  document.getElementById('pokemonType').innerText = type;
  document.getElementById('pokemonImage').src =
    `https://img.pokemondb.net/artwork/large/${name}.jpg`;
  document.getElementById('pokemonImage').alt = name;
}

displayPokemon();
