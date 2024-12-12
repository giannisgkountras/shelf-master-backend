const db = require('../config/db');

const Product = {
    getAllProducts: async () => {
        const [rows] = await db.query(
            'SELECT id, name, manufacturer, description, price, product_category FROM Product'
        );
        return rows;
    },

    getProductById: async (productId) => {
        const [rows] = await db.query(
            'SELECT id, name, manufacturer, description, price, product_category FROM Product WHERE id = ?',
            [productId]
        );
        return rows[0];
    },

    createProduct: async (productData) => {
        const { name, manufacturer, description, price, product_category } =
            productData;

        // Step 1: Check if the product_category exists
        const [categoryCheck] = await db.query(
            'SELECT name FROM Product_Category WHERE name = ?',
            [product_category]
        );

        // Step 2: If the category does not exist, create it
        if (categoryCheck.length === 0) {
            await db.query('INSERT INTO Product_Category (name) VALUES (?)', [
                product_category,
            ]);
        }

        // Step 3: Insert the product
        const [result] = await db.query(
            'INSERT INTO Product (name, manufacturer, description, price, product_category) VALUES (?, ?, ?, ?, ?)',
            [name, manufacturer, description, price, product_category]
        );

        // Step 4: Return the result of the insert operation
        return result;
    },

    updateProduct: async (productId, productData) => {
        const { name, manufacturer, description, price, product_category } =
            productData;

        const [result] = await db.query(
            'UPDATE Product SET name = ?, manufacturer = ?, description = ?, price = ?, product_category = ? WHERE id = ?',
            [
                name,
                manufacturer,
                description,
                price,
                product_category,
                productId,
            ]
        );
        return {
            id: productId,
            name: name,
            manufacturer: manufacturer,
            description: description,
            price: price,
            product_category: product_category,
        };
    },

    deleteProduct: async (productId) => {
        const [result] = await db.query('DELETE FROM Product WHERE id = ?', [
            productId,
        ]);
        return result;
    },
};

module.exports = Product;
