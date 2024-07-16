const Product = require("../models/productModel");
const Variant = require("../models/variantModel");
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const upload = require("../middleware/multer");

exports.createProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { product_name, product_description, model_number, sku, variants } =
      req.body;
    const productId = await Product.create({
      product_name,
      product_description,
      model_number,
      sku,
    });

    if (variants && variants.length) {
      for (let variant of variants) {
        // await upload.single('variant_image')(req, {}, async (err) => {
        //     if (err) {
        //         return res.status(400).json({ error: err.message });
        //     }

        //     const variantImage = req.file;
        //     if (!variantImage) {
        //         return res.status(400).json({ error: 'Variant image is required!' });
        //     }

        // variant.image_url = variantImage.path;
        await Variant.create({ ...variant, product_id: productId });
        // });
      }
    }

    res.status(201).json({ productId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const country = req.query.country || null; // Default to null if not provided
    const products = await Product.findAll(country);

    res.status(200).json(products);
  } catch (error) {
    console.error("Error retrieving products:", error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;
    const rows = await Product.findById(id);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const product = {
      product_id: rows[0].product_id,
      product_name: rows[0].product_name,
      product_description: rows[0].product_description,
      model_number: rows[0].model_number,
      sku: rows[0].sku,
      variants: rows
        .filter((row) => row.variant_id !== null)
        .map((row) => ({
          variant_id: row.variant_id,
          color: row.color,
          quantity: row.quantity,
          price: row.price,
          country: row.country,
        })),
    };

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;
    const { product_name, product_description, model_number, sku } = req.body;
    const affectedRows = await Product.update(id, {
      product_name,
      product_description,
      model_number,
      sku,
    });
    res.status(200).json({ affectedRows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;
    const deletedRows = await Product.delete(id);

    // Delete variant images from local storage
    const variants = await Variant.findAllByProductId(id);
    variants.forEach((variant) => {
      // if (variant.image_url) {
      //     fs.unlinkSync(path.join(__dirname, '..', variant.image_url));
      // }
    });

    res.status(200).json({ deletedRows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
