(function() {

  'use strict';

  function app() {

    const $formCEP = new DOM('[data-js="formCEP"]');
    const $inputCEP = new DOM('[data-js="inputCEP"]');
    let $logradouro = new DOM('[data-js="logradouro"]');
    let $bairro = new DOM('[data-js="bairro"]');
    let $estado = new DOM('[data-js="estado"]');
    let $cidade = new DOM('[data-js="cidade"]');
    let $status = new DOM('[data-js="statusMessage"]');
    let ajax = new XMLHttpRequest();
    $formCEP.on('submit', handleSubmitFormCEP);

    function handleSubmitFormCEP(event) {
      event.preventDefault();
      let url = getUrl();

      ajax.open('GET', url);
      ajax.send();
      getMessage('loading');
      ajax.addEventListener('readystatechange', handleReadyStateChange);
    }

    function handleReadyStateChange() {
      if (isRequestOk()) {
        getMessage('ok');
        fillCEPFields();
      }
    }

    function getUrl() {
      return replaceCEP('http://cep.correiocontrol.com.br/[CEP].json');
    }

    function clearCEP() {
      return $inputCEP.get()[0].value.replace(/\D/g, '');
    }

    function isRequestOk() {
      return ajax.readyState === 4 && ajax.status === 200;
    }

    function fillCEPFields() {
      let data = parseData();
      if (!data) {
        getMessage('error');
        data = clearData();
      }

      $logradouro.get()[0].textContent = data.logradouro;
      $bairro.get()[0].textContent = data.bairro;
      $estado.get()[0].textContent = data.uf;
      $cidade.get()[0].textContent = data.localidade;
      $cep = new DOM('[data-js="cep"]');
      $cep.get()[0].textContent = data.cep;
    }

    function clearData() {
        return {
          logradouro: '-',
          bairro: '-',
          uf: '-',
          localidade: '-',
          cep: '-'
        }
    }

    function parseData() {
      let result;
      try {
        result = JSON.parse(ajax.responseText);
      }
      catch (error) {
        result = null;
      }
      return result;
    }

    function getMessage(type) {
      let messages = {
        loading: replaceCEP('Buscando informaçoes para o CEP [CEP]...'),
        ok: replaceCEP('Endereço referente ao CEP [CEP]'),
        error: replaceCEP('Não encontramos o endreço para o CEP [CEP]')
      };

      $status.get()[0].textContent = messages[type];
    }

    function replaceCEP(message) {
      return message.replace('[CEP]', clearCEP());
    }

    return {
      getMessage: getMessage,
      replaceCEP: replaceCEP
    }

  }

  // window.app = app(); retorna apenas os métodos desejados
  window.app = app;
  app();

})();
