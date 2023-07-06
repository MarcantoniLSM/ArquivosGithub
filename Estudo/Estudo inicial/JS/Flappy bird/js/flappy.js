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

const b = new barreira(true)
b.setAltura(200)
document.querySelector('[wm-flappy]').appendChild(b.elemento)