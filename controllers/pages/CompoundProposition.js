function checkAnswer(answer, resultId) {
  if (answer === 'Verdadeiro' || answer === 'V' || answer === 'False') {
    var color = '#89CF7D';
    document.getElementById(resultId).innerHTML = 'A resposta está <b>correta</b>.';
    document.getElementById(resultId).style.color = color;
  } else {
    var color = '#E35D79';
    document.getElementById(resultId).innerHTML = 'A resposta está <b>incorreta</b>.';
    document.getElementById(resultId).style.color = color;
  }
}