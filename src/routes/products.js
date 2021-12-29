const express = require('express')
const router = express.Router()
const ProductsController = require('../controller/ProductsController')

router.get('/', ProductsController.getAllProducts)
router.get('/:name', ProductsController.getOneProduct)

module.exports= router