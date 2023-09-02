const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const saudacao = require('./middleware')
const userApi = require('./api/usuario.js')

require('./api/produto')(app,'parametro')

app.post('/usuario',userApi.salvar)
app.get('/usuario',userApi.obter)

app.use(bodyParser.json())
app.use(saudacao("Marcantoni"))

app.get("/clientes/relatorio",(req,res) =>{
    res.send(`cliente relatório completo: ${req.query.completo} ano: ${req.query.ano}`)
})

app.get("/clientes/:id",(req,res) =>{
    res.send(`cliente ${req.params.id} selecionado`)
})


app.get("/primeiro",(req,res) => {
    res.json({
        name: "i5 1400",
        price: 900,

    })
})

app.post("/corpo",(req,res)=>{res.send(JSON.stringify(req.body))})

app.listen(3000, () => {
    console.log('BackEnd funcionando bem')
})