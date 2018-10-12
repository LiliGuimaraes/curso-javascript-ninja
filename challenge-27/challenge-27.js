/*
Aproveitando a lib DOM que fizemos na semana anterior, crie agora para ela
métodos semelhantes aos que existem no array, mas que sirvam para os
elementos do DOM selecionados.
Crie os seguintes métodos:
- forEach, map, filter, reduce, reduceRight, every e some.

Crie também métodos que verificam o tipo do objeto passado por parâmetro.
Esses métodos não precisam depender de criar um novo elmento do DOM, podem
ser métodos estáticos.

Métodos estáticos não obrigam o uso do `new`, podendo ser usados diretamente
no objeto, como nos exemplos abaixo:
DOM.isArray([1, 2, 3]); // true
DOM.isFunction(function() {}); // true
DOM.isNumber('numero'); // false

Crie os seguintes métodos para verificação de tipo:
- isArray, isObject, isFunction, isNumber, isString, isBoolean, isNull.
O método isNull deve retornar `true` se o valor for null ou undefined.
*/

(function(){

  'use strict';

  function DOM(element) {
    this.element = document.querySelectorAll(element);
  }

  DOM.prototype.on = function(event, callback) {
    for (var children of this.element) {
      children.addEventListener(event, callback);
    }
  }

  DOM.prototype.off = function(event, callback) {
    for (var children of this.element) {
      children.removeEventListener(event, callback);
    }
  }

  DOM.prototype.get = function() {
    return this.element;
  }

  DOM.prototype.forEach = function() {
    return Array,prototype.forEach.apply(this.element, arguments);
  }

  DOM.prototype.map = function() {
    return Array.prototype.map.apply(this.element, arguments);
  }

  DOM.prototype.filter = function() {
    return Array.prototype.filter.apply(this.element, arguments);
  }

  DOM.prototype.reduce = function() {
    return Array.prototype.reduce.apply(this.element, arguments);
  }

  DOM.prototype.reduceRight = function() {
    return Array.prototype.reduceRight.apply(this.element, arguments);
  }

  DOM.prototype.every = function() {
    return Array.prototype.every.apply(this.element, arguments);
  }

  DOM.prototype.some = function() {
    return Array.prototype.some.apply(this.element, arguments);
  }

  DOM.prototype.isArray = function(domElement) {
    return Object.prototype.toString.call(domElement) === '[object Array]';
  }

  DOM.prototype.prototype.isObject = function(domElement) {
    return Object.prototype.toString.call(domElement) === '[object Object]';
  }

  DOM.isFunction = function(domElement) {
    return Object.prototype.toString.call(domElement) === '[object Function]';
  }

  DOM.prototype.isNumber = function(domElement) {
    return Object.prototype.toString.call(domElement) === '[object Number]';
  }

  DOM.prototype.isString = function(domElement) {
    return Object.prototype.toString.call(domElement) === '[object String]';
  }

  DOM.prototype.isBoolean = function(domElement) {
    return Object.prototype.toString.call(domElement) === '[object Boolean]';
  }

  DOM.isNull = function(domElement) {
    return Object.prototype.toString.call(domElement) === '[object Null]' ||
           Object.prototype.toString.call(domElement) === '[object Undefined]';
  }

  var $a = new DOM('[data-js="link"]');
  $a.on('click', function(e) {
    e.preventDefault();
    console.log('clicou');
  });

  console.log('Elementos selecionados:', $a.get());
  console.log('$a é filho de body?', $a.get()[0].parentNode === document.body);

  console.log( DOM.isArray([1, 2, 3] ));

})();
