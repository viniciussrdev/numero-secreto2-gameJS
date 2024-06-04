// Variáveis globais
let listaNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// Função para exibir texto na tela e falar em voz alta
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag); 
    campo.innerHTML = texto; 
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 }); 
}

// Função para exibir a mensagem inicial do jogo
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número de 1 a 10:');
}

exibirMensagemInicial(); // Chamada da função inicial

console.log(`Número Secreto: ${numeroSecreto}`); // Exibe o Número Secreto no console

// Função para verificar o chute do usuário
function verificarChute() {
    let chute = document.querySelector('input').value; 

    if (chute == numeroSecreto) {
        // Mensagem de acerto
        exibirTextoNaTela('h1', 'Parabéns, você acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o Número Secreto em (${tentativas}) ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); 
    } else {
        // Mensagem de dica e incremento de tentativas
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'DICA: O Número Secreto é menor que o informado.');
        } else {
            exibirTextoNaTela('p', 'DICA: O Número Secreto é maior que o informado.');
        }
        tentativas++;
        limparCampo();
    }
}

// Função para gerar número aleatório único
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); // Gera um número aleatório entre 1 e 10
    let quantidadeElementosLista = listaNumerosSorteados.length;

    if (quantidadeElementosLista == numeroLimite) {
        listaNumerosSorteados = [];
    }

    if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados); // Exibe a lista de números sorteados no console
        return numeroEscolhido;
    }
}

// Função para limpar o campo de entrada
function limparCampo() {
    let chute = document.querySelector('input');
    chute.value = '';
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true); 
}
