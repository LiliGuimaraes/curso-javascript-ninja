/*
Crie uma variável qualquer, que receba um array com alguns valores aleatórios
- ao menos 5 - (fica por sua conta os valores do array).
*/
var arr = [2, 3, 8, 1, 10, 28];

/*
Crie uma função que receba um array como parâmetro, e retorne esse array.
*/
function myArr(arr){
    return arr;
}

/*
Imprima o segundo índice do array retornado pela função criada acima.
*/
console.log(myArr(arr)[1]);

/*
Crie uma função que receba dois parâmetros: o primeiro, um array de valores; e o
segundo, um número. A função deve retornar o valor de um índice do array que foi passado
no primeiro parâmetro. O índice usado para retornar o valor, deve ser o número passado no
segundo parâmetro.
*/
function twoArgs(arr, index){
    return arr[index];
}

/*
Declare uma variável que recebe um array com 5 valores, de tipos diferentes.
*/
var randomArr = ['Mariana', 19, 1.58, true, {cabelo: 'loiro', olhos: 'castanhos'}];

/*
Invoque a função criada acima, fazendo-a retornar todos os valores do último
array criado.
*/
console.log(twoArgs(randomArr, 0));
console.log(twoArgs(randomArr, 1));
console.log(twoArgs(randomArr, 2));
console.log(twoArgs(randomArr, 3));
console.log(twoArgs(randomArr, 4));

/*
Crie uma função chamada `book`, que recebe um parâmetro, que será o nome do
livro. Dentro dessa função, declare uma variável que recebe um objeto com as
seguintes características:
- esse objeto irá receber 3 propriedades, que serão nomes de livros;
- cada uma dessas propriedades será um novo objeto, que terá outras 3
propriedades:
    - `quantidadePaginas` - Number (quantidade de páginas)
    - `autor` - String
    - `editora` - String
- A função deve retornar o objeto referente ao livro passado por parâmetro.
- Se o parâmetro não for passado, a função deve retornar o objeto com todos
os livros.
*/
function myBook(nome){
    var obj = {
        'Harry Potter': {
            quantidadePaginas: 500, 
            autor: 'J. K. Rowling', 
            editora: 'Rocco'
        },
        'A arte do jogo': {
            quantidadePaginas: 350, 
            autor: 'Fulano', 
            editora: 'Intrinseca'
        },
        'Percy Jackson': {
            quantidadePaginas: 200, 
            autor: 'Rick Riordan', 
            editora: 'Leya'
        }
    }

    return nome ? obj[nome] : obj;
}

/*
Usando a função criada acima, imprima o objeto com todos os livros.
*/
console.log(myBook());

/*
Ainda com a função acima, imprima a quantidade de páginas de um livro qualquer,
usando a frase:
"O livro [NOME_DO_LIVRO] tem [X] páginas!"
*/
var nome = 'Harry Potter';
console.log("O livro " + nome + " tem " + myBook(nome).quantidadePaginas);

/*
Ainda com a função acima, imprima o nome do autor de um livro qualquer, usando
a frase:
"O autor do livro [NOME_DO_LIVRO] é [AUTOR]."
*/
nome = 'Percy Jackson';
console.log("O livro " + nome + " é " + myBook(nome).autor);

/*
Ainda com a função acima, imprima o nome da editora de um livro qualquer, usando
a frase:
"O livro [NOME_DO_LIVRO] foi publicado pela editora [NOME_DA_EDITORA]."
*/
nome = 'A arte do jogo'; 
console.log("O livro " + nome + " foi publicado pela editora " + myBook(nome).editora);
