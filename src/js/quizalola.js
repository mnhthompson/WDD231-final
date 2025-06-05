



async function pickValidPokemon(pokemonList) {
  const shuffled = pokemonList.sort(() => 0.5 - Math.random());

  for (const pkm of shuffled) {
    try {
      const pokeRes = await fetch(pkm.url);
      if (!pokeRes.ok) continue;

      const pokeData = await pokeRes.json();

      // ✅ Alola range
      if (pokeData.id >= 722 && pokeData.id <= 809) {
        return pkm;
      }
    } catch {
      continue;
    }
  }

  return null;
}

// alola.js
import { runQuiz } from './quiz.js';


runQuiz(pickValidPokemon);
