// Helper to get query params
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Save result in localStorage (stores up to 10 recent results)
function saveResult(pokemonData) {
  const stored = localStorage.getItem("pokemonResults");
  const results = stored ? JSON.parse(stored) : [];

  // Avoid duplicates, keep last 10
  const filtered = results.filter(r => r.name !== pokemonData.name);
  filtered.push({
    name: pokemonData.name,
    id: pokemonData.id,
    sprite: pokemonData.sprites.other['official-artwork'].front_default,
    types: pokemonData.types.map(t => t.type.name),
    date: new Date().toISOString()
  });

  const last10 = filtered.slice(-10);
  localStorage.setItem("pokemonResults", JSON.stringify(last10));
}

// Render Pokémon result to page
function renderPokemon(data) {
  const container = document.getElementById("pokemon-result");
  container.innerHTML = `
<div class="pokemon-card">
  <h2 class="pokemon-name">${data.name.toUpperCase()} <span class="pokemon-id">#${data.id}</span></h2>

  <div class="pokemon-main">
    <img src="${data.sprites.other['official-artwork'].front_default}" alt="${data.name}" class="pokemon-image" />
    <audio controls class="pokemon-cry">
      <source src="https://play.pokemonshowdown.com/audio/cries/${data.name.toLowerCase()}.mp3" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
    <div class="pokemon-info">
      <p><strong>Types:</strong> ${data.types.map(t => t.type.name).join(", ")}</p>
      <p><strong>Abilities:</strong> ${data.abilities.map(a => a.ability.name).join(", ")}</p>
      <p><strong>Height:</strong> ${(data.height / 10).toFixed(1)} m</p>
      <p><strong>Weight:</strong> ${(data.weight / 10).toFixed(1)} kg</p>
      <p><strong>Base Experience:</strong> ${data.base_experience}</p>
    </div>
  </div>

  <div class="pokemon-section">
    <h3>📊 Stats</h3>
    <ul class="stat-list">
      ${data.stats.map(stat => `<li><strong>${stat.stat.name}:</strong> ${stat.base_stat}</li>`).join("")}
    </ul>
  </div>

  <div class="pokemon-section">
    <h3>🎯 Moves (Top 10)</h3>
    <ul class="move-list">
      ${data.moves.slice(0, 10).map(m => `<li>${m.move.name}</li>`).join("")}
    </ul>
  </div>

  ${data.held_items.length ? `
    <div class="pokemon-section">
      <h3>🎒 Held Items</h3>
      <ul class="item-list">
        ${data.held_items.map(i => `<li>${i.item.name}</li>`).join("")}
      </ul>
    </div>
  ` : ""}
</div>
  `;
}

// Show previous results in dropdown (mobile) and grid (desktop)
function showPreviousResults() {
  const stored = localStorage.getItem("pokemonResults");
  const results = stored ? JSON.parse(stored).slice().reverse() : [];

  const dropdown = document.getElementById("previousDropdown");
  const grid = document.getElementById("previousGrid");

  // Clear old content
  dropdown.innerHTML = "";
  grid.innerHTML = "";

  if (!results.length) {
    const noResults = document.createElement("p");
    noResults.textContent = "No previous results.";
    grid.appendChild(noResults);
    return;
  }

  // Populate desktop grid
  results.forEach(p => {
    const img = document.createElement("img");
    img.src = p.sprite;
    img.alt = p.name;
    img.title = `${p.name.toUpperCase()} (#${p.id})`;
    img.addEventListener("click", () => {
      window.location.href = `results.html?pokemon=${p.name}`;
    });
    grid.appendChild(img);
  });

  // Populate mobile dropdown
  results.forEach(p => {
    const option = document.createElement("option");
    option.value = p.name;
    option.textContent = `${p.name.toUpperCase()} (#${p.id})`;
    dropdown.appendChild(option);
  });

  // Handle dropdown selection
  dropdown.addEventListener("change", e => {
    const selected = e.target.value;
    if (selected) {
      window.location.href = `results.html?pokemon=${selected}`;
    }
  });

  // Toggle dropdown visibility
  const toggleBtn = document.getElementById("dropdownToggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      dropdown.classList.toggle("hidden");
    });
  }
}

// Fetch and render Pokémon by name, fallback to Klang
async function loadPokemonByName(name) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    if (!res.ok) throw new Error("Not found");
    const data = await res.json();
    return data;
  } catch {
    const fallback = await fetch("https://pokeapi.co/api/v2/pokemon/klang");
    if (!fallback.ok) throw new Error("Fallback Pokémon not found.");
    return await fallback.json();
  }
}

// Main entry
async function main() {
  let name = getQueryParam("pokemon") || "klang";
  try {
    const data = await loadPokemonByName(name);
    document.title = `${data.name.toUpperCase()} | Pokémon Quiz Result`;
    renderPokemon(data);
    saveResult(data);
  } catch (e) {
    document.getElementById("pokemon-result").textContent = e.message;
  }

  showPreviousResults();
}

window.addEventListener('DOMContentLoaded', main);

const dropdown = document.getElementById("previousDropdown");
const grid = document.getElementById("previousGrid");


document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const menu = document.getElementById("mobile-menu");

  if (toggleBtn && menu) {
    toggleBtn.addEventListener("click", () => {
      menu.classList.toggle("show");
    });
  }
});
