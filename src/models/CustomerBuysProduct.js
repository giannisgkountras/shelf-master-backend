const db = require('../config/db');

const CustomerBuysProduct = {
    getAllSales: async () => {
        const [rows] = await db.query(
            `SELECT 
                cbp.id, cbp.timestamp, cbp.quantity, cbp.productID, 
                cbp.customerID, c.name as customerName, p.name as productName
            FROM
                Customer_Buys_Product cbp
            JOIN
                Product p ON cbp.productID = p.id
            JOIN
                Customer c ON cbp.customerID = c.id
            ORDER BY timestamp DESC`
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
