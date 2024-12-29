const db = require('../config/db');

const SupplierSuppliesProduct = {
    getAllSupplies: async () => {
        const [rows] = await db.query(
            `SELECT 
                SSP.id, SSP.timestamp as timestamp, SSP.quantity, SSP.productID, 
                SSP.supplierID, p.name as productName, s.name as supplierName
            FROM
                Supplier_Supplies_Product SSP
            JOIN
                Product p ON SSP.productID = p.id
            JOIN
                Supplier s ON SSP.supplierID = s.id
            ORDER BY SSP.timestamp DESC`
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
