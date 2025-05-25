document.getElementById('quizForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const form = e.target;
  const environment = form.environment.value;
  const trait = form.trait.value;

  const userAnswers = { environment, trait };
  localStorage.setItem('quizAnswers', JSON.stringify(userAnswers));

  window.location.href = 'result.html';
});
