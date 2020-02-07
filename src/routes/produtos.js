const express = require('express');
const login = require('../middleware/login');
const router = express.Router();

const ProdutosController = require('../controllers/produtos-controller');

const upload = require('../config/multer');

router.get('/', ProdutosController.getProdutos);
router.post(
    '/',
    login.obrigatorio,
    upload.single('produto_imagem'),
    ProdutosController.postProduto
);
router.get('/:id_produto', ProdutosController.getUmProduto);
router.patch('/', login.obrigatorio, ProdutosController.updateProduto);
router.delete('/', login.obrigatorio, ProdutosController.deleteProduto);

module.exports = router;