const express = require('express');
const router = express.Router();
const logisticsController = require('../controllers/logisticsController');
const { validateLogistics, validateId, validateCountryQuery } = require('../middleware/validation');

router.post('/logistics', validateLogistics, logisticsController.createLogistics);
router.get('/logistics', validateCountryQuery, logisticsController.getAllLogistics);
router.get('/logistics/:id', validateId, logisticsController.getLogisticsById);
router.put('/logistics/:id', validateId, validateLogistics, logisticsController.updateLogistics);
router.delete('/logistics/:id', validateId, logisticsController.deleteLogistics);

module.exports = router;

