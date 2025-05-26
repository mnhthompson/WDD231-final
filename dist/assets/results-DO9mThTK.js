import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css              */function m(e){return new URLSearchParams(window.location.search).get(e)}function l(e){const o=localStorage.getItem("pokemonResults"),n=(o?JSON.parse(o):[]).filter(i=>i.name!==e.name);n.push({name:e.name,id:e.id,sprite:e.sprites.other["official-artwork"].front_default,types:e.types.map(i=>i.type.name),date:new Date().toISOString()});const s=n.slice(-10);localStorage.setItem("pokemonResults",JSON.stringify(s))}function a(e){const o=document.getElementById("pokemon-result");o.innerHTML=`
    <div class="pokemon-card">
      <h2>${e.name.toUpperCase()} (#${e.id})</h2>
      <img src="${e.sprites.other["official-artwork"].front_default}" alt="${e.name}" />
      <p><strong>Types:</strong> ${e.types.map(t=>t.type.name).join(", ")}</p>
      <p><strong>Abilities:</strong> ${e.abilities.map(t=>t.ability.name).join(", ")}</p>
      <p><strong>Height:</strong> ${(e.height/10).toFixed(1)} m</p>
      <p><strong>Weight:</strong> ${(e.weight/10).toFixed(1)} kg</p>
      <p><strong>Base Experience:</strong> ${e.base_experience}</p>

      <h3>Stats</h3>
      <ul>
        ${e.stats.map(t=>`<li>${t.stat.name}: ${t.base_stat}</li>`).join("")}
      </ul>

      <h3>Moves (first 10)</h3>
      <ul>
        ${e.moves.slice(0,10).map(t=>`<li>${t.move.name}</li>`).join("")}
      </ul>

      ${e.held_items.length?`<h3>Held Items</h3><ul>${e.held_items.map(t=>`<li>${t.item.name}</li>`).join("")}</ul>`:""}
    </div>
  `}function r(){const e=document.getElementById("previous-results-list"),o=localStorage.getItem("pokemonResults");if(!o){e.innerHTML="<li>No previous results found.</li>";return}const t=JSON.parse(o).slice().reverse();e.innerHTML=t.map(n=>`<li><a href="result.html?pokemon=${n.name}">${n.name.toUpperCase()} (#${n.id}) - ${new Date(n.date).toLocaleDateString()}</a></li>`).join("")}async function p(){let e=m("pokemon");e||(e="klang");try{const o=await fetch(`https://pokeapi.co/api/v2/pokemon/${e.toLowerCase()}`);if(!o.ok){const n=await fetch("https://pokeapi.co/api/v2/pokemon/klang");if(!n.ok)throw new Error("Fallback Pokémon not found.");const s=await n.json();document.title="KLANG | Pokémon Quiz Result",a(s),l(s),r();return}const t=await o.json();document.title=`${t.name.toUpperCase()} | Pokémon Quiz Result`,a(t),l(t),r()}catch(o){document.getElementById("pokemon-result").textContent=o.message,r()}}p();
