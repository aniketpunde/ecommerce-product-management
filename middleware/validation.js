const { body, param, query } = require('express-validator');

exports.validateProduct = [
    body('product_name').notEmpty(),
    body('model_number').notEmpty(),
    body('sku').notEmpty(),
];

exports.validateVariant = [
    body('product_id').isInt(),
    body('color').notEmpty(),
    body('quantity').isInt().notEmpty(),
    body('price').isFloat().notEmpty(),
    body('country').notEmpty(),
];

exports.validateOrder = [
    body('product_id').isInt(),
    body('variant_id').isInt(),
    body('delivery_date').isISO8601(),
    body('order_date').isISO8601(),
    body('quantity').isInt().notEmpty(),
    body('total_price').isFloat().notEmpty(),
    body('country_code').notEmpty(),
];

exports.validateLogistics = [
    body('order_id').isInt(),
    body('warehouse_location').notEmpty(),
    body('shipping_status').notEmpty(),
    body('delivery_date').isISO8601(),
    body('country_code').notEmpty(),
    body('currency').custom((value, { req }) => {
        const { country_code } = req.body;
        const allowedCurrencies = {
            'IN': 'INR', // India
            'AE': 'AED'  // UAE
        };

        if (!allowedCurrencies[country_code]) {
            throw new Error(`Currency not allowed for country code ${country_code}`);
        }

        return true;
    }),
];

exports.validateId = [
    param('id').isInt().withMessage('ID must be an integer'),
];

exports.validateCountryQuery = [
    query('country').optional().notEmpty().withMessage('Country code must be provided'),
];
