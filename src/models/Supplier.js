const { get } = require('../app');
const db = require('../config/db');

// Define the Supplier model
// attributes: id, name, email, phone, street,zip
const Supplier = {
    getAllSuppliers: async () => {
        const [rows] = await db.query(
            'SELECT id, name, email, phone, street, zip FROM supplier'
        );
        return rows;
    },

    getSupplierById: async (supplierId) => {
        const [rows] = await db.query(
            'SELECT id, name, email, phone, street, zip FROM supplier WHERE id = ?',
            [supplierId]
        );
        return rows[0];
    },

    createSupplier: async (supplierData) => {
        const { name, email, phone, street, zip } = supplierData;
        const [result] = await db.query(
            'INSERT INTO supplier (name, email, phone, street, zip) VALUES (?, ?, ?, ?, ?)',
            [name, email, phone, street, zip]
        );
        return result;
    },

    updateSupplier: async (supplierId, supplierData) => {
        const { name, email, phone, street, zip } = supplierData;
        const [result] = await db.query(
            'UPDATE supplier SET name = ?, email = ?, phone = ?, street = ?, zip = ? WHERE id = ?',
            [name, email, phone, street, zip, supplierId]
        );
        return {
            id: supplierId,
            name: name,
            email: email,
            phone: phone,
            street: street,
            zip: zip,
        };
    },

    deleteSupplier: async (supplierId) => {
        const [result] = await db.query('DELETE FROM supplier WHERE id = ?', [
            supplierId,
        ]);
        return result;
    },
};

module.exports = Supplier;
