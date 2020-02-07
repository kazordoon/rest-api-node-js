const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Nenhum token foi fornecido' })
  }

  const parts = authHeader.split(' ')

  if (!(parts.length === 2)) {
    return res.status(401).json({ error: 'Erro no token' })
  }

  const [scheme, token] = parts

  if (!/^Bearer$/.test(scheme)) {
    return res.status(401).json({ error: 'Token malformatado' })
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' })
    }

    req.user = decoded
    return next()
  })
}
