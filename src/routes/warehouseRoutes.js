const express = require('express');
const {
    getWarehouses,
    createWarehouse,
} = require('../controllers/warehouseController');

const router = express.Router();

router.get('/', getWarehouses);
router.post('/', createWarehouse);

module.exports = router;
