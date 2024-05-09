function navMainPage() {
  window.location.href = "../index.html";
}

function generateTruthTable() {
  const expression = document.getElementById('expression').value;
  const variables = getVariables(expression);
  const tableHeader = '<tr><th>' + variables.join('</th><th>') + '</th><th>Resultado</th></tr>';
  let tableBody = '';
  let allResults = [];

  for (let i = 0; i < Math.pow(2, variables.length); i++) {
    const variableValues = getVariableValues(i, variables.length);
    const result = evaluateExpression(expression, variables, variableValues);
    allResults.push(result);
    tableBody += '<tr><td>' + variableValues.join('</td><td>') + '</td><td>' + result + '</td></tr>';
  }

  const truthTable = '<table>' + tableHeader + tableBody + '</table>';
  document.getElementById('truthTable').innerHTML = truthTable;

  const evaluation = evaluateResults(allResults);
  document.getElementById('evaluationResult').innerHTML = evaluation;
}

function getVariables(expression) {
  const regex = /[A-Za-z]/g;
  const matches = expression.match(regex);
  return [...new Set(matches)];
}

function getVariableValues(decimal, length) {
  const binary = decimal.toString(2).padStart(length, '0');
  return binary.split('').map(bit => bit === '1' ? 'V' : 'F');
}

function evaluateExpression(expression, variables, variableValues) {
  const replacedExpression = replaceVariables(expression, variables, variableValues);
  const formattedExpression = substituirCondicao(replacedExpression);
  const result = eval(formattedExpression);
  return result ? 'V' : 'F';
}


function replaceVariables(expression, variables, variableValues) {
  let replacedExpression = expression;
  variables.forEach((variable, index) => {
    const regex = new RegExp(variable, 'g');
    replacedExpression = replacedExpression.replace(regex, variableValues[index] === 'V');
  });
  return replacedExpression;
}

function substituirCondicao(expressao) {
  expressao = expressao.replace(/(\w+)\s*>\s*(\w+)/g, function (match, variavel1, variavel2) {
    return '(!' + variavel1 + ' || ' + variavel2 + ')';
  });
  expressao = expressao.replace(/(\w+)\s*<>\s*(\w+)/g, function (match, variavel1, variavel2) {
    return '(' + variavel1 + ' === ' + variavel2 + ')' + ' && ' + '(' + variavel1 + ' === ' + variavel2 + ')';
  });

  return expressao;
}

function evaluateResults(results) {
  if (results.every(result => result === 'V')) {
    return 'A expressão é uma tautologia, já que toda a coluna de resultado retorna verdadeiro. Isso significa que a proposição é sempre verdadeira, independente dos valores ou variáveis envolvidas.';
  } else if (results.every(result => result === 'F')) {
    return 'A expressão é uma contradição, já que toda a coluna de resultado retorna falso. Isso significa que a proposição é sempre falsa, independente dos valores ou variáveis envolvidas.';
  } else {
    return 'A expressão é uma contingência, já que existem resultados verdadeiros e falsos na coluna de resultado. Isso significa que a proposição é verdadeira ou falsa dependendo dos valores e variáveis envolvidas.';
  }
}