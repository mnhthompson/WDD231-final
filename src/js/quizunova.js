
    
    import { runQuiz } from './quiz.js';
    
    const unovaFilter = async (pokemonList) => {
      const shuffled = pokemonList.sort(() => 0.5 - Math.random());
      for (const pkm of shuffled) {
        try {
          const pokeRes = await fetch(pkm.url);
          if (!pokeRes.ok) continue;
          const pokeData = await pokeRes.json();
          if (pokeData.id >= 494 && pokeData.id <= 649) return pkm;
        } catch {
          continue;
        }
      }
      return null;
    };
    
    runQuiz(unovaFilter);
    