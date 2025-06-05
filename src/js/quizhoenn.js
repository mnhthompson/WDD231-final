
        
        import { runQuiz } from './quiz.js';
        
        const hoennfilter = async (pokemonList) => {
          const shuffled = pokemonList.sort(() => 0.5 - Math.random());
          for (const pkm of shuffled) {
            try {
              const pokeRes = await fetch(pkm.url);
              if (!pokeRes.ok) continue;
              const pokeData = await pokeRes.json();
              if (pokeData.id >= 252 && pokeData.id <= 386) return pkm;
            } catch {
              continue;
            }
          }
          return null;
        };
        
        runQuiz(hoennfilter);
        