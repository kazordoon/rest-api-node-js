const express = require('express')
const router = express.Router()
const login = require('../middleware/login')

const {
  listarTodos,
  listarUm,
  criar,
  atualizar,
  deletar
} = require('../controllers/produtos-controller')

const upload = require('../config/multer')

router.get('/', listarTodos)
router.get('/:id_produto', listarUm)
router.post(
  '/',
  login,
  upload.single('imagem_produto'),
  criar
)
router.patch(
  '/:id_produto',
  login,
  upload.single('imagem_produto'),
  atualizar
)
router.delete('/:id_produto', login, deletar)

module.exports = router
