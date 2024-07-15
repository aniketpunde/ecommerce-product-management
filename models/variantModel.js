const db = require('./db');

class Variant {
    static async create(variant) {
        const [result] = await db.execute(
            'INSERT INTO Variants(product_id, color, quantity, price, country) VALUES (?, ?, ?, ?, ?)',
            [variant.product_id, variant.color, variant.quantity, variant.price, variant.country]
        );
        return result.insertId;
    }

    static async delete(id) {
        const [result] = await db.execute('DELETE FROM Variants WHERE variant_id = ?', [id]);
        return result.affectedRows;
    }


    static async findAllByProductId(productId) {
        const [rows] = await db.execute('SELECT * FROM Variants WHERE product_id = ?', [productId]);
        return rows;
    }
}

module.exports = Variant;
