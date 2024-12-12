const WarehouseStoreProduct = require('../models/WarehouseStoreProduct');

const getInventory = async (req, res, next) => {
    try {
        const supplies = await WarehouseStoreProduct.getAllInventory();
        res.json(supplies);
    } catch (error) {
        next(error);
    }
};

const createInventory = async (req, res, next) => {
    try {
        const newSupply = await WarehouseStoreProduct.createInventory(req.body);
        res.status(201).json({ id: newSupply.insertId });
    } catch (error) {
        next(error);
    }
};

const deleteInventory = async (req, res, next) => {
    try {
        await WarehouseStoreProduct.deleteInventory(req.params.id);
        res.json({ message: 'Supply deleted' });
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getInventory,
    createInventory,
    deleteInventory,
};
