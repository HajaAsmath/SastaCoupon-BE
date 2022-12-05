const db = require('../database/mysql');

const findById = (id) => db.promise().query(`SELECT * from COUPON_IMAGE where ID='${id}'`);

const insertImage = (url) => db.promise().query(`INSERT INTO COUPON_IMAGE (URL) VALUES ('${url}')`);

const findDefaultImagesAndOccaions = () => db.promise().query('SELECT URL, OCCASION, DAFAULT_IMAGE from COUPON_IMAGE');

const findByImageUrl = (url) => db.promise().query(`SELECT ID FROM COUPON_IMAGE WHERE URL='${url}'`);

module.exports = {
  findById, findDefaultImagesAndOccaions, insertImage, findByImageUrl,
};
