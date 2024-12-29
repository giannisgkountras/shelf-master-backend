const express = require('express');

const {
    getSales,
    createSale,
    deleteSale,
} = require('../controllers/customerBuysProductController');

const router = express.Router();

router.get('/', getSales);
router.post('/', createSale);
router.delete('/:id', deleteSale);

module.exports = router;
