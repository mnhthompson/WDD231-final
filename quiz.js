document.getElementById('quizForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const environment = form.environment.value;
  const trait = form.trait.value;
  const color = form.color.value;

  // A very simple matching algorithm (you can expand this!)
  let type = 'normal';
  if (environment === 'forest' && trait === 'calm') type = 'grass';
  if (environment === 'ocean' && trait === 'playful') type = 'water';
  if (environment === 'mountains' && trait === 'brave') type = 'rock';
  if (environment === 'city' && trait === 'loyal') type = 'electric';

  const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  const data = await response.json();

  const pokemonList = data.pokemon;
  const randomIndex = Math.floor(Math.random() * pokemonList.length);
  const pokemonName = pokemonList[randomIndex].pokemon.name;

  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `<h2>You got ${pokemonName.toUpperCase()}!</h2>
    <img src="https://img.pokemondb.net/artwork/large/${pokemonName}.jpg" alt="${pokemonName}" />
    <p>Type: ${type}</p>`;
});
