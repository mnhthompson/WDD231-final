

document.getElementById('quizForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const form = e.target;

  // Dynamically gather all form input values
  const formData = new FormData(form);
  const userAnswers = {};
  for (const [key, value] of formData.entries()) {
    userAnswers[key] = value;
  }

  // Save all answers to localStorage for later filtering
  localStorage.setItem('quizAnswers', JSON.stringify(userAnswers));

  // Redirect to result page (no Pokémon specified yet)
  window.location.href = 'result.html';
});
