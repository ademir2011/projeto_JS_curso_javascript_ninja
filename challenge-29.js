(function(DOM) {
  "use strict";

  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"

  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.

  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.

  Essas informações devem ser adicionadas no HTML via Ajax.

  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js.

  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */

  var app = function() {
    var $headersElements = new DOM('[data-js="dadosHeader"]');
    var $FormData = new DOM('[data-js="dadosForm"]');
    var $TableData = new DOM('[data-js="dadosTable"]');
    var $button = new DOM("button");

    var ajax = new XMLHttpRequest();

    var populaDadosHeader = function(json) {
      console.log("-- POPULANDO DADOS HEADERS --");
      $headersElements.get()[0].textContent = json.name;
      $headersElements.get()[1].textContent = json.phone;
    };

    var isRequest = function() {
      return ajax.status === 200 && ajax.readyState === 4 ? true : false;
    };

    var ajaxReadyStateChange = function() {
      if (isRequest()) {
        populaDadosHeader(JSON.parse(ajax.responseText));
      }
    };

    var populaDadosTabela = function() {
      $FormData.forEach(function($item, index) {
        $TableData.get()[index].textContent = $item.value;
      });
    };

    var handlerButton = function(e) {
      e.preventDefault();
      populaDadosTabela();
    };

    $button.on("click", handlerButton);

    var ajaxHeader = function() {
      ajax.open("GET", "/challenge-29/company.json");
      ajax.send();
      ajax.addEventListener("readystatechange", ajaxReadyStateChange, false);
    };

    ajaxHeader();
  };

  app();
})(window.DOM);
