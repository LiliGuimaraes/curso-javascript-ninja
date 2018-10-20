(function(DOM) {
  'use strict';

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

  function app() {

    return {
      // invoca outros métodos
      init: function init() {
        // referencia ao próprio objeto
        this.companyInfo();
        this.initEvents();

      },

      initEvents: function initEvents() {
        const $form = DOM('.form-car');
        $form.on('submit', this.handleSubmitForm);
      },

      handleSubmitForm: function handleSubmitForm(event) {
        event.preventDefault();

        const $inputsForm = DOM('[data-js="inputForm"]').get();

        if ( !app().validateForm($inputsForm) ) return;

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
          <td>
            <img src="${$inputsForm[0].value}" alt="Carro">
          </td>
          <td>${$inputsForm[1].value}</td>
          <td>${$inputsForm[2].value}</td>
          <td>${$inputsForm[3].value}</td>
          <td>${$inputsForm[4].value}</td>
        `;

        const $table = DOM('.table').get(0);
        console.log(DOM('.table').get(0)[0]);
        console.log(document.querySelector('.table'));
        $table.appendChild(newRow);
        app().clearInputs($inputsForm);
      },

      validateForm: function validateForm(inputsForm) {
        this.clearMessageError();
        let isInputEmpty = false;
        let isYearValid = true;
        let isPlateValid = true;
        let isURLValid = true;

        for (let input of inputsForm) {
          if (input.value === '' || input.value === null || input.value === undefined || input.value === ' ') {
            this.createMessageError(input, 'O campo não pode ficar em branco');
            isInputEmpty = true;
          }
        }

        if (!isInputEmpty) {
          if (!inputsForm[0].value.match(/^http[s]?:\/\//)) {
            this.createMessageError(inputsForm[0], 'URL inválida');
            isURLValid = false;
          }
          if (inputsForm[2].value.match(/\D/g) || inputsForm[2].value.length != 4) {
            this.createMessageError(inputsForm[2], 'Ano inválido');
            isYearValid = false;
          }

          inputsForm[3].value = inputsForm[3].value.replace(/-/, '');
          if(inputsForm[3].value.length !== 7) {
            this.createMessageError(inputsForm[3], 'Placa inválida');
            isPlateValid = false;
          }

          if (isYearValid && isPlateValid && isURLValid) return true;
        }

        return false;
      },

      clearMessageError: function clearMessageError() {
        const $formSpans = DOM('.form-car > div > div').get();
        for (let div of $formSpans) {
          div.remove();
        }
      },

      createMessageError: function createMessageError(element, message) {
          let newSpan = document.createElement('div');
          newSpan.innerHTML = message;
          element.parentNode.appendChild(newSpan);
      },

      clearInputs: function clearInputs(inputsForm) {
        for (let input of inputsForm) {
          input.value = '';
        }
      },

      companyInfo: function copmpanyInfo() {
        const ajax = new XMLHttpRequest();
        ajax.open('GET', 'company.json', true);
        ajax.send();

        // this se referencia ao objeto ajax
        ajax.addEventListener('readystatechange', this.handlerAjaxResponse, false);
      },

      handlerAjaxResponse: function handlerAjaxResponse() {
        /* chama o call para mudar o this da função, que antes
          era o objeto retornado, agora é o objeto ajax
        */
        if (app().isRequestOk.call(this)) {
          const companyInfo = JSON.parse(this.responseText);
          const $headerH1 = DOM('[data-js="companyName"]').get(0);
          const $headerParagraph = DOM('[data-js="companyPhone"]').get(0);

          $headerH1.textContent = companyInfo.name;
          $headerParagraph.textContent = companyInfo.phone;
        }
      },

      isRequestOk: function isRequestOk() {
        return this.status === 200 && this.readyState === 4;
      }
    }
  }

  app().init();
  window.app = app;

})(window.DOM);
