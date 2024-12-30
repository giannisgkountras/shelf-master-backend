const express = require('express');
const {
    getWarehouses,
    getWarehouseById,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse,
    getCurrentCapacityForAllWarehouses,
    getCurrentInventoryForWarehouse,
} = require('../controllers/warehouseController');

const router = express.Router();

router.get('/', getWarehouses);
router.get('/current-capacity', getCurrentCapacityForAllWarehouses);
router.get('/current-inventory/:id', getCurrentInventoryForWarehouse);
router.get('/:id', getWarehouseById);
router.post('/', createWarehouse);
router.put('/:id', updateWarehouse);
router.delete('/:id', deleteWarehouse);

module.exports = router;
