const axios = require("axios")
const CouponValidationException = require("../exceptions/CouponValidationException");
const logger = require("../utils/logger");
const { checkContainsNumber } = require("../utils/validator");
require('dotenv').config();

const validateCoupon = (couponCode, expiryDate) => {
    logger.info(`${process.env.BACKEND_URL}/validate`)
    return axios.post(`${process.env.BACKEND_URL}/validate`, {
        couponCode: couponCode,
        expiryDate: expiryDate
    });
}

const validateCouponExpiry = (coupon) => { 
    const validationResult = checkContainsNumber(coupon.couponCode);
    if(!validationResult) {
        throw new CouponValidationException("Coupon is invalid, Please try again with numbers in coupon code.");
    }
}

module.exports = {validateCoupon, validateCouponExpiry};