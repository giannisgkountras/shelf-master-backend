const Warehouse = require('../models/Warehouse');

const getWarehouses = async (req, res, next) => {
    try {
        const warehouses = await Warehouse.getAllWarehouses();
        res.json(warehouses);
    } catch (error) {
        next(error);
    }
};

const getWarehouseById = async (req, res, next) => {
    try {
        const warehouse = await Warehouse.getWarehouseById(req.params.id);
        res.json(warehouse);
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

const updateWarehouse = async (req, res, next) => {
    try {
        const updatedWarehouse = await Warehouse.updateWarehouse(
            req.params.id,
            req.body
        );
        res.json(updatedWarehouse);
    } catch (error) {
        next(error);
    }
};

const deleteWarehouse = async (req, res, next) => {
    try {
        await Warehouse.deleteWarehouse(req.params.id);
        res.json({ message: 'Warehouse deleted' });
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getWarehouses,
    getWarehouseById,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse,
};
