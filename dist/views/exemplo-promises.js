"use strict";
var numero = 10;
function adivinharNumero(numero) {
    var numeroSecreto = 10;
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (numeroSecreto == numero)
                resolve('A resposta está correta!');
            reject('Tente novamente!');
        }, 3000);
    });
}
function receberResultadoSucesso(resposta) {
    console.log(resposta);
}
adivinharNumero(10)
    .then(function (res) { return receberResultadoSucesso(res); })
    .catch(function (err) { return console.log(err); })
    .finally(function () { return console.log('Função executada'); });
