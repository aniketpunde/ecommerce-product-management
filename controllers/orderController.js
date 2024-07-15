const Order = require('../models/orderModel');
const { validationResult } = require('express-validator');

exports.createOrder = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { product_id, variant_id, delivery_date, order_date, quantity, total_price, country_code } = req.body;
        const orderId = await Order.create({ product_id, variant_id, delivery_date, order_date, quantity, total_price, country_code });
        res.status(201).json({ orderId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const country = req.query.country;
        const orders = await Order.findAll(country);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getOrderById = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = req.params.id;
        const order = await Order.findById(id);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = req.params.id;
        const { product_id, variant_id, delivery_date, order_date, quantity, total_price, country_code } = req.body;
        const affectedRows = await Order.update(id, { product_id, variant_id, delivery_date, order_date, quantity, total_price, country_code });
        res.status(200).json({ affectedRows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = req.params.id;
        const deletedRows = await Order.delete(id);
        res.status(200).json({ deletedRows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
