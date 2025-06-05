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

// Generate a random Pokémon ID (between 1 and 1025)
function getRandomPokemonId() {
  return Math.floor(Math.random() * 1025) + 1;
}

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

// Randomly assign new Pokémon to each slot
function cyclePokemon() {
  slots.forEach((slot, i) => {
    const randomId = getRandomPokemonId();
    updatePokemonSlot(slot, randomId, links[i]);
  });
}

// Start carousel
cyclePokemon();
setInterval(cyclePokemon, 5000);

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const menu = document.getElementById("mobile-menu");

  if (toggleBtn && menu) {
    toggleBtn.addEventListener("click", () => {
      menu.classList.toggle("show");
    });
  }
});
