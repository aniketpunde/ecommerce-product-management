# E-commerce Product Management API

## Overview

This Node.js API manages products, variants, orders, and logistics for an e-commerce system. It uses MySQL as the database and provides endpoints for CRUD operations on products and variants, order management, and logistics record handling.

## Features

- Create, retrieve, update, and delete products and their variants.
- Manage orders with support for different countries.
- Handle logistics records with country-specific currency settings.

## Requirements

- Node.js
- MySQL

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/ecommerce-product-management.git
   cd ecommerce-product-management
   ```

2. **Install Dependencies**

   ```
   npm install
   ```

3. **Setup Environment Variables**

   ```
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=password
   DB_NAME=product_management
   SECRET_KEY=your_secret_key
   ```

4. **Start the Application**
   ```
   npm start
   ```

# APIs Documentation

## Products API

### 1. Add a New Product with Variants

**Endpoint**: POST /products

**Description**: Adds a new product along with its variants.

**Request Body**:

```json
{
  "product_name": "Sample Product",
  "product_description": "Description of the sample product",
  "model_number": "12345",
  "sku": "SKU-001",
  "variants": [
    {
      "color": "Red",
      "quantity": 10,
      "price": 99.99,
      "country": "INDIA"
    },
    {
      "color": "Blue",
      "quantity": 8,
      "price": 89.99,
      "country": "INDIA"
    }
  ]
}
```

### 2. Retrieve All Products with Variants

**Endpoint** - `GET /products`

**Description** - Retrieves all products along with their variants.

**Query Parameters**

- `country` (Optional): Filter products by country code.

**Response Example**

```json
[
  {
    "product_id": 1,
    "product_name": "Sample Product",
    "product_description": "Description of the sample product",
    "model_number": "12345",
    "sku": "SKU-001",
    "variants": [
      {
        "variant_id": 1,
        "product_id": 1,
        "color": "Red",
        "quantity": 10,
        "price": 99.99,
        "country": "INDIA"
      },
      {
        "variant_id": 2,
        "product_id": 1,
        "color": "Blue",
        "quantity": 8,
        "price": 89.99,
        "country": "INDIA"
      }
    ]
  }
]
```

### 3. Retrieve a Single Product with Variants

**Endpoint:** - `GET /products/`

**Description:** - `Retrieves a single product along with its variants.`

**URL Parameter:** - `id: Product ID`

**Response Example:**

```
{
  "product_id": 1,
  "product_name": "Sample Product",
  "product_description": "Description of the sample product",
  "model_number": "12345",
  "sku": "SKU-001",
  "variants": [
    {
      "variant_id": 1,
      "product_id": 1,
      "color": "Red",
      "quantity": 10,
      "price": 99.99,
      "country": "INDIA"
    },
    {
      "variant_id": 2,
      "product_id": 1,
      "color": "Blue",
      "quantity": 8,
      "price": 89.99,
      "country": "INDIA"
    }
  ]
}
```

### 4. Update Product Details

**Endpoint:** -`PUT /products/`

**Description:** - `Updates details of a specific product.`

**URL Parameter:** - `id: Product ID`

**Request Body:** `Updated product details`

**Response Example:**

```
{
  "message": "Product updated successfully"
}
```

### 5. Delete a Product and Its Variants

**Endpoint:** - `DELETE /products/`

**Description:** - `Deletes a product and its associated variants.`

**URL Parameter:** - `id: Product ID`

**Response Example:**

```
{
  "deletedRows": 1
}
```

## Variants API

### 1. Delete a Variant

**Endpoint:** `DELETE /variants/`

**Description:** - `Deletes a variant by its ID.`

**URL Parameter:** - `id: Variant ID`

**Response Example:**

```
{
  "deletedRows": 1
}

```

## Orders API

### 1. Add a New Order

**Endpoint:** - `POST /orders`
**Description:**- `Adds a new order`

**Request Body:**

```
{
  "product_id": 1,
  "variant_id": 1,
  "quantity": 2,
  "order_date": "2024-07-16T08:00:00.000Z",
  "delivery_date": "2024-07-20T08:00:00.000Z",
  "country_code": "IN",
  "total_price":123.7
}
```

**Response Example:**

```
{
  "orderId": 1
}
```

### 2. Retrieve All Orders

**Endpoint:** - ` GET /orders`

**Description:** - `Retrieves all orders.`

**Query Parameters:**

**country (Optional):** - Filter orders by country code.

**Response Example:**

```
[
  {
    "order_id": 1,
    "product_id": 1,
    "variant_id": 1,
    "quantity": 2,
    "order_date": "2024-07-16T08:00:00.000Z",
    "delivery_date": "2024-07-20T08:00:00.000Z",
    "country_code": "IN"
  }
]
```

### 3. Retrieve a Single Order

**Endpoint:** - `GET /orders/`

**Description:** - `Retrieves a single order by its ID.`

**URL Parameter:** - `id: Order ID`

**Response Example:**

```
{
"order_id": 1,
"product_id": 1,
"variant_id": 1,
"quantity": 2,
"order_date": "2024-07-16T08:00:00.000Z",
"delivery_date": "2024-07-20T08:00:00.000Z",
"country_code": "IN"
}
```

### 4. Update Order Details

**Endpoint:** - `PUT /orders/`

**Description:** - `Updates details of a specific order.`

**URL Parameter:** -`id: Order ID`

**Request Body:** - `Updated order details`

**Response Example:**

```
{
"message": "Order updated successfully"
}

```

### 5. Delete an Order

**Endpoint:** - `DELETE /orders/`

**Description:** - `Deletes an order by its ID.`

**URL Parameter:** - `id: Order ID`

**Response Example:**

```
{
"deletedRows": 1
}
```

## Logistics API

### 1. Add a New Logistics Record

**Endpoint:** - `POST /logistics`

**Description:** - `Adds a new logistics record.`

**Request Body:**

```
{
"order_id": 1,
"warehouse_location": "Warehouse A",
"shipping_status": "Shipped",
"delivery_date": "2024-07-20T,
"country_code": "IN",
"currency":"INR",

}
```
