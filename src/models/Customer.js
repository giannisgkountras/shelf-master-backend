const db = require('../config/db');

const Customer = {
    getAllCustomers: async () => {
        const [rows] = await db.query(
            'SELECT * FROM Customer JOIN Address ON Customer.zip = Address.zip AND Customer.street = Address.street'
        );
        return rows;
    },
    getCustomerById: async (customerId) => {
        const [rows] = await db.query('SELECT * FROM Customer WHERE id = ?', [
            customerId,
        ]);
        return rows[0];
    },
    createCustomer: async (customerData) => {
        const { name, email, phone, street, zip, city } = customerData;

        // Check if the Address already exists
        const [existingAddress] = await db.query(
            'SELECT * FROM Address WHERE zip = ? AND street = ?',
            [zip, street]
        );

        if (!existingAddress.length) {
            // Insert new address if it doesn't exist
            await db.query(
                'INSERT INTO Address (zip, street, city) VALUES (?, ?, ?)',
                [zip, street, city]
            );
        }

        // Insert the customer
        const [result] = await db.query(
            'INSERT INTO Customer (name, email, phone, street, zip) VALUES (?, ?, ?, ?, ?)',
            [name, email, phone, street, zip]
        );

        return { id: result.insertId, ...customerData };
    },

    updateCustomer: async (customerId, customerData) => {
        const { name, email, phone, street, zip, city } = customerData;

        // Check if the Address already exists
        const [existingAddress] = await db.query(
            'SELECT * FROM Address WHERE zip = ? AND street = ?',
            [zip, street]
        );

        if (!existingAddress.length) {
            // Insert new Address if it doesn't exist
            await db.query(
                'INSERT INTO Address (zip, street, city) VALUES (?, ?, ?)',
                [zip, street, city]
            );
        } else {
            // Optionally update city in the Address if needed
            await db.query(
                'UPDATE Address SET city = ? WHERE zip = ? AND street = ?',
                [city, zip, street]
            );
        }

        // Update the customer
        await db.query(
            'UPDATE Customer SET name = ?, email = ?, phone = ?, street = ?, zip = ? WHERE id = ?',
            [name, email, phone, street, zip, customerId]
        );

        return { id: customerId, ...customerData };
    },

    deleteCustomer: async (customerId) => {
        const [result] = await db.query('DELETE FROM Customer WHERE id = ?', [
            customerId,
        ]);
        return result;
    },
};

module.exports = Customer;
