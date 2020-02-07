require('dotenv').config()
const express = require('express')
const { resolve } = require('path')
const morgan = require('morgan')
const app = express()

const rotaProdutos = require('../routes/produtos')
const rotaPedidos = require('../routes/pedidos')
const rotaUsuarios = require('../routes/usuarios')

app.use(morgan('dev'))
app.use('/uploads', express.static(resolve(__dirname, '..', 'uploads')))
app.use(express.urlencoded({ extended: false })) // apenas dados simples
app.use(express.json()) // json de entrada no body

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Header',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST, PATCH, DELETE, GET')
    return res.sendStatus(200)
  }
  next()
})

app.use('/produtos', rotaProdutos)
app.use('/pedidos', rotaPedidos)
app.use('/usuarios', rotaUsuarios)

// Quando não encontra rota, entra aqui:
app.use((req, res, next) => {
  const erro = new Error('Não encontrado')
  erro.status = 404
  next(erro)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  console.log(error)
  return res.json({
    erro: { mensagem: error.message }
  })
})

app.set('PORT', process.env.PORT || 3333)

module.exports = app
