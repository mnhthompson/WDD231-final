
const slots = [
  document.getElementById("slot1"),
  document.getElementById("slot2"),
  document.getElementById("slot3")
];

let currentIndexes = [1, 4, 7]; // Start with 3 different Pokémon

// Fetch Pokémon data by ID and update the slot
async function updatePokemonSlot(slot, id) {
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
      slot.style.opacity = 1;
    }, 1000);
  } catch (err) {
    console.error("Error fetching Pokémon:", err);
  }
}

function cyclePokemon() {
  slots.forEach((slot, i) => {
    currentIndexes[i] = (currentIndexes[i] + 1) % 1025 || 1;
    updatePokemonSlot(slot, currentIndexes[i]);
  });
}

// Initial load
cyclePokemon();
setInterval(cyclePokemon, 5000); // Every 5 seconds

const links = [
  document.getElementById("link1"),
  document.getElementById("link2"),
  document.getElementById("link3")
];

async function updatePokemonSlot(slot, id, link) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
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
}

function cyclePokemon() {
  slots.forEach((slot, i) => {
    currentIndexes[i] = (currentIndexes[i] + 1) % 1025 || 1;
    updatePokemonSlot(slot, currentIndexes[i], links[i]);
  });
}
