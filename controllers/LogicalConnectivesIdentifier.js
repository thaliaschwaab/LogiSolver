
function identificarConectivos() {
  var proposicao = document.getElementById("proposicao").value.toLowerCase();
  var conectivosEquivalentes = {
    "~": ["não", "não é o caso que", "não é verdade que"],
    "∧": ["e", "também", "além de"],
    "∨": ["ou", "mas"],
    ">": ["apenas se", "se", "então"],
    "<>": ["se e somente se"]
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
    if (conectivo === ">" || conectivo === "<>") {
      var indexSe = palavrasChave.indexOf("se");
      var indexEntao = palavrasChave.indexOf("então");
      if (indexSe !== -1 && indexEntao !== -1 && indexSe < indexEntao) {
        var indexProposicaoSe = proposicao.indexOf("se");
        var indexProposicaoEntao = proposicao.indexOf("então");
        if (indexProposicaoSe !== -1 && indexProposicaoEntao !== -1 && indexProposicaoSe < indexProposicaoEntao) {
          conectivosEncontrados.push({
            simbolo: conectivo,
            nome: conectivosNomes[conectivo]
          });
        }
      }
    } else {
      for (var i = 0; i < palavrasChave.length; i++) {
        if (proposicao.includes(palavrasChave[i])) {
          conectivosEncontrados.push({
            simbolo: conectivo,
            nome: conectivosNomes[conectivo]
          });
          break;
        }
      }
    }
  }

  if (conectivosEncontrados.length === 0) {
    document.getElementById("resultado").innerHTML = "Nenhum conectivo encontrado.";
  } else {
    var resultado = "Conectivos encontrados:<br>";
    for (var j = 0; j < conectivosEncontrados.length; j++) {
      resultado += conectivosEncontrados[j].nome + " (" + conectivosEncontrados[j].simbolo + ")";
      if (j < conectivosEncontrados.length - 1) {
        resultado += ", ";
      }
    }
    document.getElementById("resultado").innerHTML = resultado;
  }
}