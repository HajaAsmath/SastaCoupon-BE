/* eslint-disable no-param-reassign */
const logger = require('../utils/logger');
const couponService = require('../services/CouponService');
const validateCouponService = require('../services/CouponValidateService');
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
};

const uploadCoupon = async (req, res) => {
  try {
    const coupon = req.body;
    coupon.userId = req.user.userId;
    await couponService.validateAndUploadCoupon(coupon);
    res.status(200).send();
  } catch (err) {
    logger.error(err);
    if (err instanceof CouponValidationException) {
      res.status(err.statusCode()).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
};

const fetchCouponCallback = async (err, val, couponArray, res) => {
  try {
    couponArray = JSON.parse(val);
    if (!couponArray) {
      couponArray = JSON.stringify(await couponService.getRecentCoupons()
        .catch((error) => { throw new Error(error.message); }));
      memcache.set(memcache.generateKey('recent-coupon'), couponArray, 300);
    }
    res.status(200).json(couponArray);
  } catch (error) {
    logger.error('Error fetching recent coupon ', error.message);
    res.send(500).send(error.message);
  }
};

const fetchCouponWithFiltersCallback = async (
  err,
  val,
  itemsPerPage,
  pageNumber,
  min,
  max,
  fromDate,
  toDate,
  couponArray,
  count,
  res,
) => {
  try {
    let couponObj = JSON.parse(val);
    if (!couponObj) {
      const coupon = await couponService.getCouponWithFilters({
        itemsPerPage, pageNumber, min, max, fromDate, toDate,
      }).catch((error) => {
        logger.error(error.message);
        throw new Error(error.message);
      });
      [couponArray, count] = [coupon[0][0], coupon[1]];
      couponObj = { couponArray, count };
      memcache.set(memcache.generateKey(`filtered-coupons${pageNumber}${min}${max}${fromDate}${toDate}`), couponObj, 300)
        .catch((error) => { logger.error('Error while saving to memcache : ', error.message); });
    }
    res.status(200).json(JSON.stringify(couponObj));
  } catch (errr) {
    res.status(500).send();
  }
};

const fetchRecentCoupons = async (req, res) => {
  let couponArray;
  try {
    memcache.get(memcache.generateKey('recent-coupon'), (err, val) => { fetchCouponCallback(err, val, couponArray, res); });
  } catch (err) {
    logger.error(err);
    res.status(500).send();
  }
};

const fetchCouponWithFilters = async (req, res) => {
  const {
    itemsPerPage, pageNumber, min, max, fromDate, toDate,
  } = req.query;
  let couponArray;
  let count;
  try {
    await memcache.get(memcache.generateKey(`filtered-coupons${pageNumber}${min}${max}${fromDate}${toDate}`), (err, val) => {
      fetchCouponWithFiltersCallback(
        err,
        val,
        itemsPerPage,
        pageNumber,
        min,
        max,
        fromDate,
        toDate,
        couponArray,
        count,
        res,
      );
    });
  } catch (err) {
    logger.error(err);
    res.status(500).send();
  }
};

const validateCoupon = (req, res) => {
  const coupon = req.body;
  try {
    validateCouponService.validateCouponExpiry(coupon);
    res.status(200).send();
  } catch (err) {
    logger.error(err);
    res.status(500).send(err.message);
  }
};

const fetchCouponCount = async (req, res) => {
  try {
    const count = await couponService.fetchCouponCount();
    res.status(200).json(count);
  } catch (err) {
    logger.error(err);
    res.send(500);
  }
};

const flushCache = (req, res) => {
  try {
    memcache.flush();
  } catch (err) {
    res.status(500).send();
  }
  res.status(200).send();
};

module.exports = {
  getImagesAndOccasion,
  uploadCoupon,
  fetchRecentCoupons,
  fetchCouponWithFilters,
  validateCoupon,
  fetchCouponCount,
  flushCache,
};
