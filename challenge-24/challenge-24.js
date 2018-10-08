/*
Nossa calculadora agora está funcional! A ideia desse desafio é modularizar
o código, conforme vimos na aula anterior. Quebrar as responsabilidades
em funções, onde cada função faça somente uma única coisa, e faça bem feito.

- Remova as duplicações de código;
- agrupe os códigos que estão soltos em funções (declarações de variáveis,
listeners de eventos, etc);
- faça refactories para melhorar esse código, mas de forma que o mantenha com a
mesma funcionalidade.
*/
(function() {

  var $visor = document.querySelector('[data-js="visor"]');
  var $buttonsNumbers = document.querySelectorAll('[data-js="button-number"]');
  var $buttonsOperations = document.querySelectorAll('[data-js="button-operation"]');
  var $buttonCE = document.querySelector('[data-js="button-ce"]');
  var $buttonEqual = document.querySelector('[data-js="button-equal"]');

  function init() {
    Array.prototype.forEach.call($buttonsNumbers, function(button) {
      button.addEventListener('click', handleClickNumber, false);
    });
    Array.prototype.forEach.call($buttonsOperations, function(button) {
      button.addEventListener('click', handleClickOperation, false);
    });

    $buttonCE.addEventListener('click', handleClickCE, false);
    $buttonEqual.addEventListener('click', handleClickEqual, false);
  }

  init();

  // Função de clicar no número
  function handleClickNumber() {
    reloadInput(this);
  }

  // FUnção de clicar no operador
  function handleClickOperation() {
    $visor.value = removeLastItemIfItIsAnOperator($visor.value);
    reloadInput(this);
  }

  // Função de limpar
  function handleClickCE() {
    $visor.value = 0;
  }

  // Verifica se o último item é um operador
  function isLastItemAnOperation(number) {
    var operations = ['+', '-', 'x', '÷'];
    var lastItem = lastItem(number);
    return operations.some(function(operator) {
      return operator === lastItem;
    });
  }

  // Remove o último item se ele for um operador
  function removeLastItemIfItIsAnOperator(number) {
    if(isLastItemAnOperation(number)) {
      return selectAllExceptLastItem(number);
    }
    return number;
  }

  // Faz o calculo
  function handleClickEqual() {
    $visor.value = removeLastItemIfItIsAnOperator($visor.value);
    var allValues = $visor.value.match(/\d+[+x÷-]?/g);
    $visor.value = allValues.reduce(function(accumulated, actual) {
      var firstValue = selectAllExceptLastItem(accumulated);
      var operator = lastItem(accumulated);
      var lastValue = removeLastItemIfItIsAnOperator(actual);
      var lastOperator = isLastItemAnOperation(actual) ? lastItem(actual) : '';
      return applyOperation(operator, firstValue, lastValue, lastOperator);
    });
  }

  // dá um reload no Input
  function reloadInput(btn) {
    $visor.value += btn.value;
  }

  // seleciona todos os elementos do array, menos o último
  function selectAllExceptLastItem(prop) {
    return prop.slice(0, -1);
  }

  // retorna o último item
  function lastItem(prop) {
    return prop.split('').pop();
  }

  // Aplica uma operação
  function applyOperation(operator, firstValue, lastValue, lastOperator) {
    switch(operator) {
      case '+':
        return ( Number(firstValue) + Number(lastValue) ) + lastOperator;
      case '-':
        return ( Number(firstValue) - Number(lastValue) ) + lastOperator;
      case 'x':
        return ( Number(firstValue) * Number(lastValue) ) + lastOperator;
      case '÷':
        return ( Number(firstValue) / Number(lastValue) ) + lastOperator;
    }
  }


})();
