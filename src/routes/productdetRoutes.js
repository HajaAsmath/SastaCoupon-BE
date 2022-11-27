const express = require("express");
const router = express.Router();


const proddetController = require('../controllers/ProddetController');
const authMiddleWare = require('../middlewares/AuthMiddleware');


router.post('/razorpay', proddetController.payment);
router.post('/verification', proddetController.verification);
router.get('/proddet', proddetController.product_details);

module.exports = router;