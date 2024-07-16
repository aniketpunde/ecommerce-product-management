const db = require('./db');

class Logistics {
    static async create(logistics) {
        const [result] = await db.execute(
            'INSERT INTO Logistics (order_id, warehouse_location, shipping_status, delivery_date, country_code, currency) VALUES (?, ?, ?, ?, ?, ?)',
            [logistics.order_id, logistics.warehouse_location, logistics.shipping_status, logistics.delivery_date, logistics.country_code, logistics.currency]
        );
        return result.insertId;
    }

    static async findAll(country_code) {
        let query = 'SELECT * FROM Logistics';
        let params = [];
    
        if (country_code) {
            query += ' WHERE country_code = ?';
            params.push(country_code);
        }
    
        const [rows] = await db.execute(query, params);
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.execute(
            'SELECT * FROM Logistics WHERE logistics_id = ?',
            [id]
        );
        return rows;
    }

    static async update(id, logistics) {
        const [result] = await db.execute(
            'UPDATE Logistics SET order_id = ?, warehouse_location = ?, shipping_status = ?, delivery_date = ?, country_code = ?, currency = ? WHERE logistics_id = ?',
            [logistics.order_id, logistics.warehouse_location, logistics.shipping_status, logistics.delivery_date, logistics.country_code, logistics.currency, id]
        );
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.execute('DELETE FROM Logistics WHERE logistics_id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = Logistics;
