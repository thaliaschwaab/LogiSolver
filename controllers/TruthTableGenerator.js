function navMainPage() {
  window.location.href = "../index.html";
}

function parseExpression(expr) {
  expr = expr.replace(/\s+/g, '');
  let validChars = /^[A-Z()!&|<=>]+$/;
  if (!validChars.test(expr)) {
    return {error: 'A expressão contém caracteres inválidos, por favor, siga o padrão informado o painel.'};
  }

  let variables = new Set(expr.match(/[A-Z]/g));
  variables = Array.from(variables);

  let combinations = generateCombinations(variables.length);
  let table = [];

  combinations.forEach(combination => {
    let context = {};
    variables.forEach((variable, index) => {
      context[variable] = combination[index];
    });

    let intermediateResults = evaluateWithIntermediates(expr, context);
    table.push({
      ...context,
      ...intermediateResults
    });
  });

  return {variables, table, expressions: Object.keys(table[0]).filter(key => !variables.includes(key))};
}

function generateCombinations(n) {
  let results = [];
  for (let i = 0; i < Math.pow(2, n); i++) {
    let combination = [];
    for (let j = n - 1; j >= 0; j--) {
      combination.push((i & (1 << j)) ? true : false);
    }
    results.push(combination);
  }
  return results;
}

function evaluateWithIntermediates(expr, context) {
  let subExpressions = extractSubExpressions(expr);
  let results = {};

  subExpressions.forEach(subExpr => {
    results[subExpr] = evaluate(subExpr, context);
  });

  results[expr] = evaluate(expr, context);
  return results;
}

function extractSubExpressions(expr) {
  let subExpressions = [];
  let stack = [];
  let start = 0;
  for (let i = 0; i < expr.length; i++) {
    if (expr[i] === '(') {
      stack.push(i);
    } else if (expr[i] === ')') {
      start = stack.pop();
      if (stack.length === 0) {
        subExpressions.push(expr.slice(start + 1, i));
      }
    }
  }

  subExpressions.push(expr);
  return subExpressions;
}

function evaluate(expr, context) {
  expr = expr.replace(/([A-Z])/g, (match) => context[match] ? 'true' : 'false');

  expr = expr.replace(/!/g, '!')
             .replace(/&&/g, '&&')
             .replace(/\|\|/g, '||')
             .replace(/<=>/g, ' === ')
             .replace(/=>/g, ' <= ');

  return Function('"use strict";return (' + expr + ')')();
}

function generateTruthTable() {
  const expression = document.getElementById('expression').value;
  const {error, variables, table, expressions} = parseExpression(expression);
  const resultDiv = document.getElementById('truthTable');

  if (error) {
    const evaluationResult = document.getElementById('evaluationResult');
    evaluationResult.style.color = "red";
    document.getElementById('evaluationResult').innerHTML = error;
    return;
  }

  let html = '<table><tr>';
  variables.forEach(variable => {
      html += `<th>${variable}</th>`;
  });
  expressions.forEach(exp => {
      html += `<th>${exp}</th>`;
  });
  html += '</tr>';

  let lastColumnResults = [];

  table.forEach(row => {
    html += '<tr>';
    variables.forEach(variable => {
      html += `<td>${row[variable] ? 'V' : 'F'}</td>`;
    });
    expressions.forEach((exp, index) => {
      let result = row[exp] ? 'V' : 'F';
      if (index === expressions.length - 1) {
        lastColumnResults.push(row[exp]);
      }
      html += `<td>${result}</td>`;
    });
    html += '</tr>';
  });

  html += '</table>';
  resultDiv.innerHTML = html;

  const evaluationResult = evaluateResults(lastColumnResults);
  document.getElementById('evaluationResult').style.color = "#074785";
  document.getElementById('evaluationResult').innerHTML = evaluationResult;
}

function evaluateResults(results) {
  if (results.every(result => result === true)) {
    return 'A expressão é uma tautologia, já que toda a coluna de resultado retorna verdadeiro. Isso significa que a proposição é sempre verdadeira, independente dos valores ou variáveis envolvidas.';
  } else if (results.every(result => result === false)) {
    return 'A expressão é uma contradição, já que toda a coluna de resultado retorna falso. Isso significa que a proposição é sempre falsa, independente dos valores ou variáveis envolvidas.';
  } else {
    return 'A expressão é uma contingência, já que existem resultados verdadeiros e falsos na coluna de resultado. Isso significa que a proposição é verdadeira ou falsa dependendo dos valores e variáveis envolvidas.';
  }
}