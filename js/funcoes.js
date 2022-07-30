var tela = document.querySelector('canvas');
var pincel = tela.getContext('2d');

var xAtual, yAtual, raio, acertou;
var pontuacao = 0;
var novaDificuldade, intervalo = 1500;

function gerarNovoNumero(min, max)
{
    var numeroEncontrado = false;
    
    while(numeroEncontrado == false)
    {
        var numero = Math.round(Math.random() * 2 * max);
        
        //CONTROLAR SE O NÚMERO GERADO ESTÁ ENTRE O NÚMERO MÍNIMO E MÁXIMO PASSADOS
        if((numero >= min) && (numero <= max))
        {
            numeroEncontrado = true;
        }
    }

    return numero;
}

function mudarModo(tempo)
{
    pontuacao = 0;
    document.getElementById("pontuacao").innerHTML = pontuacao;
    intervalo = tempo;
    console.log(intervalo);
    clearInterval(novaDificuldade);
    novaDificuldade = setInterval(function(){
    removerCirculo(xAtual, yAtual);
    xAtual = gerarNovoNumero(10, 1390);
    yAtual = gerarNovoNumero(10, 590);
    raio = gerarNovoNumero(10, 20);

    desenhaCirculo(xAtual, yAtual, raio, '#f70505'); // menor circulo
    }, intervalo);              
}

function desenhaCirculo(x, y, raio, cor) {

    pincel.fillStyle = cor;
    pincel.beginPath();
    pincel.arc(x, y, raio, 0, 2 * Math.PI);
    pincel.fill();
}

function dispara(evento) {
    var xAlvo = xAtual;
    var yAlvo = yAtual;
    var x = evento.pageX - tela.offsetLeft;
    var y = evento.pageY - tela.offsetTop;
    
    if((x > xAlvo - raio) && (x < xAlvo + raio))
    {
        if((y > yAlvo - raio) && (y < yAlvo + raio))
        {
            xAtual = "";
            yAtual = "";
            pontuacao++;
            document.getElementById("pontuacao").innerHTML = pontuacao;

            desenhaCirculo(xAlvo, yAlvo, raio, 'green');
            
            setTimeout(function(){
                removerCirculo(xAlvo, yAlvo);
            }, 100);
        }
    }
}

function removerCirculo(xAtual, yAtual)
{
    desenhaCirculo(xAtual, yAtual, raio + 21, 'rgb(24 13 6)');
}

tela.onmousedown = dispara;