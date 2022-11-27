const express = require("express");
const router = express.Router();
 

const historyController = require('../controllers/historyController');
router.get('/couponhistory', historyController.coupon_history_get);


module.exports = router  ;   