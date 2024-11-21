const Customer = require('../models/Customer');

const getCustomers = async (req, res, next) => {
    try {
        const customers = await Customer.getAllCustomers();
        res.json(customers);
    } catch (error) {
        next(error);
    }
};

const getCustomerById = async (req, res, next) => {
    try {
        const customer = await Customer.getCustomerById(req.params.id);
        res.json(customer);
    } catch (error) {
        next(error);
    }
};

const createCustomer = async (req, res, next) => {
    try {
        const newCustomer = await Customer.createCustomer(req.body);
        res.status(201).json({ id: newCustomer.insertId });
    } catch (error) {
        next(error);
    }
};

const updateCustomer = async (req, res, next) => {
    try {
        const updatedCustomer = await Customer.updateCustomer(
            req.params.id,
            req.body
        );
        res.json(updatedCustomer);
    } catch (error) {
        next(error);
    }
};

const deleteCustomer = async (req, res, next) => {
    try {
        await Customer.deleteCustomer(req.params.id);
        res.json({ message: 'Customer deleted' });
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
};
