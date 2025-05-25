// Helper to get query params
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Save result in localStorage (instead of cookie for more space)
function saveResult(pokemonData) {
  const stored = localStorage.getItem("pokemonResults");
  const results = stored ? JSON.parse(stored) : [];

  // Avoid duplicates by Pokémon name; keep last 10
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

// Render Pokémon full details
function renderPokemon(data) {
  const container = document.getElementById("pokemon-result");
  container.innerHTML = `
    <div class="pokemon-card">
      <h2>${data.name.toUpperCase()} (#${data.id})</h2>
      <img src="${data.sprites.other['official-artwork'].front_default}" alt="${data.name}" />
      <p><strong>Types:</strong> ${data.types.map(t => t.type.name).join(", ")}</p>
      <p><strong>Abilities:</strong> ${data.abilities.map(a => a.ability.name).join(", ")}</p>
      <p><strong>Height:</strong> ${(data.height / 10).toFixed(1)} m</p>
      <p><strong>Weight:</strong> ${(data.weight / 10).toFixed(1)} kg</p>
      <p><strong>Base Experience:</strong> ${data.base_experience}</p>

      <h3>Stats</h3>
      <ul>
        ${data.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join("")}
      </ul>

      <h3>Moves (first 10)</h3>
      <ul>
        ${data.moves.slice(0, 10).map(m => `<li>${m.move.name}</li>`).join("")}
      </ul>

      ${data.held_items.length ? `<h3>Held Items</h3><ul>${data.held_items.map(i => `<li>${i.item.name}</li>`).join("")}</ul>` : ""}
    </div>
  `;
}

// Display list of previous results as clickable links
function showPreviousResults() {
  const ul = document.getElementById("previous-results-list");
  const stored = localStorage.getItem("pokemonResults");
  if (!stored) {
    ul.innerHTML = "<li>No previous results found.</li>";
    return;
  }

  const results = JSON.parse(stored).slice().reverse(); // latest first

  ul.innerHTML = results.map(p => 
    `<li><a href="result.html?pokemon=${p.name}">${p.name.toUpperCase()} (#${p.id}) - ${new Date(p.date).toLocaleDateString()}</a></li>`
  ).join("");
}

// Main function to load current Pokémon and show previous
async function main() {
  const name = getQueryParam("pokemon");
  if (!name) {
    document.getElementById("pokemon-result").textContent = "No Pokémon specified in URL.";
    showPreviousResults();
    return;
  }

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    if (!res.ok) throw new Error("Pokémon not found.");
    const data = await res.json();

    document.title = `${data.name.toUpperCase()} | Pokémon Quiz Result`;
    renderPokemon(data);
    saveResult(data);
    showPreviousResults();
  } catch (e) {
    document.getElementById("pokemon-result").textContent = e.message;
    showPreviousResults();
  }
}

main();
