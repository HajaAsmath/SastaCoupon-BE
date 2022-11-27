const express = require("express");
const router = express.Router();
const couponController = require('../controllers/CouponController');
const authMiddleWare = require('../middlewares/AuthMiddleware');

router.get('/images', authMiddleWare,couponController.getImagesAndOccasion);
router.post('/uploadCoupon',authMiddleWare, couponController.uploadCoupon)
router.get('/recent-coupon', couponController.fetchRecentCoupons);
router.get('/coupon-list', couponController.fetchCouponWithFilters)
module.exports = router;