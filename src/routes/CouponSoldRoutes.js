const express = require('express');

const router = express.Router();

const couponsoldController = require('../controllers/couponSoldController');

router.post('/couponsold', couponsoldController.couponSoldPost);

module.exports = router;
