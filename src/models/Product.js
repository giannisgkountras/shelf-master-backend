const db = require('../config/db');

const Product = {
    getAllProducts: async () => {
        const [rows] = await db.query(
            'SELECT id, name, manufacturer, description, price, product_category FROM product'
        );
        return rows;
    },

    getProductById: async (productId) => {
        const [rows] = await db.query(
            'SELECT id, name, manufacturer, description, price, product_category FROM product WHERE id = ?',
            [productId]
        );
        return rows[0];
    },

    createProduct: async (productData) => {
        const { name, manufacturer, description, price, product_category } =
            productData;

        const [result] = await db.query(
            'INSERT INTO product (name, manufacturer, description, price, product_category) VALUES (?, ?, ?, ?, ?)',
            [name, manufacturer, description, price, product_category]
        );
        return result;
    },

    updateProduct: async (productId, productData) => {
        const { name, manufacturer, description, price, product_category } =
            productData;

        const [result] = await db.query(
            'UPDATE product SET name = ?, manufacturer = ?, description = ?, price = ?, product_category = ? WHERE id = ?',
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
        const [result] = await db.query('DELETE FROM product WHERE id = ?', [
            productId,
        ]);
        return result;
    },
};

module.exports = Product;
