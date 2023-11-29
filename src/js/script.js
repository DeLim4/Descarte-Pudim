  // Lista para armazenar os descartados
  var produtosDescartados = [];

  //  tipos de produtos 
  var tiposDeProdutos = {
      pudins125g: [
          "Pudim Leite moça - Indivudual",
          "Pudim Doce de Leite - Indivudual",
          "Pudim Baunilha - Indivudual",
          "Pudim Choco. Belga - Indivudual",
          "Pudim Nutella - Indivudual",
          "Pudim 3 Leites - Indivudual",
          "Pudim Café - Indivudual",
          "Pudim Cocada - Indivudual",
          "Pudim Zero Lactose - Indivudual",
          "Pudim Romeu e Julieta - Indivudual",
          "Pudim Parmesão - Indivudual",
          "Pudim Pistache - Indivudual",
          "Pudim Paçoca - Indivudual",
      ],
      pudins650g: [
          "Pudim Leite Moça - 650",
          "Pudim Doce de Leite - 650",
          "Pudim Baunilha - 650",
          "Pudim Choco Belga - 650",
          "Pudim Nutella - 650",
      ],
      pudins1Kg: [
          "Pudim Leite Moça- 1Kg",
          "Pudim Doce de Leite - 1Kg",
          "Pudim Baunilha - 1Kg",
          "Pudim Choco. Belga- 1Kg",
          "Pudim Nutella - 1Kg",
      ],
      bebidas: [
          "Coca Cola",
          "Coca Cola Zero",
          "Guaraná",
          "Guarana Zero",
          "H2O",
          "Pepsi Black",
      ],
      bolos: [
        "Chocolate c/ Brigadeiro",
        "Cenoura c/ Brigadeiro",
        "Casadinho",
        "Red velvet",
        "Prestigio",
        "Surpresa de Uva",
      ],
      brownie: [
        "Brownie c/ brigadeiro",
        "Brownie c ninho e nutella",
        
      ],
      brigadeiro: [
        "Tradicional",
          "Dark",
          "Casadinho",
          "Pistache",
        "Ninho c/ nutella"
        
      ],
      coxinha: [
        "Coxinha de Pistache",
          "Bombom de uva",
          "Brigadereiro no Belga",
          "Belga no belga",
        
    ],
    boloCaseiro:[
      "Laranja",
      "Cenoura c/ chocolate",
      "Chocolate c/ chocolate",
      "Fubá c/ goiabada",
      "Fubá",
      "Milho",
"RedVelvet",

    ],
      Caldas:[
        "Chocolate',
        "Goiabada",
        "Chocolate Branco",
      ]
   
  };

  // Adicionar um ouvinte de eventos para o tipo de produto
  document.getElementById("selecionarTipoProduto").addEventListener("change", atualizarProdutos);

  // Função para preencher dinamicamente as opções de produtos com base no tipo selecionado
  function atualizarProdutos() {
      var tipoSelecionado = document.getElementById("selecionarTipoProduto").value;
      var selectProduto = document.getElementById("selecionarProduto");
      
      selectProduto.innerHTML = ""; // Limpar as opções existentes

// Obter a lista de produtos com base no tipo selecionado
var produtosDoTipo = tiposDeProdutos[tipoSelecionado];

// Preencher as opções do produto com base na lista
produtosDoTipo.forEach(function (produto) {
var option = document.createElement("option");
option.value = produto; // Valor e texto são iguais
option.text = produto;
selectProduto.appendChild(option);
});
}

function adicionarProduto() {
var produtoSelecionado = document.getElementById("selecionarProduto");
var nomeProduto = produtoSelecionado.options[produtoSelecionado.selectedIndex].text;
var quantidadeProduto = parseInt(document.getElementById("quantidadeProduto").value, 10);
var localSelecionado = document.getElementById("selecionarLocal").value;

// Validar se os campos não estão vazios
if (isNaN(quantidadeProduto)) {
alert("Por favor, preencha a quantidade do produto.");
return;
}

// Verificar se o local já está na lista
var localExistente = produtosDescartados.find(function (produto) {
return produto.local === localSelecionado;
});

if (localExistente) {
// Se o local já existe, apenas adicionar o novo produto ou atualizar a quantidade
var produtoExistente = localExistente.produtos.find(function (p) {
  return p.nome === nomeProduto;
});

if (produtoExistente) {
  // Se o produto já existe, somar a quantidade
  produtoExistente.quantidade += quantidadeProduto;
} else {
  // Se o produto não existe, adicionar à lista de produtos do local
  localExistente.produtos.push({
      nome: nomeProduto,
      quantidade: quantidadeProduto
  });
}
} else {
// Se o local não existe, adicionar à lista
var novoLocal = {
  local: localSelecionado,
  produtos: [{
      nome: nomeProduto,
      quantidade: quantidadeProduto
  }]
};
produtosDescartados.push(novoLocal);
}

// Limpar os campos do formulário
document.getElementById("quantidadeProduto").value = "";

// Atualizar a lista de produtos na página
atualizarListaProdutos();
}

function atualizarListaProdutos() {
var listaProdutosElement = document.getElementById("listaProdutos");

// Limpar a lista antes de atualizar
listaProdutosElement.innerHTML = "";

// Adicionar cada local e seus produtos à lista
produtosDescartados.forEach(function (local) {
var listItemLocal = document.createElement("li");
listItemLocal.classList.add("local"); // Adicionar a classe para estilizar
listItemLocal.textContent = local.local;
listaProdutosElement.appendChild(listItemLocal);

local.produtos.forEach(function (produto) {
  var listItemProduto = document.createElement("li");
  listItemProduto.textContent = produto.quantidade + " unidade(s) de " + produto.nome;
  listaProdutosElement.appendChild(listItemProduto);
});
});
}

function copiarParaWhatsApp() {
var textoParaCopiar = "Lista de Produtos Descartados:\n";

produtosDescartados.forEach(function (local) {
textoParaCopiar += `${local.local}:\n`;

local.produtos.forEach(function (produto) {
  textoParaCopiar += `  - ${produto.quantidade} unidade(s) de ${produto.nome}\n`;
});
});

// Copiar para a área de transferência
navigator.clipboard.writeText(textoParaCopiar)
.then(function () {
  alert("Lista copiada para a área de transferência. Cole no WhatsApp.");
})
.catch(function (err) {
  console.error('Erro ao copiar para a área de transferência:', err);
});
}
