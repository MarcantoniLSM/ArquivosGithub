function saudacao(nome){
    return function(req,res,next){
        console.log(`Bem vindo ${nome}!`)
        next()
    }
}

module.exports = saudacao