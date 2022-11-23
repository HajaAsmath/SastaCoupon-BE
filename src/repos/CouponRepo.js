const db = require('../../mysql');

const insertCoupon = async (coupon) => {
    const expiryDate = new Date(coupon.expiryDate).toISOString().slice(0,10);
    return await db.promise().query(`INSERT INTO sastacoupon.COUPON (NAME, DESCRIPTION, EXPIRY, PRICE, SELLER_ID, IMAGE_ID, COUPON_CODE) VALUES ('${coupon.couponName}', '${coupon.couponDiscription}', '${expiryDate}',${coupon.denomination}, ${coupon.userId}, ${coupon.imageId}, '${coupon.couponCode}')`);
}

const findByRecent = () => {
    return db.promise().query(`SELECT c.ID, NAME, PRICE, URL FROM COUPON c left join COUPON_IMAGE ci on c.IMAGE_ID = ci.ID ORDER BY CREATED_TIMESTAMP LIMIT 8`)
}

module.exports = {insertCoupon, findByRecent}