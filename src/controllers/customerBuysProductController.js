const CustomerBuysProduct = require('../models/CustomerBuysProduct');

const getSales = async (req, res, next) => {
    try {
        sales = await CustomerBuysProduct.getAllSales();
        res.json(sales);
    } catch (error) {
        next(error);
    }
};

const createSale = async (req, res, next) => {
    try {
        const newSale = await CustomerBuysProduct.createSale(req.body);
        res.status(201).json({ id: newSale.insertId });
    } catch (error) {
        next(error);
    }
};

const deleteSale = async(req, res, next) => {
    try {
        await CustomerBuysProduct.deleteSale(req.body);
        res.json({ message: 'Sale deleted' });
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getSales,
    createSale,
    deleteSale,
};
