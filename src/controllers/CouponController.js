const logger = require('../utils/logger')
const couponService = require('../services/CouponService');
const CouponValidationException = require('../exceptions/CouponValidationException');

const getImagesAndOccasion = async (req, res) => {
    try {
        const imageList = await couponService.getAllImagesAndOccasion();
        res.status(200).send(JSON.stringify(Object.fromEntries(imageList)));
    } catch (err) {
        logger.error('Error - ', err);
        res.status(500).send();
    }
}

const uploadCoupon = (req, res) => {
    try {
        const coupon = req.body;
        coupon.userId = req.user.userId;
        couponService.validateAndUploadCoupon(coupon);
        res.send(200);
    }catch(err) {
        logger.error(err);
        if(err instanceof CouponValidationException) {
            res.status(err.statusCode()).send(err);
        } else {
            res.status(500).send(err);
        }
    }
}

const fetchRecentCoupons = async (req, res) => {
    try {
        const couponArray = JSON.stringify(await couponService.getRecentCoupons());
        res.status(200).json(couponArray);
    } catch (err) {
        res.status(500).send();
    }
}

module.exports = {getImagesAndOccasion, uploadCoupon, fetchRecentCoupons};