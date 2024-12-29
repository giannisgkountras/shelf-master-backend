const db = require('../config/db');
const AvailableProductsInWarehouse = {
    getCurrentInventoryForWarehouse: async (warehouseId) => {
        const [rows] = await db.query(
            `SELECT
                productID, product as productName, quantity
            FROM
                Available_Products_In_Warehouse_${warehouseId}`
        );
        return rows;
    }
};

module.exports = AvailableProductsInWarehouse;
