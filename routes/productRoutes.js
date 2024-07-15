const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { validateProduct, validateId, validateCountryQuery } = require('../middleware/validation');

router.post('/products', validateProduct, productController.createProduct);
router.get('/products', validateCountryQuery, productController.getAllProducts);
router.get('/products/:id', validateId, productController.getProductById);
router.put('/products/:id', validateId, validateProduct, productController.updateProduct);
router.delete('/products/:id', validateId, productController.deleteProduct);

module.exports = router;
