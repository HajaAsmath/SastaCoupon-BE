const imageRepo = require('../repos/ImageRepo');
const couponValidationService = require('../services/CouponValidateService')


const getAllImagesAndOccasion = async () => {
    return await imageRepo.findDefaultImagesAndOccaions().then((data) => {
        const imageList = new Map();
        if(data[0][0]) {
            for(const bean of data[0]) {
                if(imageList.get(bean.OCCASION)) {
                    const list = imageList.get(bean.OCCASION);
                    list.push(bean.URL);
                    imageList.set(bean.OCCASION, list);
                } else {
                    imageList.set(bean.OCCASION, [bean.URL]);
                }
            }
            return imageList;
        }
    });
}

// const validateAndUploadCoupon = (coupon) => {
//     try {
//         couponValidationService.validateCoupon(coupon.couponCode, coupon.expiryDate);
//     } catch(err) {
//         if(err instanceof )
//     }
// }

module.exports = {getAllImagesAndOccasion} // , validateAndUploadCoupon}