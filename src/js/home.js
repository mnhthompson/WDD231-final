const slots = [
  document.getElementById("slot1"),
  document.getElementById("slot2"),
  document.getElementById("slot3")
];

const links = [
  document.getElementById("link1"),
  document.getElementById("link2"),
  document.getElementById("link3")
];

let currentIndexes = [1, 4, 7]; // Start with 3 different Pokémon

// Fetch and update a Pokémon slot and its link
async function updatePokemonSlot(slot, id, link) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) throw new Error("Failed to fetch Pokémon");

    const data = await res.json();
    const image = data.sprites.other['official-artwork'].front_default;
    const name = data.name;

    slot.style.opacity = 0;
    setTimeout(() => {
      slot.src = image;
      slot.alt = name;
      slot.title = name.toUpperCase();
      link.href = `results.html?pokemon=${encodeURIComponent(name)}`;
      slot.style.opacity = 1;
    }, 1000);
  } catch (err) {
    console.error("Error fetching Pokémon:", err);
  }
}

// Cycle through Pokémon IDs and update slots
function cyclePokemon() {
  slots.forEach((slot, i) => {
    currentIndexes[i] = (currentIndexes[i] + 1) % 1025 || 1;
    updatePokemonSlot(slot, currentIndexes[i], links[i]);
  });
}

// Start carousel
cyclePokemon();
setInterval(cyclePokemon, 5000);
