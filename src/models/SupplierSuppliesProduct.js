const db = require('../config/db');

const SupplierSuppliesProduct = {
    getAllSupplies: async () => {
        const [rows] = await db.query(
            'SELECT id, timestamp, quantity, productID, supplierID FROM Supplier_Supplies_Product'
        );
        return rows;
    },
    createSupply: async (supplyData) => {
        const { timestamp, quantity, productID, supplierID } = supplyData;
        const [result] = await db.query(
            'INSERT INTO Supplier_Supplies_Product (timestamp, quantity, productID, supplierID) VALUES (?, ?, ?, ?)',
            [timestamp, quantity, productID, supplierID]
        );
        return result;
    },
    deleteSupply: async (supplyId) => {
        const [result] = await db.query(
            'DELETE FROM Supplier_Supplies_Product WHERE id = ?',
            [supplyId]
        );
        return result;
    },
};

module.exports = SupplierSuppliesProduct;
