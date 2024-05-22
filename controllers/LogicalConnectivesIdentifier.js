function identificarConectivos() {
  var proposicao = document.getElementById("proposicao").value.toLowerCase();
  var conectivosEquivalentes = {
    "~": ["não", "não é o caso que", "não é verdade que", "é falso que"],
    "∧": ["\\be\\b", "também", "além de", "além disso", "\\bmas\\b", "porém", "ainda", "contudo"],
    "∨": ["\\bou\\b"],
    ">": ["\\bse\\b.*\\bentão\\b", "apenas se", "no caso de", "condição de que"],
    "<>": ["\\bse e somente se\\b"]
  };
  var conectivosNomes = {
    "~": "Negação",
    "∧": "Conjunção",
    "∨": "Disjunção",
    ">": "Condicional",
    "<>": "Bicondicional"
  };
  var conectivosEncontrados = [];

  for (var conectivo in conectivosEquivalentes) {
    var palavrasChave = conectivosEquivalentes[conectivo];
    for (var i = 0; i < palavrasChave.length; i++) {
      var palavraChave = palavrasChave[i];
      var regex = new RegExp(palavraChave, 'gi');
      var match;
      while ((match = regex.exec(proposicao)) !== null) {
        conectivosEncontrados.push({
          simbolo: conectivo,
          nome: conectivosNomes[conectivo],
          posicao: match.index
        });
      }
    }
  }

  conectivosEncontrados.sort(function(a, b) {
    return a.posicao - b.posicao;
  });

  var resultadoFinal = [];
  var posicaoAtual = -1;
  for (var j = 0; j < conectivosEncontrados.length; j++) {
    if (conectivosEncontrados[j].posicao >= posicaoAtual) {
      resultadoFinal.push(conectivosEncontrados[j]);
      posicaoAtual = conectivosEncontrados[j].posicao + conectivosEncontrados[j].nome.length;
    }
  }

  if (resultadoFinal.length === 0) {
    document.getElementById("resultado").innerHTML = "Nenhum conectivo encontrado.";
  } else {
    var resultado = "";
    for (var k = 0; k < resultadoFinal.length; k++) {
      resultado += resultadoFinal[k].nome + " (" + resultadoFinal[k].simbolo + ")";
      if (k < resultadoFinal.length - 1) {
        resultado += ", ";
      }
    }
    document.getElementById("resultado").innerHTML = resultado;
  }
}