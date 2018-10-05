/*
Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
As regras são:

- Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
diretamente;
- O input deve iniciar com valor zero;
- Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
- Deve haver 4 botões para as operações principais: soma (+), subtração(-),
multiplicação(x) e divisão(÷);
- Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
que irá limpar o input, deixando-o com valor 0;

- A cada número pressionado, o input deve atualizar concatenando cada valor
digitado, como em uma calculadora real;
- Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
operação no input. Se o último caractere no input já for um símbolo de alguma
operação, esse caractere deve ser substituído pelo último pressionado.
Exemplo:
- Se o input tem os valores: "1+2+", e for pressionado o botão de
multiplicação (x), então no input deve aparecer "1+2x".
- Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
input;
- Ao pressionar o botão "CE", o input deve ficar zerado.
*/

(function(win, doc){

  'use strict';

  // declaração de variáveis!
  const $input = document.querySelector('[data-js="input"');
  const $numericButtons = document.querySelectorAll('[data-js="number-button"]');
  const $operationButtons = document.querySelectorAll('[data-js="operation-button"]');
  const $clearButton = document.querySelector('[data-id="clear-button"');
  const $calcButton = document.querySelector('[data-id="calc-button"');

  Array.prototype.forEach.call($numericButtons, function(button) {
    button.addEventListener('click', clickNumber, false);
  });

  Array.prototype.forEach.call($operationButtons, function(button) {
    button.addEventListener('click', clickOperation, false);
  });

  $clearButton.addEventListener('click', clearInput, false);

  $calcButton.addEventListener('click', calcInput, false);

  function clickNumber(event) {
    if ($input.value === '0') {
      $input.value = '';
    }
    $input.value += this.value;
  }

  function clickOperation(event) {
    if (isLastOperation()) $input.value = $input.value.replace(/.{3}$/, ` ${this.value} `);
    else $input.value += ` ${this.value} `;
  }

  function calcInput() {
    if (isLastOperation()) $input.value = $input.value.slice(0, -3);
    let result = $input.value.split(' ');

    // checando as primeiras operações, de multiplicação e divisão!
    for (let i = 0; i < result.length; i++) {
      if (result[i] === '*') {
        result[i] = +result[i - 1] * +result[i + 1];
        removeAroundIndex(result, i);
        i = 0; // volta para o índice 0, para rever a conta novamente
      }
      else if (result[i] === '/') {
        result[i] = +result[i - 1] / +result[i + 1];
        removeAroundIndex(result, i);
        i = 0;
      }
    }

    // checando as outras operações, de soma e subtração!
    for (let i = 0; i < result.length; i++) {
      if (result[i] === '+') {
        result[i] = +result[i - 1] + +result[i + 1];
        removeAroundIndex(result, i);
        i = 0;
      }
      else if (result[i] === '-') {
        result[i] = +result[i - 1] - +result[i + 1];
        removeAroundIndex(result, i);
        i = 0;
      }
    }
    $input.value = result.toString();

  }

  function clearInput(event) {
    $input.value = 0;
  }

  function isLastOperation() {
  return $input.value.match(/\s[+*\/-]\s$/);
  }

  function removeAroundIndex(arr, i) {
    arr.splice(i + 1, 1);
    arr.splice(i - 1, 1);
  }

})(window, document);
