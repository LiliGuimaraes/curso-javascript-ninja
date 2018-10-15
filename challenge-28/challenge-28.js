  /*
  No HTML:
  - Crie um formulário com um input de texto que receberá um CEP e um botão
  de submit;
  - Crie uma estrutura HTML para receber informações de endereço:
  "Logradouro, Bairro, Estado, Cidade e CEP." Essas informações serão
  preenchidas com os dados da requisição feita no JS.
  - Crie uma área que receberá mensagens com o status da requisição:
  "Carregando, sucesso ou erro."

  No JS:
  - O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
  deve ser limpo e enviado somente os números para a requisição abaixo;
  - Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
  "https://viacep.com.br/ws/[CEP]/json/", onde [CEP] será o CEP passado
  no input criado no HTML;
  - Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
  com os dados recebidos.
  - Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
  a mensagem: "Buscando informações para o CEP [CEP]..."
  - Se não houver dados para o CEP entrado, mostrar a mensagem:
  "Não encontramos o endereço para o CEP [CEP]."
  - Se houver endereço para o CEP digitado, mostre a mensagem:
  "Endereço referente ao CEP [CEP]:"
  - Utilize a lib DOM criada anteriormente para facilitar a manipulação e
  adicionar as informações em tela.
  */

  (function(DOM){

    'use strict';

    let $submit = new DOM('[data-js="submitButton"]');
    let $input = new DOM('[data-js="inputCEP"]');
    let $inputValue = $input.get()[0].value;

    let $statusMessage = new DOM('[data-js="statusMessage"]');

    let $logradouro = new DOM('[data-js="logradouro"]');
    let $bairro = new DOM('[data-js="bairro"]');
    let $estado = new DOM('[data-js="estado"]');
    let $cidade = new DOM('[data-js="cidade"]');
    let $cep = new DOM('[data-js="cep"]');

    $submit.get()[0].addEventListener('click', function(event) {
      event.preventDefault();

      cleanNonNumber();

      let ajax = new XMLHttpRequest();
      ajax.open('GET', `http://apps.widenet.com.br/busca-cep/api/cep/${$inputValue}.json`);
      $statusMessage.get()[0].innerHTML = `Buscando informações para o CEP ${$inputValue}`;
      ajax.send();

      ajax.addEventListener('readystatechange', function() {
        let response;

        if ( isRequestOk(ajax) ) {
          try {
            response = JSON.parse(ajax.responseText);
          }
          catch (error) {
            $statusMessage.get()[0].innerHTML = `Não encontramos o endereço para o CEP ${$inputValue}`;
            response = null;
          }

          if (response) {
            $statusMessage.get()[0].innerHTML = `Endereço referente ao CEP ${$inputValue}`;
            fillCepInfo(response);
          }
        }
      });
    }, false);

    function cleanNonNumber() {
      $inputValue = $input.get()[0].value.replace(/\D/gi, '');
    }

    function isRequestOk(ajax) {
      return ajax.status === 200 && ajax.readyState === 4;
    }

    function fillCepInfo(response) {
          getSpan($cep).innerHTML = response.code;
          getSpan($estado).innerHTML = response.state;
          getSpan($cidade).innerHTML = response.city;
          getSpan($bairro).innerHTML = response.district;
          getSpan($logradouro).innerHTML = response.address;
    }

    function getSpan(element) {
      return element.get()[0].childNodes[1];
    }

  })(window.DOM);
