(function(DOM) {
  "use strict";

  var app = function() {
    var $headersElements = new DOM('[data-js="dadosHeader"]');
    var $FormData = new DOM('[data-js="dadosForm"]');
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

    var handlerButtonCancelar = function(e) {};

    var populaDadosTabela = function() {
      console.log("-- POPULANDO DADOS TABELA --");
      var $table = document.querySelector('[data-js="table"]');
      var $tr = document.createElement("tr");
      var $td;
      $FormData.forEach(function($item) {
        $td = document.createElement("td");
        $td.textContent = $item.value;
        $tr.appendChild($td);
      });

      var $buttonCancelar = document.createElement("button");
      $buttonCancelar.setAttribute("type", "submit");
      $buttonCancelar.textContent = "Cancelar";
      $buttonCancelar.addEventListener("click", handlerButtonCancelar, false);
      $td = document.createElement("td");
      $td.appendChild($buttonCancelar);
      $tr.appendChild($td);
      $table.appendChild($tr);
    };

    var handlerButton = function(e) {
      e.preventDefault();
      populaDadosTabela();
    };

    var ajaxHeader = function() {
      ajax.open("GET", "/company.json");
      ajax.send();
      ajax.addEventListener("readystatechange", ajaxReadyStateChange, false);
    };

    $button.on("click", handlerButton);

    ajaxHeader();
  };

  app();
})(window.DOM);
