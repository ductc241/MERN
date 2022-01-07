const router = require('express').Router()
const productController = require('../controllers/product.controller')

router.route('/product')
    .get(productController.getProducts)
    .post(productController.createProduct)

router.route('/product/:id')
    .put(productController.updateProduct)
    .delete(productController.deleteProduct)

module.exports = router