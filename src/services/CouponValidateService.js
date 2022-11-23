const { default: axios } = require("axios")
const CouponValidationException = require("../exceptions/CouponValidationException")


const validateCoupon = (couponCode, expiryDate) => {
    axios.post('http://localhost:9000/validate', {
        couponCode: couponCode,
        expiryDate: expiryDate
    }).then(res => {
        if(res.status !== 200) {
            throw new CouponValidationException(res.statusText);
        }
    })
}

module.exports = {validateCoupon};