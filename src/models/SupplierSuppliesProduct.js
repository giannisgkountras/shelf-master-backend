const db = require('../config/db');

const SupplierSuppliesProduct = {
    getAllSupplies: async () => {
        const [rows] = await db.query(
            'SELECT id, timestamp, quantity, productID, supplierID FROM supplier_supplies_product'
        );
        return rows;
    },
    createSupply: async (supplyData) => {
        const { timestamp, quantity, productID, supplierID } = supplyData;
        const [result] = await db.query(
            'INSERT INTO supplier_supplies_product (timestamp, quantity, productID, supplierID) VALUES (?, ?, ?, ?)',
            [timestamp, quantity, productID, supplierID]
        );
        return result;
    },
    deleteSupply: async (supplyId) => {
        const [result] = await db.query(
            'DELETE FROM supplier_supplies_product WHERE id = ?',
            [supplyId]
        );
        return result;
    },
};

module.exports = SupplierSuppliesProduct;
