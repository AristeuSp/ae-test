// main.js
// Cria o namespace se ainda não existir

window.App = window.App || {};
window.App.versao = "1.0.0";

// Exemplo de uso de variáveis globais em um namespace dentro do objeto App e importado com <script src=main.js defer></script> no HTML

// Adiciona variáveis globais organizadas
window.App.config = {
    thisUrl: "https://aristeusp.github.io/ae-test-page/",
    author: "Aristeu Escobar",
    year: new Date().getFullYear(),
    idioma: "pt-BR",
    tema: "claro",
};

window.App.utils = {
    counter: 0,
    frstLine: '',
    nextLines: '',
};


let counter = 0;
let frstLine = '';
let nextLines = '';

console.log("Ae Test Page Loaded");


document.querySelector('button').addEventListener('click', function () {
    let element = document.getElementById('content');
    element.style.backgroundColor = element.style.backgroundColor === 'lightblue' ? 'lightgreen' : 'lightblue';
    if (counter === 0) {
        counter++;
        frstLine = `<p class="bold">You clicked that button!</p>`;
        element.innerHTML = frstLine
    } else {
        nextLines = '';
        counter++;
        for (let i = 2; i <= counter + 1; i++) {
            if (i < 3) {
                nextLines = `${nextLines}<p>You clicked AGAIN! (${i} times)</p>`;
            } else {
                let m = ((i / 10) * 3).toFixed(1);
                nextLines = `${nextLines}<p style="margin-left: ${m}em">You clicked AGAIN and AGAIN! (${i} times)</p>`;
            }
        }

        element.innerHTML = `${frstLine}${nextLines}`;
    }
});