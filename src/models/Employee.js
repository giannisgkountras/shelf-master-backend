const db = require('../config/db');
const bcrypt = require('bcrypt');

const Employee = {
    getAllEmployees: async () => {
        const [rows] = await db.query(
            'SELECT id, fullName, email, role, warehouseID FROM Employee'
        );
        return rows;
    },

    getEmployeeById: async (employeeId) => {
        const [rows] = await db.query(
            'SELECT id, fullName, email, role, warehouseID FROM Employee WHERE id = ?',
            [employeeId]
        );
        return rows[0];
    },

    createEmployee: async (employeeData) => {
        const { fullName, email, role, warehouseID, password } = employeeData;
        let hashedPassword;
        if (!password) {
            // Generate a random password
            hashedPassword = await bcrypt.hash(
                Math.random().toString(36).slice(-8),
                10
            );
        } else {
            // Hash the password
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const [result] = await db.query(
            'INSERT INTO Employee (fullName, email, role, warehouseID, password ) VALUES (?, ?, ?, ?, ?)',
            [fullName, email, role, warehouseID, hashedPassword]
        );
        return result;
    },

    updateEmployee: async (employeeId, employeeData) => {
        const { fullName, email, role, warehouseID } = employeeData;

        // Hash the password
        // const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.query(
            'UPDATE Employee SET fullName = ?, email = ?, role = ?, warehouseID = ? WHERE id = ?',
            [fullName, email, role, warehouseID, employeeId]
        );
        return {
            id: employeeId,
            email: email,
            role: role,
            warehouseID: warehouseID,
        };
    },

    deleteEmployee: async (employeeId) => {
        const [result] = await db.query('DELETE FROM Employee WHERE id = ?', [
            employeeId,
        ]);
        return result;
    },
};

module.exports = Employee;
