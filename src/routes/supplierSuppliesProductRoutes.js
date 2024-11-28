const express = require('express');

const {
    getSupplies,
    createSupply,
    deleteSupply,
} = require('../controllers/supplierSuppliesProductController');

const router = express.Router();

router.get('/', getSupplies);
router.post('/', createSupply);
router.delete('/:id', deleteSupply);

module.exports = router;
