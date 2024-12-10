const db = require('../config/db');

const Warehouse = {
    getAllWarehouses: async () => {
        const [rows] = await db.query('SELECT * FROM warehouse');
        return rows;
    },

    getWarehouseById: async (warehouseId) => {
        const [rows] = await db.query('SELECT * FROM warehouse WHERE id = ?', [
            warehouseId,
        ]);
        return rows[0];
    },

    createWarehouse: async (warehouseData) => {
        const { capacity, street, zip, city } = warehouseData;

        // Check if the address already exists
        const [existingAddress] = await db.query(
            'SELECT * FROM address WHERE zip = ? AND street = ?',
            [zip, street]
        );

        if (!existingAddress.length) {
            // Insert new address if it doesn't exist
            await db.query(
                'INSERT INTO address (zip, street, city) VALUES (?, ?, ?)',
                [zip, street, city]
            );
        }

        // Insert the warehouse
        const [result] = await db.query(
            'INSERT INTO warehouse (capacity, street, zip) VALUES (?, ?, ?)',
            [capacity, street, zip]
        );

        return { id: result.insertId, ...warehouseData };
    },

    updateWarehouse: async (warehouseId, warehouseData) => {
        const { capacity, street, zip, city } = warehouseData;

        // Check if the address already exists
        const [existingAddress] = await db.query(
            'SELECT * FROM address WHERE zip = ? AND street = ?',
            [zip, street]
        );

        if (!existingAddress.length) {
            // Insert new address if it doesn't exist
            await db.query(
                'INSERT INTO address (zip, street, city) VALUES (?, ?, ?)',
                [zip, street, city]
            );
        } else {
            // Optionally update city in the address if needed
            await db.query(
                'UPDATE address SET city = ? WHERE zip = ? AND street = ?',
                [city, zip, street]
            );
        }

        // Update the warehouse
        await db.query(
            'UPDATE warehouse SET capacity = ?, street = ?, zip = ? WHERE id = ?',
            [capacity, street, zip, warehouseId]
        );

        return { id: warehouseId, ...warehouseData };
    },

    deleteWarehouse: async (warehouseId) => {
        const [result] = await db.query('DELETE FROM warehouse WHERE id = ?', [
            warehouseId,
        ]);
        return result;
    },
};

module.exports = Warehouse;
