function checkAnswer(answer, resultId) {
  if (answer === 'Veradeiro' || answer === 'F' || answer === 'True') {
    document.getElementById(resultId).innerText = 'Você acertou!';
  } else {
    document.getElementById(resultId).innerText = 'Você errou, tente novamente.';
  }
}