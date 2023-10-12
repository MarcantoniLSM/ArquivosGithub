    const emojis  = [
        '🐬',
        '👽',
        '🐺',
        '🦁',
        '🦒',
        '🐮',
        '🐷',
        '🐸',
        '🐬',
        '👽',
        '🐺',
        '🦁',
        '🦒',
        '🐮',
        '🐷',
        '🐸'
    ]

states = {
  view: {
    emojis: [
      '🐬',
      '👽',
      '🐺',
      '🦁',
      '🦒',
      '🐮',
      '🐷',
      '🐸',
      '🐬',
      '👽',
      '🐺',
      '🦁',
      '🦒',
      '🐮',
      '🐷',
      '🐸'
  ],
  tempo:  0
  },

  values: {
    selecionadas: [],
  }
}

function comparador(){
  if(states.values.selecionadas[0].innerHTML === states.values.selecionadas[1].innerHTML){
    states.values.selecionadas[0].classList.add('acerto')
    states.values.selecionadas[1].classList.add('acerto')
  }else{
    states.values.selecionadas[0].classList.remove('selecionada')
    states.values.selecionadas[1].classList.remove('selecionada')
  }

  states.values.selecionadas = []

  if(document.querySelectorAll(".acerto").length === states.view.emojis.length){
    alert(`Você conseguiu em ${states.view.tempo} segundos`)
  }
}

function handleClick(){
  if(states.values.selecionadas.length<2){
    this.classList.add("selecionada")
    states.values.selecionadas.push(this)
  }

  if(states.values.selecionadas.length === 2){
    setTimeout(comparador, 500)
  }

}

function adicionaSegundo(){
  states.view.tempo++
}

function iniciar(){
    function embaralhador(lista) {
      for (let i = lista.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [lista[i], lista[j]] = [lista[j], lista[i]];
      }
    }


    embaralhador(states.view.emojis)

    telaJogo = document.getElementById(`jogo`)

    for (let i = 0; i < 16; i++) {
      const divItem = document.createElement('div');
      divItem.classList.add('item');
      divItem.textContent = states.view.emojis[i];
      divItem.onclick = handleClick
      telaJogo.appendChild(divItem);
  }

  setInterval(adicionaSegundo, 1000)

}

iniciar()