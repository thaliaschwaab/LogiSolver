function checkAnswer(answer, resultId) {
  if (answer === 'Veradeiro' || answer === 'V' || answer === 'False') {
    document.getElementById(resultId).innerText = 'Você acertou!';
  } else {
    document.getElementById(resultId).innerText = 'Você errou, tente novamente.';
  }
}