const axios = require("axios")
const CouponValidationException = require("../exceptions/CouponValidationException")
require('dotenv').config();

const validateCoupon = (couponCode, expiryDate) => {
    return axios.post(`${process.env.BACKEND_URL}/validate`, {
        couponCode: couponCode,
        expiryDate: expiryDate
    });
}

const validateCouponExpiry = (coupon) => { 
    const validationResult = true;
    if(!validationResult) {
        throw new CouponValidationException("Coupon is invalid");
    }
}

module.exports = {validateCoupon, validateCouponExpiry};