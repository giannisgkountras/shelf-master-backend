const db = require('../config/db');

// Define the Supplier model
// attributes: id, name, email, phone, street,zip
const Supplier = {
    getAllSuppliers: async () => {
        const [rows] = await db.query(
            'SELECT id, name, email, phone, Supplier.street, Supplier.zip, city FROM Supplier JOIN Address ON Supplier.zip = Address.zip AND Supplier.street = Address.street'
        );
        return rows;
    },

    getSupplierById: async (supplierId) => {
        const [rows] = await db.query(
            'SELECT id, name, email, phone, street, zip FROM Supplier WHERE id = ?',
            [supplierId]
        );
        return rows[0];
    },

    createSupplier: async (supplierData) => {
        const { name, email, phone, street, zip, city } = supplierData;

        // Check if the address already exists
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

        // Insert the supplier
        const [result] = await db.query(
            'INSERT INTO Supplier (name, email, phone, street, zip) VALUES (?, ?, ?, ?, ?)',
            [name, email, phone, street, zip]
        );

        return { id: result.insertId, ...supplierData };
    },

    updateSupplier: async (supplierId, supplierData) => {
        const { name, email, phone, street, zip, city } = supplierData;

        // Check if the address already exists
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
        } else {
            // Optionally update city in the address if needed
            await db.query(
                'UPDATE Address SET city = ? WHERE zip = ? AND street = ?',
                [city, zip, street]
            );
        }

        // Update the supplier
        await db.query(
            'UPDATE Supplier SET name = ?, email = ?, phone = ?, street = ?, zip = ? WHERE id = ?',
            [name, email, phone, street, zip, supplierId]
        );

        return { id: supplierId, ...supplierData };
    },

    deleteSupplier: async (supplierId) => {
        const [result] = await db.query('DELETE FROM Supplier WHERE id = ?', [
            supplierId,
        ]);
        return result;
    },
};

module.exports = Supplier;
