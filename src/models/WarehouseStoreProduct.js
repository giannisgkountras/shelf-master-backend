const db = require('../config/db');

const WarehouseStoreProduct = {
    getAllInventory: async () => {
        const [rows] = await db.query(
            `SELECT 
                WSP.id, DATE_FORMAT(WSP.timestamp, '%Y-%m-%d %H:%i:%s') as timestamp, WSP.quantity, 
                p.name as productName, WSP.warehouseID 
            FROM 
                Warehouse_Store_Product WSP
            JOIN 
                Product p ON WSP.productID = p.id
            ORDER BY WSP.timestamp DESC`
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
