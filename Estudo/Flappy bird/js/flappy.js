function novoElemento(tagName, className){
    const elemento = document.createElement(tagName)
    elemento.className = className
    return elemento
}

function barreira(reversa = false){
    this.elemento = novoElemento('div', 'barreira')

    const borda = novoElemento('div', 'borda')
    const corpo = novoElemento('div', 'corpo')
    this.elemento.appendChild(reversa?corpo:borda)
    this.elemento.appendChild(reversa?borda:corpo)

    this.setAltura = altura => corpo.style.height = `${altura}px`
}

function pardeBarreiras(altura, abertura, x){
    this.elemento = novoElemento('div', 'par-de-barreiras')

    this.superior = new barreira(true)
    this.inferior = new barreira(false)

    this.elemento.appendChild(this.superior.elemento)
    this.elemento.appendChild(this.inferior.elemento)

    this.sortearabertura = () => {
        const alturaSuperior = Math.random() * (altura-abertura)
        const alturaInferior = altura - abertura - alturaSuperior
        this.superior.setAltura(alturaSuperior)
        this.superior.setAltura(alturaInferior)
    }

    this.getX = () => parseInt(this.elemento.style.left.split('px'[0]))
    this.setX = x => this.elemento.style.left = `${x}px`
    this.getLargura = () => this.elemento.clientWidth

    this.sortearabertura()
    this.setX(x)
}

function barreiras(altura, largura, abertura, espaco, notificarPonto){
    this.pares = [ new pardeBarreiras(altura, abertura, largura),
                   new pardeBarreiras(altura, abertura, largura + espaco),
                   new pardeBarreiras(altura,abertura,largura + espaco*2),
                   new pardeBarreiras(altura,abertura,largura + espaco*3)    ]

    const deslocamento = 1
    this.animar = () =>{
        this.pares.forEach(par => {
            par.setX(par.getX() - deslocamento)
            if(par.getX() < -par.getLargura()){
                par.setX(par.getX() + espaco*this.pares.length)
                par.sortearabertura()    
            }

            const meio = largura/2
            const cruzouOMeio = par.getX() + deslocamento >= meio && par.getX() < meio
            if(cruzouOMeio){notificarPonto()}
        })
    } 
}

function passaro(altura){
    let voando = false

    this.elemento = novoElemento('img','passaro')
    this.elemento.src = 'imgs/passaro.png'
    this.getY = () => parseInt(this.elemento.style.bottom.split('px'[0]))
    this.setY = y => this.elemento.style.bottom = `${y}`

    window.onkeydown = e => voando=true
    window.onkeyup = e => voando=false

    this.animar = () =>{
        const novoY = this.getY() + (voando ? 8:(-5))
        const alturaMaxima = altura - this.elemento.clientHeight

        if(novoY <= 0){
            this.setY(0)
        }else if(novoY >= alturaMaxima){
            this.setY(alturaMaxima)
        }else{
            this.setY(novoY)
        }
    }
    this.setY(altura/2)
}

const barreirass = new barreiras(700,1200,200,400)
const passaroo = new passaro(700)
const area = document.querySelector('[wm-flappy]')
area.appendChild(passaroo.elemento)
barreirass.pares.forEach(par => area.appendChild(par.elemento))
setInterval(() => {
    barreirass.animar()
    passaroo.animar()
}, 10)