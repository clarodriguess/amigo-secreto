let AmigosSecretros = [];

function adicionarAmigo() {
  let input = document.getElementById("amigo");
  let nome = input.value.trim();

  if (nome === "") {
    alert("Por favor, digite um nome válido.");
    return;
  }

  // Verifica se o nome já está na lista 
  if (AmigosSecretros.includes(nome)) {
    alert("Esse nome já foi adicionado!");
    return;
  }

  AmigosSecretros.push(nome); // add o nome na lista
  input.value = ""; // limpa o campo input
  atualizaListaAmigos(); // atualiza a lista visualmente
}

function atualizaListaAmigos() {
  let list = document.getElementById("listaAmigos");
  list.innerHTML = ""; // limpa a lista antes de atualizar

  for (let i = 0; i < AmigosSecretros.length; i++) {
    let li = document.createElement("li");
    li.textContent = AmigosSecretros[i];
    list.appendChild(li);
  }
}

function sortearAmigos() {
  if (AmigosSecretros.length < 2) {
    alert("Deve haver pelo menos 2 participantes para realizar o sorteio.");
    return;
  }

  let sorteioValido = false;
  let resultado = {};

  while (!sorteioValido) {
    let copia = [...AmigosSecretros];
    let sorteados = [];

    sorteioValido = true;

    for (let i = 0; i < AmigosSecretros.length; i++) {
      let nome = AmigosSecretros[i];

      // Remove o próprio nome da lista de opções
      let opcoes = copia.filter(n => n !== nome);

      if (opcoes.length === 0) {
        // Não há como sortear sem pegar a própria pessoa, sorteio inválido
        sorteioValido = false;
        break;
      }

      // Sorteia entre os disponíveis
      let indice = Math.floor(Math.random() * opcoes.length);
      let amigo = opcoes[indice];

      resultado[nome] = amigo;

      // Remove o sorteado da lista para os próximos
      copia = copia.filter(n => n !== amigo);
    }
  }

  // Exibe o resultado final
  let resultadoHTML = "<h3>RESULTADO DO SORTEIO:</h3><ul>";
  for (let nome in resultado) {
    resultadoHTML += `<li><strong>${nome}</strong> → ${resultado[nome]}</li>`;
  }
  resultadoHTML += "</ul>";

  document.getElementById("resultado").innerHTML = resultadoHTML;
}
