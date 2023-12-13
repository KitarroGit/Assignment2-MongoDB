const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// This route will handle both searching by name and getting all products if no name query is provided
router.get('/', productController.getProducts);

router.get('/:id', productController.getProductById);
router.post('/', productController.addProduct);
router.put('/:id', productController.updateProductById);
router.delete('/:id', productController.deleteProductById);
router.delete('/', productController.deleteAllProducts);

module.exports = router;