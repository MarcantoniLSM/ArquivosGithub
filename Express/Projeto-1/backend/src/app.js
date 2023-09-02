app = require('express')()
const router = require('./router')

app.use(router)

module.exports = app