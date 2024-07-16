const db = require("./db");

class Product {
  static async create(product) {
    const [result] = await db.execute(
      "INSERT INTO Products (product_name, product_description, model_number, sku) VALUES (?, ?, ?, ?)",
      [
        product.product_name,
        product.product_description,
        product.model_number,
        product.sku,
      ]
    );
    return result.insertId;
  }

  static async findAll(country) {
    let query = `
                SELECT 
                    p.product_id, p.product_name, p.product_description, p.model_number, p.sku,
                    v.variant_id, v.color, v.quantity, v.price, v.country
                FROM 
                    Products p
                LEFT JOIN 
                    Variants v ON p.product_id = v.product_id
            `;
    let params = [];

    if (country) {
      query += " WHERE v.country = ?";
      params.push(country);
    }

    const [rows] = await db.execute(query, params);

    // Group the variants under their respective products
    const productsMap = new Map();
    rows.forEach((row) => {
      if (!productsMap.has(row.product_id)) {
        productsMap.set(row.product_id, {
          product_id: row.product_id,
          product_name: row.product_name,
          product_description: row.product_description,
          model_number: row.model_number,
          sku: row.sku,
          variants: [],
        });
      }
      if (row.variant_id) {
        productsMap.get(row.product_id).variants.push({
          variant_id: row.variant_id,
          color: row.color,
          quantity: row.quantity,
          price: row.price,
          country: row.country,
        });
      }
    });

    return Array.from(productsMap.values());
  }

  // static async findById(id) {
  //   const [rows] = await db.execute(
  //     "SELECT * FROM Products p LEFT JOIN Variants v ON p.product_id = v.product_id WHERE p.product_id = ?",
  //     [id]
  //   );
  //   return rows;
  // }

  static async findById(id) {
    const [rows] = await db.execute(
      `SELECT 
            p.product_id, p.product_name, p.product_description, p.model_number, p.sku,
            v.variant_id, v.color, v.quantity, v.price, v.country 
        FROM Products p 
        LEFT JOIN Variants v ON p.product_id = v.product_id 
        WHERE p.product_id = ?`,
      [id]
    );
    return rows;
  }

  static async update(id, product) {
    const [result] = await db.execute(
      "UPDATE Products SET product_name = ?, product_description = ?, model_number = ?, sku = ? WHERE product_id = ?",
      [
        product.product_name,
        product.product_description,
        product.model_number,
        product.sku,
        id,
      ]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    await db.execute("DELETE FROM Variants WHERE product_id = ?", [id]);
    const [result] = await db.execute(
      "DELETE FROM Products WHERE product_id = ?",
      [id]
    );
    return result.affectedRows;
  }
}

module.exports = Product;
