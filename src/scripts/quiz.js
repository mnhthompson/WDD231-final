document.getElementById('quizForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const form = e.target;
  const environment = form.environment.value;
  const trait = form.trait.value;

  const userAnswers = { environment, trait };
  localStorage.setItem('quizAnswers', JSON.stringify(userAnswers));

  // Sample Pokémon filtering logic (replace this with real logic)
  const allPokemon = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
    .then(res => res.json())
    .then(data => data.results);

  // Dummy logic: filter Pokémon by name including trait/environment
  let filtered = allPokemon.filter(p =>
    p.name.includes(trait.toLowerCase()) || p.name.includes(environment.toLowerCase())
  );

  let selectedPokemon;
  if (filtered.length > 0) {
    selectedPokemon = filtered[Math.floor(Math.random() * filtered.length)];
  } else {
    selectedPokemon = { name: 'klang' }; // Fallback
  }

  // Navigate to result page with Pokémon name in query
  window.location.href = `result.html?pokemon=${selectedPokemon.name}`;
});
