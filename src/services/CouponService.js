const CouponValidationException = require('../exceptions/CouponValidationException');
const imageRepo = require('../repos/ImageRepo');
const couponValidationService = require('./CouponValidateService')
const couponRepo = require('../repos/CouponRepo')
const {checkObjectForNullValue, checkPastDate} = require('../utils/validator');
const logger = require('../utils/logger');


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

const validateAndUploadCoupon = async (coupon) => {
    //couponValidationService.validateCoupon(coupon.couponCode, coupon.expiryDate);
    if(!checkObjectForNullValue(coupon) && checkPastDate(new Date(coupon.expiryDate))) {
        coupon.imageId = await getImageId(coupon.couponImage);
        await couponRepo.insertCoupon(coupon).then((data) => {
            if(data[0].affectedRows === 1)  {
                return 'Success';
            }
            throw new Error('Error while inserting coupon')
        });
    } else {
        throw new CouponValidationException('Coupon fields are empty');
    } 
}

const getRecentCoupons = async () => {
    return await couponRepo.findByRecent().then(async (data) => {
        const couponArray = data[0];
        return couponArray;
    }).catch((err) => {
        logger.error(err);
        throw new Error('Error fetching coupons');
    })
} 

const getImageId = (url) => {
    return imageRepo.findByImageUrl(url).then((data) =>{
        if(data[0][0]) {
            return data[0][0].ID;
        }
    });;
}

  
module.exports = {getAllImagesAndOccasion, validateAndUploadCoupon, getRecentCoupons}