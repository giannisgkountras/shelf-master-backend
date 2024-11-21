const db = require('../config/db');

const Customer = {
    getAllCustomers: async () => {
        const [rows] = await db.query('SELECT * FROM customer');
        return rows;
    },
    getCustomerById: async (customerId) => {
        const [rows] = await db.query('SELECT * FROM customer WHERE id = ?', [
            customerId,
        ]);
        return rows[0];
    },
    createCustomer: async (customerData) => {
        const { name, email, phone, street, zip } = customerData;
        const [result] = await db.query(
            'INSERT INTO customer (name, email, phone, street, zip ) VALUES (?, ?, ?, ?, ?)',
            [name, email, phone, street, zip]
        );
        return result;
    },
    updateCustomer: async (customerId, customerData) => {
        const { name, email, phone, street, zip } = customerData;
        const [result] = await db.query(
            'UPDATE customer SET name = ?, email = ?, phone = ?, street = ?, zip = ? WHERE id = ?',
            [name, email, phone, street, zip, customerId]
        );
        return { id: customerId, ...customerData };
    },
    deleteCustomer: async (customerId) => {
        const [result] = await db.query('DELETE FROM customer WHERE id = ?', [
            customerId,
        ]);
        return result;
    },
};

module.exports = Customer;
