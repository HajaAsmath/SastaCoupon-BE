const axios = require("axios")
const CouponValidationException = require("../exceptions/CouponValidationException");
const logger = require("../utils/logger");
require('dotenv').config();

const validateCoupon = (couponCode, expiryDate) => {
    logger.info(`${process.env.BACKEND_URL}/validate`)
    return axios.post(`${process.env.BACKEND_URL}/validate`, {
        couponCode: couponCode,
        expiryDate: expiryDate
    });
}

const validateCouponExpiry = (coupon) => { 
    const validationResult = Math.random() > 0.5 ? true : false;
    if(!validationResult) {
        throw new CouponValidationException("Coupon is invalid");
    }
}

module.exports = {validateCoupon, validateCouponExpiry};