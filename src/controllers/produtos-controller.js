const Produto = require('../models/Produto')

const urlParser = require('../utils/urlParser')

module.exports = {
  async listarTodos (req, res) {
    try {
      const produtos = await Produto.findAll()
      const response = {
        quantidade: produtos.length,
        produtos: produtos.map(produto => ({
          ...produto.dataValues,
          request: {
            metodo: 'GET',
            descricao: 'Obtêm os detalhes de um produto específico',
            url: urlParser(`produtos/${produto.id_produto}`).href
          }
        }))
      }

      return res.json(response)
    } catch (err) {
      return res.status(500).json({ erro: 'Não foi possível encontrar todos os produtos' })
    }
  },
  async listarUm (req, res) {
    try {
      const produto = await Produto.findByPk(req.params.id_produto)

      if (!produto) {
        return res.status(404).json({ erro: 'Este produto não existe' })
      }

      const response = {
        produto: {
          ...produto.dataValues,
          request: {
            metodo: 'GET',
            descricao: 'Obtêm todos os produtos',
            url: urlParser('produtos').href
          }
        }
      }

      return res.json(response)
    } catch (err) {
      return res.status(500).json({ erro: 'Não foi possível encontrar o produto solicitado' })
    }
  },
  async criar (req, res) {
    try {
      const { nome } = req.body

      if (await Produto.findOne({ where: { nome } })) {
        return res.status(409).json({ erro: 'Este produto já existe' })
      }

      const produto = await Produto.create({
        ...req.body,
        imagem_produto: urlParser(`uploads/${req.file.filename}`).href
      })

      const response = {
        mensagem: 'Produto criado com sucesso',
        produto: {
          ...produto.dataValues,
          request: {
            metodo: 'GET',
            descricao: 'Obtêm todos os produtos',
            url: urlParser('produtos').href
          }
        }
      }

      return res.status(201).json(response)
    } catch (err) {
      console.log(err)
      return res.status(400).json({ erro: 'Não foi possível criar um novo produto' })
    }
  },
  async deletar (req, res) {
    try {
      const produto = await Produto.findByPk(req.params.id_produto)

      if (!produto) {
        return res.status(400).json({ erro: 'Este produto não existe' })
      }

      await produto.destroy()

      return res.sendStatus(204)
    } catch (err) {
      return res.status(400).json({ erro: 'Não foi possível deletar o produto' })
    }
  },
  async atualizar (req, res) {
    try {
      const produto = await Produto.findByPk(req.params.id_produto)

      if (!produto) {
        return res.status(400).json({ erro: 'Este produto não existe' })
      }

      if (req.file) {
        produto.update({
          imagem_produto: urlParser(`uploads/${req.file.filename}`).href
        })
      }

      produto.update(req.body)

      const response = {
        mensagem: 'Produto atualizando com sucesso',
        produto: {
          ...produto.dataValues,
          request: {
            metodo: 'GET',
            descricao: 'Obtêm um produto específico',
            url: urlParser(`produtos/${produto.id_produto}`).href
          }
        }
      }

      return res.json(response)
    } catch (err) {
      return res.status(400).json({ erro: 'Não foi possível atualizar o produto' })
    }
  }
}
