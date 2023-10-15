const state ={
    pontuacoes:{
        pontosJogador: 0,
        pontosInimigo: 0,
        caixaPontos: document.getElementById("pontuacao")
    },

    cartaEmCampo:{
        jogador: document.getElementById("carta_campo_jogador"),
        inimigo: document.getElementById("carta_campo_inimigo")
    },

    actions:{
         botao: document.getElementById("proximo")
    },
   
    cartas: [
        {
            id: 0,
            nome: "mago",
            tipo: "pedra",
            img: "./src/assets/icons/magician.png",
            ganhaDe: 2
        },
        {
            id: 1,
            nome: "dragao",
            tipo: "papel",
            img: "./src/assets/icons/dragon.png",
            ganhaDe: 0
        },
        {
            id: 2,
            nome: "exodia",
            tipo: "tesoura",
            img: "./src/assets/icons/exodia.png",
            ganhaDe: 1
        }
    ],

    cartasJogador: [],
    cartasInimigo: []
}

function definePontuacao(){
   state.pontuacoes.caixaPontos.textContent = `Vitórias: ${state.pontuacoes.pontosJogador} Derrotas: ${state.pontuacoes.pontosInimigo}`
}
setInterval(definePontuacao, 1000)


function previaCarta(i){
    const imagem = state.cartas[i].img
    const nomeCarta = state.cartas[i].nome
    const tipoCarta = state.cartas[i].tipo
    console.log(imagem)
    console.log(nomeCarta)
    console.log(tipoCarta)

    const imagemExibicao = document.createElement("img")
    imagemExibicao.setAttribute("src", imagem)
    console.log(imagemExibicao)
    const avatar = document.getElementById("avatar")
    imagemAntiga = avatar.querySelector("img")
    if(imagemAntiga){avatar.removeChild(imagemAntiga)}
    avatar.appendChild(imagemExibicao)

    const nomeExibido = document.getElementById("nome_carta")
    nomeExibido.innerHTML = nomeCarta

    const tipoExibido = document.getElementById("tipo_carta")
    tipoExibido.innerHTML = tipoCarta
}

function escondeCartas(){
    caixaCartas = document.getElementById("jogador")
    cartas = caixaCartas.querySelectorAll("img")
    cartas.forEach((carta) =>{
        carta.remove()
    })

    caixaCartas = document.getElementById("inimigo")
    cartas = caixaCartas.querySelectorAll("img")
    cartas.forEach((carta) =>{
        carta.remove()
    })
}

function tocaSom(string){
    audio = new Audio(`./src/assets/audios/${string}.wav`)
    audio.play()
}

function batalha(jogador,inimigo){
    let resultado = "Empate"

    console.log(`jogador ${jogador} inimigo ${inimigo}`)
    if(state.cartas[jogador].ganhaDe === state.cartas[inimigo].id){
        state.pontuacoes.pontosJogador ++
        resultado = "Vitória"
        tocaSom("win")
    }else if(state.cartas[inimigo].ganhaDe === state.cartas[jogador].id){
        state.pontuacoes.pontosInimigo ++
        resultado = "Derrota"
        tocaSom("lose")
    }

    console.log(resultado)

    state.actions.botao.innerText = resultado
    state.actions.botao.style.display = "block"
}

function exibirCarta(indexJogador){

    state.cartaEmCampo.inimigo.style.display = "block"
    state.cartaEmCampo.jogador.style.display = "block"

   state.cartaEmCampo.jogador.setAttribute("src",state.cartas[indexJogador].img)
   indexInimigo = Math.floor(Math.random()*(state.cartasInimigo.length))
   state.cartaEmCampo.inimigo.setAttribute("src",state.cartasInimigo[indexInimigo].img)

   escondeCartas()
   batalha(indexJogador,state.cartasInimigo[indexInimigo].id)
}

function geraCartas(quantidade, string){

    state.cartasJogador = []
    state.cartasInimigo = []

        if(string === "jogador"){
            for(i = 0;i<quantidade;i++){
                const cartaAleatória = state.cartas[Math.floor(Math.random()*(state.cartas.length))]

                const imagemCarta = document.createElement("img")
                imagemCarta.setAttribute("height","100px")
                imagemCarta.setAttribute("src","./src/assets/icons/card-back.png")
                imagemCarta.setAttribute("data-id",cartaAleatória.id)
                imagemCarta.classList.add("card")
                state.cartasJogador.push(cartaAleatória)

                imagemCarta.addEventListener("click", () => {
                    exibirCarta(imagemCarta.getAttribute("data-id"))
                })
                imagemCarta.addEventListener("mouseover", () =>{
                    previaCarta(imagemCarta.getAttribute("data-id"))
                })

                document.getElementById("jogador").appendChild(imagemCarta)
            }
        }else if(string === "inimigo"){
            for(i = 0;i<quantidade;i++){
                const cartaAleatória = state.cartas[Math.floor(Math.random()*(state.cartas.length))]

                const imagemCarta = document.createElement("img")
                imagemCarta.setAttribute("height","100px")
                imagemCarta.setAttribute("src","./src/assets/icons/card-back.png")
                imagemCarta.setAttribute("data-id",cartaAleatória.id)
                imagemCarta.classList.add("card")
                state.cartasInimigo.push(cartaAleatória)

                document.getElementById("inimigo").appendChild(imagemCarta)
            }
        }

    console.log(state.cartasJogador)
    console.log(state.cartasInimigo)
}

function removeCartasEmCampo(){
    state.cartaEmCampo.inimigo.style.display = "none"
    state.cartaEmCampo.jogador.style.display = "none"
}

function novoDuelo(){
    state.actions.botao.style.display = "none"
    const avatar = document.getElementById("avatar")
    imagemAntiga = avatar.querySelector("img")
    if(imagemAntiga){avatar.removeChild(imagemAntiga)}

    const nomeExibido = document.getElementById("nome_carta")
    nomeExibido.innerHTML = "Selecione"

    const tipoExibido = document.getElementById("tipo_carta")
    tipoExibido.innerHTML = "uma carta"

    removeCartasEmCampo()

    geraCartas(5, "jogador")
    geraCartas(5, "inimigo")

    
}

function iniciar (){
    geraCartas(5, "jogador")
    geraCartas(5, "inimigo")

    backMusica = document.getElementById("back-sound")
    backMusica.play()
}

definePontuacao()
iniciar()