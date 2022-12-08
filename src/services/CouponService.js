/* eslint-disable no-restricted-syntax */
const CouponValidationException = require('../exceptions/CouponValidationException');
const imageRepo = require('../repos/ImageRepo');
const couponValidationService = require('./CouponValidateService');
const couponRepo = require('../repos/CouponRepo');
const { checkObjectForNullValue, checkPastDate } = require('../utils/validator');
const logger = require('../utils/logger');
const memcache = require('../utils/memcache');

const getImageId = (url) => imageRepo.findByImageUrl(url).then((data) => {
  if (data[0][0]) {
    return data[0][0].ID;
  }
  return null;
});

const getAllImagesAndOccasion = () => imageRepo.findDefaultImagesAndOccaions().then((data) => {
  const imageList = new Map();
  if (data[0][0]) {
    for (const bean of data[0]) {
      if (imageList.get(bean.OCCASION)) {
        const list = imageList.get(bean.OCCASION);
        list.push(bean.URL);
        imageList.set(bean.OCCASION, list);
      } else {
        imageList.set(bean.OCCASION, [bean.URL]);
      }
    }
    return imageList;
  }
  return imageList;
});

const validateAndUploadCoupon = async (coupon) => {
  await couponValidationService.validateCoupon(coupon.couponCode, coupon.expiryDate)
    .catch((err) => {
      throw new CouponValidationException(err.response.data);
    });
  if (!checkObjectForNullValue(coupon) && checkPastDate(new Date(coupon.expiryDate))) {
    // eslint-disable-next-line no-param-reassign
    coupon.imageId = await getImageId(coupon.couponImage);
    await couponRepo.insertCoupon(coupon).then((data) => {
      if (data[0].affectedRows === 1) {
        memcache.flush();
        return 'Success';
      }
      return 'Failure';
    }).catch(() => {
      throw new Error('Error while inserting coupon');
    });
  } else {
    throw new CouponValidationException('Coupon fields are empty');
  }
};

const getRecentCoupons = () => couponRepo.findByRecent().then(async (data) => {
  const couponArray = data[0];
  return couponArray;
}).catch((err) => {
  logger.error(err);
  throw new Error('Error fetching coupons');
});

const fetchCouponCount = () => couponRepo.getCouponCount().then((data) => {
  if (data[0]) {
    return data[0];
  }
  return null;
});

const getCouponWithFilters = async (filters) => {
  const couponArray = await couponRepo.findCouponWithFilters(filters).then((data) => {
    if (data[0]) {
      return [data[0]];
    }
    throw new Error('No data found');
  }).catch((error) => {
    logger.error('Error fetching coupon', error.message);
    throw new Error(error);
  });
  const count = await couponRepo.findCouponWithFilters(filters, true).then((data) => {
    if (data[0]) {
      return [data[0].length];
    }
    throw new Error('No data found');
  });

  return [couponArray, count];
};

module.exports = {
  getAllImagesAndOccasion,
  validateAndUploadCoupon,
  getRecentCoupons,
  getCouponWithFilters,
  fetchCouponCount,
};
