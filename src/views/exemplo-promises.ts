 let numero = 10;

 function adivinharNumero(numero: number): Promise<string>{
    const numeroSecreto = 10;

    return new Promise<string>((resolve, reject) => {

        setTimeout(() => {
            if(numeroSecreto == numero)
                resolve('A resposta está correta!');
        
            reject('Tente novamente!');
        }, 3000)
 });
}

function receberResultadoSucesso(resposta: string): void {
    console.log(resposta);
}

adivinharNumero(10)
    .then(res => receberResultadoSucesso(res))
    .catch(err => console.log(err))
    .finally(() => console.log('Função executada'));

