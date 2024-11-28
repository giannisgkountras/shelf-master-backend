const SupplierSuppliesProduct = require('../models/SupplierSuppliesProduct');

const getSupplies = async (req, res, next) => {
    try {
        const supplies = await SupplierSuppliesProduct.getAllSupplies();
        res.json(supplies);
    } catch (error) {
        next(error);
    }
};

const createSupply = async (req, res, next) => {
    try {
        const newSupply = await SupplierSuppliesProduct.createSupply(req.body);
        res.status(201).json({ id: newSupply.insertId });
    } catch (error) {
        next(error);
    }
};

const deleteSupply = async (req, res, next) => {
    try {
        await SupplierSuppliesProduct.deleteSupply(req.params.id);
        res.json({ message: 'Supply deleted' });
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getSupplies,
    createSupply,
    deleteSupply,
};
