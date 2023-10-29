const addButton = document.getElementById("add")

const notas = JSON.parse(localStorage.getItem("notas"))

function storage(){
    const notasTexto = document.querySelectorAll("textarea")

    const notas = []

    notasTexto.forEach(nota => {
        notas.push(nota.value)
    });

    localStorage.setItem('notas',JSON.stringify(notas))
}



function addNota(texto = '',titulo = ''){
    const nota = document.createElement('div')
    nota.classList.add('nota')

    nota.innerHTML = 
                    `
                    <div class="configuracao">
                        <button id="editar" class="editar"><i class="fas fa-edit"></i>
                        </button>
                        <button id="delete" class="deletar"><i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                    <div class="main ${texto ? "" : "hidden"}"></div>
                    <textarea class = "${texto ? "hidden" : ""}"></textarea>
                    `


    const textarea = nota.querySelector('textarea')
    const main = nota.querySelector('.main')
    textarea.value = texto

    main.innerHTML = marked(texto)

    const deletar = nota.querySelector("#delete")
    deletar.addEventListener('click', () => {nota.remove();storage()})

    const editar = nota.querySelector('#editar')
    editar.addEventListener('click', () =>{
                                            main.classList.toggle('hidden')
                                            textarea.classList.toggle('hidden')
                                        }) 
    
    textarea.addEventListener('input', (e) =>{
                                                const {value} = e.target
                                                main.innerHTML = marked(value)
                                                storage()
                                            })

    const notas = document.querySelector("#notas")
    notas.appendChild(nota)
}

if(notas){
    notas.forEach(nota => addNota(nota))
}

addButton.addEventListener('click', () => addNota())