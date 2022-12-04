const express = require("express");
const router = express.Router();
const couponController = require('../controllers/CouponController');
const authMiddleWare = require('../middlewares/AuthMiddleware');

router.get('/images', authMiddleWare,couponController.getImagesAndOccasion);
router.post('/uploadCoupon',authMiddleWare, couponController.uploadCoupon)
router.get('/recent-coupon', couponController.fetchRecentCoupons);
router.get('/coupon-list', couponController.fetchCouponWithFilters);
router.post('/validate', couponController.validateCoupon);
router.get('/coupons-count', couponController.fetchCouponCount);
router.get('/flushCache', couponController.flushCache)
module.exports = router;