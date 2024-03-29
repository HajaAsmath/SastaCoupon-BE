const db = require('../database/mysql');
const { convertDate } = require('../utils/common');
const logger = require('../utils/logger');

const insertCoupon = (coupon) => {
  const expiryDate = new Date(coupon.expiryDate).toISOString().slice(0, 10);
  return db.promise().query(`INSERT INTO COUPON (NAME, DESCRIPTION, EXPIRY, PRICE, SELLER_ID, IMAGE_ID, COUPON_CODE) VALUES ('${coupon.couponName}', '${coupon.couponDiscription}', '${expiryDate}',${coupon.denomination}, ${coupon.userId}, ${coupon.imageId}, '${coupon.couponCode}')`);
};

const findByRecent = () => db.promise().query(`SELECT c.ID, NAME, PRICE, URL FROM COUPON c left join COUPON_IMAGE ci on c.IMAGE_ID = ci.ID WHERE EXPIRY >= DATE('${convertDate(new Date())}') AND SOLD <> 1 ORDER BY CREATED_TIMESTAMP DESC LIMIT 8`);

const findCouponWithFilters = (filters, isCount) => {
  let sql = `SELECT c.ID, NAME, PRICE, URL FROM COUPON c left join COUPON_IMAGE ci on c.IMAGE_ID = ci.ID WHERE SOLD <> 1 AND EXPIRY >= DATE('${convertDate(new Date())}') `;
  if (filters.min || filters.max) {
    sql += 'AND ';
    if (filters.min && filters.max) {
      sql += `PRICE >= ${filters.min} AND PRICE <= ${filters.max} `;
    } else if (filters.min) {
      sql += `PRICE >= ${filters.min} `;
    } else if (filters.max) {
      sql += `PRICE <= ${filters.max} `;
    }
  }
  if (filters.fromDate && filters.toDate) {
    sql += 'AND ';
    const from = convertDate(filters.fromDate);
    const to = convertDate(filters.toDate);
    sql += `EXPIRY BETWEEN DATE('${from}') AND DATE('${to}') `;
  }
  if (!isCount) {
    sql += `LIMIT ${filters.itemsPerPage} OFFSET ${(filters.pageNumber - 1) * filters.itemsPerPage}`;
  }
  logger.info(sql);
  return db.promise().query(sql);
};

const getCouponCount = () => db.promise().query('SELECT COUNT(*) as COUNT FROM COUPON');

module.exports = {
  insertCoupon, findByRecent, findCouponWithFilters, getCouponCount,
};
