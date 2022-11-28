const db = require('../../mysql');

const insertCoupon = async (coupon) => {
    const expiryDate = new Date(coupon.expiryDate).toISOString().slice(0,10);
    return await db.promise().query(`INSERT INTO sastacoupon.COUPON (NAME, DESCRIPTION, EXPIRY, PRICE, SELLER_ID, IMAGE_ID, COUPON_CODE) VALUES ('${coupon.couponName}', '${coupon.couponDiscription}', '${expiryDate}',${coupon.denomination}, ${coupon.userId}, ${coupon.imageId}, '${coupon.couponCode}')`);
}

const findByRecent = () => {
    return db.promise().query(`SELECT c.ID, NAME, PRICE, URL FROM COUPON c left join COUPON_IMAGE ci on c.IMAGE_ID = ci.ID ORDER BY CREATED_TIMESTAMP DESC LIMIT 8`)
}

const findCouponWithFilters = (lastFetchedId, denomination, fromDate, toDate) => {
    let sql = `SELECT c.ID, NAME, PRICE, URL FROM COUPON c left join COUPON_IMAGE ci on c.IMAGE_ID = ci.ID WHERE c.ID >= ${lastFetchedId} `;
    if(denomination) {
        if(denomination.min) {
            sql = sql + `AND PRICE >= ${denomination.min} `
        }
        if(denomination.max) {
            sql = sql + `AND PRICE <= ${denomination.max} `
        }
    }
    if(fromDate && toDate) {
        const from = new Date(fromDate).toISOString().slice(0,10);
        const to = new Date(toDate).toISOString().slice(0,10);
        sql = sql + `AND CREATED_TIMESTAMP BETWEEN DATE('${from}') AND DATE('${to}') `;
    }

    sql = sql + `LIMIT 30`;
    return db.promise().query(sql);
}

module.exports = {insertCoupon, findByRecent, findCouponWithFilters}