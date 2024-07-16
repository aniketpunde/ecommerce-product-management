const Logistics = require('../models/logisticsModel');
const { validationResult } = require('express-validator');

exports.createLogistics = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { order_id, warehouse_location, shipping_status, delivery_date, country_code, currency } = req.body;
        const logisticsId = await Logistics.create({ order_id, warehouse_location, shipping_status, delivery_date, country_code, currency });
        res.status(201).json({ logisticsId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllLogistics = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const country_code = req.query.country_code;
        const logistics = await Logistics.findAll(country_code);
        res.status(200).json(logistics);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getLogisticsById = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = req.params.id;
        const logistics = await Logistics.findById(id);
        res.status(200).json(logistics);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateLogistics = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = req.params.id;
        const { order_id, warehouse_location, shipping_status, delivery_date, country_code, currency } = req.body;
        const affectedRows = await Logistics.update(id, { order_id, warehouse_location, shipping_status, delivery_date, country_code, currency });
        res.status(200).json({ affectedRows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteLogistics = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = req.params.id;
        const deletedRows = await Logistics.delete(id);
        res.status(200).json({ deletedRows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
