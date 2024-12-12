const express = require('express');

const {
    getInventory,
    createInventory,
    deleteInventory,
} = require('../controllers/warehouseStoreProductController');

const router = express.Router();

router.get('/', getInventory);
router.post('/', createInventory);
router.delete('/:id', deleteInventory);

module.exports = router;
