const Warehouse = require('../models/Warehouse');

const getWarehouses = async (req, res, next) => {
    try {
        const warehouses = await Warehouse.getAllWarehouses();
        res.json(warehouses);
    } catch (error) {
        next(error);
    }
};

const createWarehouse = async (req, res, next) => {
    try {
        const newWarehouse = await Warehouse.createWarehouse(req.body);
        res.status(201).json({ id: newWarehouse.insertId });
    } catch (error) {
        next(error);
    }
};

module.exports = { getWarehouses, createWarehouse };
