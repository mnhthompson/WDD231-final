
    
    import { runQuiz } from './quiz.js';
    
    const galarfilter = async (pokemonList) => {
      const shuffled = pokemonList.sort(() => 0.5 - Math.random());
      for (const pkm of shuffled) {
        try {
          const pokeRes = await fetch(pkm.url);
          if (!pokeRes.ok) continue;
          const pokeData = await pokeRes.json();
          if (pokeData.id >= 810 && pokeData.id <= 905) return pkm;
        } catch {
          continue;
        }
      }
      return null;
    };
    
    runQuiz(galarfilter);
    