/* eslint-disable camelcase */
const Pedido = require('../models/Pedido')
const Produto = require('../models/Produto')

const urlParser = require('../utils/urlParser')

module.exports = {
  async listarTodos (req, res) {
    try {
      const pedidos = await Pedido.findAll({
        include: [{ // Junta os pedidos com o produto relacionado ao id_produto na tabela de pedidos
          model: Produto,
          as: 'produto'
        }]
      })

      const response = {
        pedidos: pedidos.map(pedido => ({
          id_pedido: pedido.id_pedido,
          quantidade: pedido.quantidade,
          produto: pedido.produto,
          request: {
            metodo: 'GET',
            descricao: 'Obtêm os detalhes de um pedido específico',
            url: urlParser(`pedidos/${pedido.dataValues.id_pedido}`).href
          }
        }))
      }

      return res.json(response)
    } catch (err) {
      return res.status(500).json({ erro: 'Não foi possível encontrar todos os pedidos' })
    }
  },
  async listarUm (req, res) {
    try {
      const pedido = await Pedido.findByPk(req.params.id_pedido, {
        include: [{
          model: Produto,
          as: 'produto'
        }]
      })

      if (!pedido) {
        return res.status(404).json({ erro: 'Este pedido não existe' })
      }

      const response = {
        pedido: {
          id_pedido: pedido.id_pedido,
          quantidade: pedido.quantidade,
          produto: pedido.produto,
          request: {
            metodo: 'GET',
            descricao: 'Obtêm todos os pedidos',
            url: urlParser('pedidos').href
          }
        }
      }
      return res.json(response)
    } catch (err) {
      return res.status(400).json({ erro: 'Não foi possível encontrar o pedido solicitado' })
    }
  },
  async criar (req, res) {
    try {
      const { id_produto } = req.body

      if (!await Produto.findByPk(id_produto)) {
        return res.status(400).json({ erro: 'O id do produto fornecido é inválido' })
      }

      const pedido = await Pedido.create(req.body)
      const produto = await Produto.findByPk(pedido.id_produto)

      const response = {
        quantidade: pedido.length,
        pedido: {
          id_pedido: pedido.id_pedido,
          quantidade: pedido.quantidade,
          produto,
          request: {
            metodo: 'GET',
            descricao: 'Obtêm todos os pedidos',
            url: urlParser('pedidos').href
          }
        }
      }
      return res.status(201).json(response)
    } catch (err) {
      return res.status(400).json({ erro: 'Não foi possível criar um novo pedido' })
    }
  },
  async deletar (req, res) {
    try {
      const pedido = await Pedido.findByPk(req.params.id_pedido)

      if (!pedido) {
        return res.status(400).json({ erro: 'Este pedido não existe' })
      }

      await pedido.destroy()

      return res.sendStatus(204)
    } catch (err) {
      return res.status(400).json({ erro: 'Não foi possível excluir o pedido' })
    }
  }
}
