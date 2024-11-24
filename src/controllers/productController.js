const Product = require('../models/Product');

const getProducts = async (req, res, next) => {
    try {
        const products = await Product.getAllProducts();
        res.json(products);
    } catch (error) {
        next(error);
    }
};

const getProductById = async (req, res, next) => {
    try {
        const product = await Product.getProductById(req.params.id);
        res.json(product);
    } catch (error) {
        next(error);
    }
};

const createProduct = async (req, res, next) => {
    try {
        const newProduct = await Product.createProduct(req.body);
        res.status(201).json({ id: newProduct.insertId });
    } catch (error) {
        next(error);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await Product.updateProduct(
            req.params.id,
            req.body
        );
        res.json(updatedProduct);
    } catch (error) {
        next(error);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        await Product.deleteProduct(req.params.id);
        res.json({ message: 'Product deleted' });
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
