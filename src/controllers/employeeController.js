const Employee = require('../models/Employee');

const getEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.getAllEmployees();
        res.json(employees);
    } catch (error) {
        next(error);
    }
};

const getEmployeeById = async (req, res, next) => {
    try {
        const employee = await Employee.getEmployeeById(req.params.id);
        res.json(employee);
    } catch (error) {
        next(error);
    }
};

const createEmployee = async (req, res, next) => {
    try {
        const newEmployee = await Employee.createEmployee(req.body);
        res.status(201).json({ id: newEmployee.insertId });
    } catch (error) {
        next(error);
    }
};

const updateEmployee = async (req, res, next) => {
    try {
        const updatedEmployee = await Employee.updateEmployee(
            req.params.id,
            req.body
        );
        res.json(updatedEmployee);
    } catch (error) {
        next(error);
    }
};

const deleteEmployee = async (req, res, next) => {
    try {
        await Employee.deleteEmployee(req.params.id);
        res.json({ message: 'Employee deleted' });
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
};
