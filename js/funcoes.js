var tela = document.querySelector('canvas');
var pincel = tela.getContext('2d');

var xAtual, yAtual, raio, acertou, pontuacao;
var novaDificuldade, intervalo = 1500;


//FUNÇÃO: REALIZAR UM TIRO NA TELA
function atirar(evento) {
    var xAlvo = xAtual;
    var yAlvo = yAtual;
    var x = evento.pageX - tela.offsetLeft;
    var y = evento.pageY - tela.offsetTop;
    
    //TIRO ALINHADO AO EIXO X DO ALVO
    if((x > xAlvo - raio) && (x < xAlvo + raio))
    {
        //TIRO ALINHADO AO EIXO Y DO ALVO
        if((y > yAlvo - raio) && (y < yAlvo + raio))
        {
            //DESABILITANDO O ALVO
            xAtual = "";
            yAtual = "";

            //AUMENTANDO A PONTUAÇÃO
            pontuacao++;
            document.getElementById("pontuacao").innerHTML = pontuacao;

            //DEIXANDO O ALVO VERDE
            desenhaCirculo(xAlvo, yAlvo, raio, 'green');
            
            //REMOVENDO O ALVO APÓS 0.1 SEGUNDOS
            setTimeout(function(){
                removerCirculo(xAlvo, yAlvo);
            }, 10);
        }
    }
}


//FUNÇÃO: DESENHAR UM CÍRCULO NA TELA
function desenhaCirculo(x, y, raio, cor) {

    pincel.fillStyle = cor;
    pincel.beginPath();
    pincel.arc(x, y, raio, 0, 2 * Math.PI);
    pincel.fill();
}


//FUNÇÃO: REMOVER UM CÍRCULO DA TELA
function removerCirculo(x, y)
{
    pincel.fillStyle = 'rgb(24 13 6)';
    pincel.fillRect(0, 0, 1400, 600);

}


//FUNÇÃO: SELECIONAR UMA DIFICULDADE
function mudarModo(tempo)
{
    //ZERANDO A PONTUAÇÃO
    pontuacao = 0;
    document.getElementById("pontuacao").innerHTML = pontuacao;
    
    //DEFININDO O INTERVALO DE TEMPO DE APARIÇÃO DOS ALVOS
    intervalo = tempo;

    //DEFININDO UM NOVO INTERVALO COM A DIFICULDADE ESCOLHIDA
    clearInterval(novaDificuldade);
    novaDificuldade = setInterval(function()
    {
        removerCirculo(xAtual, yAtual);
        xAtual = gerarNovoNumero(10, 1390);
        yAtual = gerarNovoNumero(10, 590);
        raio = gerarNovoNumero(10, 20);

        desenhaCirculo(xAtual, yAtual, raio, '#f70505');
    }, intervalo);              
}


//FUNÇÃO: GERAR UM NÚMERO ALEATÓRIO DENTRO DE UM INTERVALO
function gerarNovoNumero(min, max)
{
    var numeroEncontrado = false;
    
    while(numeroEncontrado == false)
    {
        var numero = Math.round(Math.random() * max);
        
        //CONTROLAR SE O NÚMERO GERADO ESTÁ ENTRE O NÚMERO MÍNIMO E MÁXIMO PASSADOS
        if((numero >= min) && (numero <= max))
        {
            numeroEncontrado = true;
        }
    }
    
    return numero;
}


tela.onmousedown = atirar;