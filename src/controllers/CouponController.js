const logger = require('../utils/logger')
const couponService = require('../services/CouponService');
const validateCouponService = require('../services/CouponValidateService')
const CouponValidationException = require('../exceptions/CouponValidationException');
const domain = require('domain').create();
const memcache = require('../utils/memcache');

// domain.on('error', (err) => {
//     logger.error(err.message);
// })

const getImagesAndOccasion = async (req, res) => {
    try {
        const imageList = await couponService.getAllImagesAndOccasion();
        res.status(200).send(JSON.stringify(Object.fromEntries(imageList)));
    } catch (err) {
        logger.error('Error - ', err);
        res.status(500).send();
    }
}

const uploadCoupon = async (req, res, next) => {
    try {
        const coupon = req.body;
        coupon.userId = req.user.userId;
        await couponService.validateAndUploadCoupon(coupon);
        res.status(200).send();
    }catch(err) {
        logger.error(err);
        if(err instanceof CouponValidationException) {
            res.status(err.statusCode()).send(err.message);
        } else {
            res.status(500).send(err.message);
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

const fetchCouponWithFilters = async (req, res, next) => {
    let {itemsPerPage, pageNumber, min, max, fromDate, toDate} = req.query;
    let couponArray;
    try {
        couponObj = await couponService.getCouponWithFilters({itemsPerPage, pageNumber, min, max, fromDate, toDate});
        couponArray = couponObj[0][0];
        const count = couponObj[1];
        res.status(200).json(JSON.stringify({couponArray, count}));
    }catch (err) {
        logger.error(err);
        res.send(500);
    }
}

const validateCoupon = (req, res) => {
    let coupon = req.body;
    try {
        validateCouponService.validateCouponExpiry(coupon);
        res.status(200).send();
    } catch(err) {
        logger.error(err);
        res.status(500).send();
    }
}

const fetchCouponCount = async (req, res) => {
    try {
        const count = await couponService.fetchCouponCount();
        res.status(200).json(count);
    } catch(err) {
        logger.error(err);
        res.send(500);
    }
}
 
module.exports = {getImagesAndOccasion, uploadCoupon, fetchRecentCoupons, fetchCouponWithFilters, validateCoupon, fetchCouponCount};