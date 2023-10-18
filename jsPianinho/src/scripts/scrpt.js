const teclas = document.querySelectorAll('.tecla')
const listaTeclas = []
let audio = new Audio("src/sons/a.wav")

const slider = document.querySelector(".sliderVolume input")

const temLetra = document.querySelector(".temLetra input")

const handleVolume = (e) =>{
    audio.volume = e.target.value
}

const mostraLetras = () =>{
    teclas.forEach((tecla) =>{
        tecla.classList.toggle("hide")
    })
}

const emitirSom = (tecla) =>{
    if(listaTeclas.includes(tecla)){
    audio.src = `src/sons/${tecla}.wav`
    audio.play()

    clicada = document.querySelector(`[data-valor="${tecla}"]`)
    clicada.classList.add("active")
    setTimeout(()=>{clicada.classList.remove("active"),300})
    }
}

slider.addEventListener("input",handleVolume)

temLetra.addEventListener("click", mostraLetras)

teclas.forEach(tecla => {
    tecla.addEventListener("click",() => emitirSom(tecla.dataset.valor))
    listaTeclas.push(tecla.dataset.valor)
});

console.log(listaTeclas)

document.addEventListener("keydown", (e)=>{
    emitirSom(e.key)
})