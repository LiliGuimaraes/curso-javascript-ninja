/*
O desafio de hoje será um pequeno projeto: um cronômetro!
As regras para criação do cronômetro são as seguintes:
1. Crie um arquivo index.html e adicione esse script a ele;
2. Crie um campo `input` do tipo `text`, e inicie-o com um valor 0 (zero).
Ele será o nosso cronômetro;
3. Crie 3 botões para as ações do cronômetro: Start, Stop e Reset;
4. Ao clicar em Start, o valor do campo deve ser incrementado de 1 em 1, a
cada segundo;
5. Ao clicar em Stop, o cronômetro deve parar de contar;
6. Ao clicar em Reset, o cronômetro deve zerar e parar de contar.

Utilize o atributo data-js para nomear o campo e os botões. Você pode
usar o nome que achar melhor, desde que ele seja semântico, ou seja, o nome
dado ao elemento HTML deve definir o que o elemento é ou o que ele faz.
*/
(function(win, doc) {
    'use strict';

    let timeArrClean = [0, 0, ':', 0, 0, ':', 0, 0];
    let timerArr = new Array(...timeArrClean);
    let $input = doc.querySelector('[data-js="timer-input"]');
    let $start = doc.querySelector('[data-js="timer-start"]');
    let $stop = doc.querySelector('[data-js="timer-stop"]');
    let $reset = doc.querySelector('[data-js="timer-reset"]');
    let idTimer = 0;
    $input.value = timerArr.join('');

    $start.addEventListener('click', e => {
        e.preventDefault();
        startTimer();
    }, false);

    $stop.addEventListener('click', e => {
        e.preventDefault();
        stopTimer();
    }, false);

    $reset.addEventListener('click', e => {
        e.preventDefault();
        resetTimer();
    }, false);

    function startTimer(event) {

        // counting seconds, minutes and hours
        timerArr[7] += 1;
        if (timerArr[7] === 10) { 
            timerArr[7] = 0;
            timerArr[6]++;
        }

        if (timerArr[6] === 6) {
            timerArr[6] = 0;
            timerArr[4]++;
        }

        if (timerArr[4] === 10) {
            timerArr[4] = 0;
            timerArr[3]++;
        }

        if (timerArr[3] === 6) {
            timerArr[3] = 0;
            timerArr[1]++;
        }

        if (timerArr[1] === 10) {
            timerArr[1] = 0;
            timerArr[0]++;
        }

        if (timerArr[0] === 10) {
            return;
        }

        $input.value = timerArr.join('');
        idTimer = setTimeout(startTimer, 1000);
    }

    function stopTimer() {
        clearTimeout(idTimer);
    }

    function resetTimer() {
        $input.value = timeArrClean.join('');
        timerArr = Array(...timeArrClean);
        stopTimer();
    }

})(window, document);