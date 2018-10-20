
(function(){

  function DOM(element) {
    // verifica se o this é uma instancia da função construtora DOM
    // se não for, o código irá criar uma instância
    // é útil para que não seja necessário usar o new toda vez
    if (!(this instanceof DOM))
      return new DOM(element);
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

  DOM.prototype.get = function(index) {
    if (index === null || index === undefined)
      return this.element;
    return this.element[index];
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

  DOM.isArray = function(domElement) {
    return Object.prototype.toString.call(domElement) === '[object Array]';
  }

  DOM.isObject = function(domElement) {
    return Object.prototype.toString.call(domElement) === '[object Object]';
  }

  DOM.isFunction = function(domElement) {
    return Object.prototype.toString.call(domElement) === '[object Function]';
  }

  DOM.isNumber = function(domElement) {
    return Object.prototype.toString.call(domElement) === '[object Number]';
  }

  DOM.isString = function(domElement) {
    return Object.prototype.toString.call(domElement) === '[object String]';
  }

  DOM.isBoolean = function(domElement) {
    return Object.prototype.toString.call(domElement) === '[object Boolean]';
  }

  DOM.isNull = function(domElement) {
    return Object.prototype.toString.call(domElement) === '[object Null]' ||
          Object.prototype.toString.call(domElement) === '[object Undefined]';
  }

  window.DOM = DOM;

})();
