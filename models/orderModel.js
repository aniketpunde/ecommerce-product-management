const db = require("./db");

class Order {
  static async create(order) {
    console.log(order);
    const [result] = await db.execute(
      "INSERT INTO Orders (product_id, variant_id, delivery_date, order_date, quantity, total_price, country_code) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        order.product_id,
        order.variant_id,
        order.delivery_date,
        order.order_date,
        order.quantity,
        order.total_price,
        order.country_code,
      ]
    );
    return result.insertId;
  }

  static async findAll(country) {
    let query = "SELECT * FROM Orders";
    let params = [];

    if (country) {
        query += " WHERE country_code = ?";
        params.push(country);
    }

    const [rows] = await db.execute(query, params);
    return rows;
}


  static async findById(id) {
    const [rows] = await db.execute("SELECT * FROM Orders WHERE order_id = ?", [
      id,
    ]);
    return rows;
  }

  static async update(id, order) {
    const [result] = await db.execute(
      "UPDATE Orders SET product_id = ?, variant_id = ?, delivery_date = ?, order_date = ?, quantity = ?, total_price = ?, country_code = ? WHERE order_id = ?",
      [
        order.product_id,
        order.variant_id,
        order.delivery_date,
        order.order_date,
        order.quantity,
        order.total_price,
        order.country_code,
        id,
      ]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.execute("DELETE FROM Orders WHERE order_id = ?", [
      id,
    ]);
    return result.affectedRows;
  }
}

module.exports = Order;
