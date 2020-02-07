const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const Produto = require('../models/Produto')
const Pedido = require('../models/Pedido')
const Usuario = require('../models/Usuario')

const sequelize = new Sequelize(dbConfig)

Produto.init(sequelize)
Pedido.init(sequelize)
Usuario.init(sequelize)

Produto.associate(Pedido)
Pedido.associate(Produto)

sequelize.authenticate()
  .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso'))
  .catch(err => console.error(`Erro ao conectar-se ao banco de dados:\n${err.message}`))

module.exports = sequelize
