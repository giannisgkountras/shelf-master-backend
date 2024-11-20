const express = require('express');
const {
    getWarehouses,
    getWarehouseById,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse,
} = require('../controllers/warehouseController');

const router = express.Router();

router.get('/', getWarehouses);
router.get('/:id', getWarehouseById);
router.post('/', createWarehouse);
router.put('/:id', updateWarehouse);
router.delete('/:id', deleteWarehouse);

module.exports = router;
