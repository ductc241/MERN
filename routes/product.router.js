const router = require('express').Router()
const productController = require('../controllers/product.controller')

router.route('/product')
    .get(productController.getProducts)
    .post(productController.createProduct)

router.route('/product/:id')
    .put(productController.updateProduct)
    .delete(productController.deleteProduct)


router.route('/product/cookie')
    .get((req, res) => {
        res.cookie('test', 'test')
        res.status(200).json({
            msg: 'csa'
        })
    })
module.exports = router