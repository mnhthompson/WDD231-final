import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css              */function a(e){return new URLSearchParams(window.location.search).get(e)}function l(e){const t=localStorage.getItem("pokemonResults"),n=(t?JSON.parse(t):[]).filter(s=>s.name!==e.name);n.push({name:e.name,id:e.id,sprite:e.sprites.other["official-artwork"].front_default,types:e.types.map(s=>s.type.name),date:new Date().toISOString()});const r=n.slice(-10);localStorage.setItem("pokemonResults",JSON.stringify(r))}function m(e){const t=document.getElementById("pokemon-result");t.innerHTML=`
    <div class="pokemon-card">
      <h2>${e.name.toUpperCase()} (#${e.id})</h2>
      <img src="${e.sprites.other["official-artwork"].front_default}" alt="${e.name}" />
      <p><strong>Types:</strong> ${e.types.map(o=>o.type.name).join(", ")}</p>
      <p><strong>Abilities:</strong> ${e.abilities.map(o=>o.ability.name).join(", ")}</p>
      <p><strong>Height:</strong> ${(e.height/10).toFixed(1)} m</p>
      <p><strong>Weight:</strong> ${(e.weight/10).toFixed(1)} kg</p>
      <p><strong>Base Experience:</strong> ${e.base_experience}</p>

      <h3>Stats</h3>
      <ul>
        ${e.stats.map(o=>`<li>${o.stat.name}: ${o.base_stat}</li>`).join("")}
      </ul>

      <h3>Moves (first 10)</h3>
      <ul>
        ${e.moves.slice(0,10).map(o=>`<li>${o.move.name}</li>`).join("")}
      </ul>

      ${e.held_items.length?`
        <h3>Held Items</h3>
        <ul>${e.held_items.map(o=>`<li>${o.item.name}</li>`).join("")}</ul>
      `:""}
    </div>
  `}function c(){const e=document.getElementById("previous-results-list"),t=localStorage.getItem("pokemonResults");if(!t){e.innerHTML="<li>No previous results found.</li>";return}const o=JSON.parse(t).slice().reverse();e.innerHTML=o.map(n=>`<li><a href="result.html?pokemon=${encodeURIComponent(n.name)}">${n.name.toUpperCase()} (#${n.id}) - ${new Date(n.date).toLocaleDateString()}</a></li>`).join("")}async function p(e){try{const t=await fetch(`https://pokeapi.co/api/v2/pokemon/${e.toLowerCase()}`);if(!t.ok)throw new Error("Not found");return await t.json()}catch{const t=await fetch("https://pokeapi.co/api/v2/pokemon/klang");if(!t.ok)throw new Error("Fallback Pokémon not found.");return await t.json()}}async function i(){let e=a("pokemon")||"klang";try{const t=await p(e);document.title=`${t.name.toUpperCase()} | Pokémon Quiz Result`,m(t),l(t)}catch(t){document.getElementById("pokemon-result").textContent=t.message}c()}i();window.addEventListener("DOMContentLoaded",i);
