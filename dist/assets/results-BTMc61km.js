import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css              */function a(e){return new URLSearchParams(window.location.search).get(e)}function l(e){const t=localStorage.getItem("pokemonResults"),i=(t?JSON.parse(t):[]).filter(o=>o.name!==e.name);i.push({name:e.name,id:e.id,sprite:e.sprites.other["official-artwork"].front_default,types:e.types.map(o=>o.type.name),date:new Date().toISOString()});const r=i.slice(-10);localStorage.setItem("pokemonResults",JSON.stringify(r))}function c(e){const t=document.getElementById("pokemon-result");t.innerHTML=`
<div class="pokemon-card">
  <h2 class="pokemon-name">${e.name.toUpperCase()} <span class="pokemon-id">#${e.id}</span></h2>

  <div class="pokemon-main">
    <img src="${e.sprites.other["official-artwork"].front_default}" alt="${e.name}" class="pokemon-image" />
    <audio controls class="pokemon-cry">
      <source src="https://play.pokemonshowdown.com/audio/cries/${e.name.toLowerCase()}.mp3" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
    <div class="pokemon-info">
      <p><strong>Types:</strong> ${e.types.map(n=>n.type.name).join(", ")}</p>
      <p><strong>Abilities:</strong> ${e.abilities.map(n=>n.ability.name).join(", ")}</p>
      <p><strong>Height:</strong> ${(e.height/10).toFixed(1)} m</p>
      <p><strong>Weight:</strong> ${(e.weight/10).toFixed(1)} kg</p>
      <p><strong>Base Experience:</strong> ${e.base_experience}</p>
    </div>
  </div>

  <div class="pokemon-section">
    <h3>📊 Stats</h3>
    <ul class="stat-list">
      ${e.stats.map(n=>`<li><strong>${n.stat.name}:</strong> ${n.base_stat}</li>`).join("")}
    </ul>
  </div>

  <div class="pokemon-section">
    <h3>🎯 Moves (Top 10)</h3>
    <ul class="move-list">
      ${e.moves.slice(0,10).map(n=>`<li>${n.move.name}</li>`).join("")}
    </ul>
  </div>

  ${e.held_items.length?`
    <div class="pokemon-section">
      <h3>🎒 Held Items</h3>
      <ul class="item-list">
        ${e.held_items.map(n=>`<li>${n.item.name}</li>`).join("")}
      </ul>
    </div>
  `:""}
</div>
  `}function m(){const e=localStorage.getItem("pokemonResults"),t=e?JSON.parse(e).slice().reverse():[],n=document.getElementById("previousDropdown"),i=document.getElementById("previousGrid");if(n.innerHTML="",i.innerHTML="",!t.length){const o=document.createElement("p");o.textContent="No previous results.",i.appendChild(o);return}t.forEach(o=>{const s=document.createElement("img");s.src=o.sprite,s.alt=o.name,s.title=`${o.name.toUpperCase()} (#${o.id})`,s.addEventListener("click",()=>{window.location.href=`results.html?pokemon=${o.name}`}),i.appendChild(s)}),t.forEach(o=>{const s=document.createElement("option");s.value=o.name,s.textContent=`${o.name.toUpperCase()} (#${o.id})`,n.appendChild(s)}),n.addEventListener("change",o=>{const s=o.target.value;s&&(window.location.href=`results.html?pokemon=${s}`)});const r=document.getElementById("dropdownToggle");r&&r.addEventListener("click",()=>{n.classList.toggle("hidden")})}async function p(e){try{const t=await fetch(`https://pokeapi.co/api/v2/pokemon/${e.toLowerCase()}`);if(!t.ok)throw new Error("Not found");return await t.json()}catch{const t=await fetch("https://pokeapi.co/api/v2/pokemon/klang");if(!t.ok)throw new Error("Fallback Pokémon not found.");return await t.json()}}async function d(){let e=a("pokemon")||"klang";try{const t=await p(e);document.title=`${t.name.toUpperCase()} | Pokémon Quiz Result`,c(t),l(t)}catch(t){document.getElementById("pokemon-result").textContent=t.message}m()}window.addEventListener("DOMContentLoaded",d);document.getElementById("previousDropdown");document.getElementById("previousGrid");
