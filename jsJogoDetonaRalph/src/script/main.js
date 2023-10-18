const state = {
    view:{
        quadrados: document.querySelectorAll(".quadrado"),
        tempo: document.querySelector('#tempo'),
        pontos: document.querySelector('#pontos'),
        vidas: document.querySelector('#vidas')
    },
    value:{
        posicaoAlvo: null,
        pontuacao: 0,
        quantidadeVidas: 3,
        tempoAtual: 20
    },
    actions:{
        cronometro: setInterval(decresceTempo, 1000),
        moveAlvo: setInterval(escolheQuadrado ,500)
    }
}
function decresceTempo(){
        state.value.tempoAtual--
        state.view.tempo.textContent = state.value.tempoAtual
        if(state.value.tempoAtual <= 0){
            clearInterval(state.actions.cronometro)
            clearInterval(state.actions.moveAlvo)
            alert('game over')
        }
    }

function escolheQuadrado(){
    state.view.quadrados.forEach((quadrado) =>{
        quadrado.classList.remove('alvo')
    })

    let aleatorio = Math.floor(Math.random()*9)
    quadradoEscolhido = state.view.quadrados[aleatorio]
    quadradoEscolhido.classList.add('alvo')
    state.value.posicaoAlvo = quadradoEscolhido.id
}

function removeVida(){

    function removeImagem(){
        if(state.view.vidas.getElementsByTagName('img').length>0){
            var primeiraImagem = state.view.vidas.getElementsByTagName("img")[0]
            state.view.vidas.removeChild(primeiraImagem)
        }
    }

    state.value.quantidadeVidas--
    removeImagem()
    if(state.value.quantidadeVidas === 0){
        clearInterval(state.actions.cronometro)
        clearInterval(state.actions.moveAlvo)
        alert('game over')
    }
}

function listenerQuadrado (){
    state.view.quadrados.forEach((quadrado) =>{
        quadrado.addEventListener('mousedown', ()=>{
            if(quadrado.id === state.value.posicaoAlvo){
                state.value.pontuacao++
                state.view.pontos.textContent = state.value.pontuacao
                state.value.posicaoAlvo = null
            }else{
                removeVida()
            }
        })
    })
}

function inicio(){
    listenerQuadrado()
}

inicio()
