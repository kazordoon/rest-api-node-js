const express = require('express')
const router = express.Router()

const { listarTodos, listarUm, criar, deletar } = require('../controllers/pedidos-controller')

router.get('/', listarTodos)
router.get('/:id_pedido', listarUm)
router.post('/', criar)
router.delete('/:id_pedido', deletar)

module.exports = router
