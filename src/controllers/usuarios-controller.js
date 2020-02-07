const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Usuario = require('../models/Usuario')

module.exports = {
  async cadastrar (req, res) {
    try {
      const { email, senha } = req.body

      if (await Usuario.findOne({ where: { email } })) {
        return res.status(409).json({ erro: 'Este email já está cadastrado' })
      }

      const usuario = await Usuario.create({ email, senha })

      const response = {
        mensagem: 'Usuário criado com sucesso',
        usuario: {
          id_usuario: usuario.id_usuario,
          email: usuario.email
        }
      }

      return res.status(201).json(response)
    } catch (err) {
      console.log(err)
      return res.status(400).json({ erro: 'Não foi possível cadastrar a sua conta' })
    }
  },
  async login (req, res) {
    try {
      const { email, senha } = req.body

      const usuario = await Usuario.findOne({
        where: { email }
      })

      if (!usuario) {
        return res.status(401).json({ erro: 'Falha na autenticação' })
      }

      if (!await bcrypt.compare(senha, usuario.senha)) {
        return res.status(401).json({ erro: 'Senha incorreta' })
      }

      const token = await jwt.sign({
        id_usuario: usuario.id_usuario,
        email: usuario.email
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '1h'
      })

      const response = {
        mensagem: 'Logado com sucesso',
        token
      }

      return res.json(response)
    } catch (err) {
      return res.status(401).json({ erro: 'Falha na autenticação' })
    }
  }
}
