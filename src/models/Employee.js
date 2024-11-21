const db = require('../config/db');
const bcrypt = require('bcrypt');

const Employee = {
    getAllEmployees: async () => {
        const [rows] = await db.query(
            'SELECT id, fullName, email, role, warehouseID FROM employee'
        );
        return rows;
    },

    getEmployeeById: async (employeeId) => {
        const [rows] = await db.query(
            'SELECT id, fullName, email, role, warehouseID FROM employee WHERE id = ?',
            [employeeId]
        );
        return rows[0];
    },

    createEmployee: async (employeeData) => {
        const { fullName, email, role, warehouseID, password } = employeeData;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.query(
            'INSERT INTO employee (fullName, email, role, warehouseID, password ) VALUES (?, ?, ?, ?, ?)',
            [fullName, email, role, warehouseID, hashedPassword]
        );
        return result;
    },

    updateEmployee: async (employeeId, employeeData) => {
        const { fullName, email, role, warehouseID, password } = employeeData;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.query(
            'UPDATE employee SET fullName = ?, email = ?, role = ?, warehouseID = ?, password = ? WHERE id = ?',
            [fullName, email, role, warehouseID, hashedPassword, employeeId]
        );
        return {
            id: employeeId,
            email: email,
            role: role,
            warehouseID: warehouseID,
        };
    },

    deleteEmployee: async (employeeId) => {
        const [result] = await db.query('DELETE FROM employee WHERE id = ?', [
            employeeId,
        ]);
        return result;
    },
};

module.exports = Employee;
