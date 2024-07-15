const express = require('express');
const router = express.Router();
const variantController = require('../controllers/variantController');
const { validateId } = require('../middleware/validation');

router.delete('/variants/:id', validateId, variantController.deleteVariant);

module.exports = router;
