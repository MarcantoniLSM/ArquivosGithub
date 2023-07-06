let usuario = 0
let listaRemedios = []
let carrinho = []
console.log(listaRemedios)
/////////////////////////////////
const mensagem = 
`
///////////////////////
// Digite:           //
// 1 - Administrador //
// 2 - Usuário       //
// 3 - Sair          //
///////////////////////
`
//////////////////////////////////

/////////////////////////////////
const Adm = 
`
///////////////////////
// Digite:           //
// 1 - Adicionar     //
// 2 - Remover       //
// 3 - Alterar valor //
// 4 - Ver itens     //
// 5 - Sair          //
///////////////////////
`
//////////////////////////////////

function chamaUsuario(){
    usuario = prompt(mensagem)
}

function mensagemAdm(){
    console.log(Adm)
}
function listarRemedios(){
    listaRemedios.forEach(remedio => {console.log(remedio)})
}
function admin(){
    let senha = prompt('Digite a senha: ')
    if(senha != 'admin'){
        console.log('Senha incorreta')
        usuario = 0
    }else{
        let acaoAdm = prompt(Adm)
        if(acaoAdm == 1){
            adicionarRemedio()
        }else if(acaoAdm == 2){
            removerRemedio()
        }else if(acaoAdm == 3){
            alterarRemedio()
        }else if(acaoAdm == 4){
            listarRemedios()
        }else if(acaoAdm == 5){
            usuario = 0
        }
    }
}

function adicionarRemedio(){
    let nomeRemedio = prompt('Digite o nome do remédio: ')
    let valorRemedio = parseFloat(prompt('Digite o valor do remédio'))
    let objeto = {
        nome: nomeRemedio,
        valor: valorRemedio
    }
    listaRemedios.push(objeto)
    console.log('Remédio adicionado.')
    usuario = 0
    listarRemedios()
}

function removerRemedio(){
    let nomeRemedio = prompt('Digite o nome do remédio: ')
    listaRemedios.forEach(remedio => { 
        if(remedio.nome == nomeRemedio){
           listaRemedios.splice(listaRemedios.indexOf(remedio),1) 
        }
        })
    usuario = 0
    listarRemedios()
}

function alterarRemedio(){
    let nomeRemedio = prompt('Digite o nome do remédio: ')
    listaRemedios.forEach(remedio => { 
        if(remedio.nome == nomeRemedio){
           remedio.valor = prompt('Digite o novo valor do remédio')
        }
        console.log(remedio)
        })
    usuario = 0
}
/////////////////////////////////
while(usuario != 3){
    chamaUsuario()
    
    if(usuario == 1){
        admin()
    }

    if(usuario ==2){

    }
}
//////////////////////////////////