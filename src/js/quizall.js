
    
    import { runQuiz } from './quiz.js';
    
    const allFilter = async (pokemonList) => {
      const shuffled = pokemonList.sort(() => 0.5 - Math.random());
      for (const pkm of shuffled) {
        try {
          const pokeRes = await fetch(pkm.url);
          if (!pokeRes.ok) continue;
          const pokeData = await pokeRes.json();
          if (pokeData.id <= 1025) return pkm;
        } catch {
          continue;
        }
      }
      return null;
    };
    
    runQuiz(allFilter);
    