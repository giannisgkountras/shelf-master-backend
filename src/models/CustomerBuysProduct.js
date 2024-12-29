const db = require('../config/db');

const CustomerBuysProduct = {
    getAllSales: async () => {
        const [rows] = await db.query(
            `SELECT 
                CBP.id, CBP.timestamp, CBP.quantity, CBP.productID, 
                CBP.customerID, c.name as customerName, p.name as productName
            FROM
                Customer_Buys_Product CBP
            JOIN
                Product p ON CBP.productID = p.id
            JOIN
                Customer c ON CBP.customerID = c.id
            ORDER BY CBP.timestamp DESC`
        );
        return rows;
    },
    createSale: async (saleData) => {
        const { timestamp, quantity, productID, customerID } = saleData;
        const [result] = await db.query(
            'INSERT INTO Customer_Buys_Product (timestamp, quantity, productID, customerID) VALUES(?, ?, ?, ?)',
            [timestamp, quantity, productID, customerID]
        );
        return result;
    },
    deleteSale: async (saleID) => {
        const [result] = await db.query(
            'DELETE FROM Customer_Buys_Product WHERE id = ?',
            [saleID]
        );
        return result;
    },
};

module.exports = CustomerBuysProduct;
