const AvailableProductsInWarehouse = require('../models/AvailableProductsInWarehouse');

const getCurrentInventoryForWarehouse = async (req, res, next) => {
    try {
        const currentInventory = await AvailableProductsInWarehouse.getCurrentInventoryForWarehouse(req.params.id)
        res.json(currentInventory);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getCurrentInventoryForWarehouse,
};
