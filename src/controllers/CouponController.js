const logger = require('../utils/logger')
const couponService = require('../services/CouponService');
const CouponValidationException = require('../exceptions/CouponValidationException');
const memcache = require('../utils/memcache');

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
    let couponArray;
    couponArray = JSON.stringify(await couponService.getRecentCoupons());
    res.status(200).json(couponArray);
    // try {
    //     memcache.get(memcache.generateKey('recent-coupon'), async (err, val) => {
    //         if(err) return null;
    //         couponArray = JSON.parse(val);
    //         if(!couponArray) {
    //             couponArray = JSON.stringify(await couponService.getRecentCoupons());
    //             memcache.set(memcache.generateKey('recent-coupon'), couponArray, 300);
    //         } 
    //         res.status(200).json(couponArray);
    //     });
    // } catch (err) {
    //     logger.error(err);
    //     res.status(500).send();
    // }
} 

const fetchCouponWithFilters = async (req, res) => {
    let {lastSeenId, min, max} = req.query;
    res.status(200).send();
    // let couponArray;
    // try {
    //     couponArray = await couponServoce.getCouponWithFilters();
    //     res.status(200).json(couponArray);
    // }
}

module.exports = {getImagesAndOccasion, uploadCoupon, fetchRecentCoupons, fetchCouponWithFilters};