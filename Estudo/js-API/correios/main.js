'use strict'

const preencheCampos = (endereco) =>{
    document.getElementById("rua").value = endereco.logradouro
    document.getElementById("bairro").value = endereco.bairro
    document.getElementById("cidade").value = endereco.localidade
    document.getElementById("estado").value = endereco.uf
  
}

const validaCep = (cep) => cep.length == 8 && /^[0-9]+$/.test(cep)

const pesquisarCep = async() =>{

    document.getElementById("rua").value = ''
    document.getElementById("bairro").value = ''
    document.getElementById("cidade").value = ''
    document.getElementById("estado").value = ''

    const cep = document.getElementById('cep').value
    if(validaCep(cep)){
        const url = `http://viacep.com.br/ws/${cep}/json/`
        const dados = await fetch(url)
        const endereco = await dados.json()
        if(endereco.hasOwnProperty('erro')){
            alert("Digite um CEP válido!")
        }else{preencheCampos(endereco)}
    }else{alert("Digite um cep válido!")}
}

document.getElementById('cep')
        .addEventListener('focusout',pesquisarCep)