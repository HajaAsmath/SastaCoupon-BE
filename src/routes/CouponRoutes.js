const express = require("express");
const router = express.Router();
const uploadCouponController = require('../controllers/CouponController');
const authMiddleWare = require('../middlewares/AuthMiddleware');

router.get('/images', authMiddleWare,uploadCouponController.getImagesAndOccasion);
router.post('/uploadCoupon',authMiddleWare, uploadCouponController.uploadCoupon)
router.get('/recent-coupon', uploadCouponController.fetchRecentCoupons);
module.exports = router;