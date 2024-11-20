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
        const { capacity, street, zip } = warehouseData;
        const [result] = await db.query(
            'INSERT INTO warehouse (capacity, street, zip) VALUES (?, ?, ?)',
            [capacity, street, zip]
        );
        return result;
    },

    updateWarehouse: async (warehouseId, warehouseData) => {
        const { capacity, street, zip } = warehouseData;
        const [result] = await db.query(
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
