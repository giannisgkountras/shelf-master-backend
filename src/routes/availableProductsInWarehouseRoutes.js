const express = require('express');

const {
    getCurrentInventoryForWarehouse,
} = require('../controllers/availableProductsInWarehouseController');

const router = express.Router();

router.get('/:id', getCurrentInventoryForWarehouse);

module.exports = router;
