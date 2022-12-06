const db = require('../database/mysql');

const findById = (id) => db.promise().query(`SELECT * from COUPON_IMAGE where ID='${id}'`);

const findDefaultImagesAndOccaions = () => db.promise().query('SELECT URL, OCCASION, DAFAULT_IMAGE from COUPON_IMAGE');

module.exports = { findById, findDefaultImagesAndOccaions };
