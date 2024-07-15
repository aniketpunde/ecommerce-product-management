const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { validateOrder, validateId, validateCountryQuery } = require('../middleware/validation');

router.post('/orders', validateOrder, orderController.createOrder);
router.get('/orders', validateCountryQuery, orderController.getAllOrders);
router.get('/orders/:id', validateId, orderController.getOrderById);
router.put('/orders/:id', validateId, validateOrder, orderController.updateOrder);
router.delete('/orders/:id', validateId, orderController.deleteOrder);

module.exports = router;
