const express = require('express')
const router = express.Router()

const { login, cadastrar } = require('../controllers/usuarios-controller')

router.post('/cadastro', cadastrar)
router.post('/login', login)

module.exports = router
