const db = require('../config/db');

const Warehouse = {
    getAllWarehouses: async () => {
        const [rows] = await db.query('SELECT * FROM warehouse');
        return rows;
    },
    createWarehouse: async (warehouseData) => {
        const { capacity, street, zip } = warehouseData;
        const [result] = await db.query(
            'INSERT INTO warehouse (capacity, street, zip) VALUES (?, ?)',
            [capacity, street, zip]
        );
        return result;
    },
};

module.exports = Warehouse;
