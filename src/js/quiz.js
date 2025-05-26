document.getElementById('quizForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const environment = form.environment.value.trim().toLowerCase();
  const trait = form.trait.value.trim().toLowerCase();

  const userAnswers = { environment, trait };
  localStorage.setItem('quizAnswers', JSON.stringify(userAnswers));

  try {
    // Fetch full Pokémon list (names and URLs)
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
    const data = await res.json();
    const allPokemon = data.results;

    // Flexible filtering logic: checks if name contains either value
    const filtered = allPokemon.filter(pokemon =>
      pokemon.name.includes(environment) || pokemon.name.includes(trait)
    );

    // Pick random from filtered list or default to Klang
    const selected = filtered.length > 0
      ? filtered[Math.floor(Math.random() * filtered.length)]
      : { name: 'klang' };

    // Go to result page with only Pokémon name
    window.location.href = `result.html?pokemon=${selected.name}`;
  } catch (error) {
    console.error("Failed to fetch Pokémon:", error);
    window.location.href = `result.html?pokemon=klang`; // fallback on error
  }
});
