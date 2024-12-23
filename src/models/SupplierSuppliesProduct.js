const db = require('../config/db');

const SupplierSuppliesProduct = {
    getAllSupplies: async () => {
        const [rows] = await db.query(
            `SELECT 
                ssp.id, DATE_FORMAT(ssp.timestamp, '%Y-%m-%d %H:%i:%s') as timestamp, ssp.quantity, 
                ssp.productID, ssp.supplierID, p.name as productName, s.name as supplierName
            FROM
                Supplier_Supplies_Product ssp
            JOIN
                Product p ON ssp.productID = p.id
            JOIN
                Supplier s ON ssp.supplierID = s.id`
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
