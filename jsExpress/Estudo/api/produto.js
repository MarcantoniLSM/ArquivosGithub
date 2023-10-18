module.exports = (app,text) =>{
    function salvar(req,res){
        res.send('produto > salvar > ' + text)
    }

    function obter(req,res){
        res.send('Produto > obter ' + text)
    }

    app.post('/produto',salvar)
    app.get('/produto',obter)
}