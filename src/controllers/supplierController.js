const Supplier = require('../models/Supplier');

const getSuppliers = async (req, res, next) => {
    try {
        const suppliers = await Supplier.getAllSuppliers();
        res.json(suppliers);
    } catch (error) {
        next(error);
    }
};

const getSupplierById = async (req, res, next) => {
    try {
        const supplier = await Supplier.getSupplierById(req.params.id);
        res.json(supplier);
    } catch (error) {
        next(error);
    }
};

const createSupplier = async (req, res, next) => {
    try {
        const newSupplier = await Supplier.createSupplier(req.body);
        res.status(201).json({ id: newSupplier.insertId });
    } catch (error) {
        next(error);
    }
};

const updateSupplier = async (req, res, next) => {
    try {
        const updatedSupplier = await Supplier.updateSupplier(
            req.params.id,
            req.body
        );
        res.json(updatedSupplier);
    } catch (error) {
        next(error);
    }
};

const deleteSupplier = async (req, res, next) => {
    try {
        await Supplier.deleteSupplier(req.params.id);
        res.json({ message: 'Supplier deleted' });
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getSuppliers,
    getSupplierById,
    createSupplier,
    updateSupplier,
    deleteSupplier,
};
