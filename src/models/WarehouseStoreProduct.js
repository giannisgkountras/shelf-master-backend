const db = require('../config/db');

const WarehouseStoreProduct = {
    getAllInventory: async () => {
        const [rows] = await db.query(
            'SELECT id, timestamp, quantity, productID, warehouseID FROM Warehouse_Store_Product'
        );
        return rows;
    },
    createInventory: async (supplyData) => {
        const { timestamp, quantity, productID, warehouseID } = supplyData;
        const [result] = await db.query(
            'INSERT INTO Warehouse_Store_Product (timestamp, quantity, productID, warehouseID) VALUES (?, ?, ?, ?)',
            [timestamp, quantity, productID, warehouseID]
        );
        return result;
    },
    deleteInventory: async (supplyId) => {
        const [result] = await db.query(
            'DELETE FROM Warehouse_Store_Product WHERE id = ?',
            [supplyId]
        );
        return result;
    },
};

module.exports = WarehouseStoreProduct;
