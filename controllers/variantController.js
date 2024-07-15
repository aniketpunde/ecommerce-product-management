const Variant = require('../models/variantModel');
const { validationResult } = require('express-validator');

exports.deleteVariant = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = req.params.id;
        const deletedRows = await Variant.delete(id);
        res.status(200).json({ deletedRows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
