const db = require('../database/mysql');

const findById = (id) => db.promise().query('SELECT * FROM COUPON_IMAGE WHERE ID = ?', [id]);

const insertImage = (url) => db.promise().query('INSERT INTO COUPON_IMAGE (URL) VALUES (?)', [url]);

const findDefaultImagesAndOccaions = () => db.promise().query('SELECT URL, OCCASION, DAFAULT_IMAGE FROM COUPON_IMAGE WHERE DAFAULT_IMAGE = 1');

const findByImageUrl = (url) => db.promise().query('SELECT ID FROM COUPON_IMAGE WHERE URL = ?', [url]);

const insertBrandImage = (dataUrl, brandName) => db.promise().query(
  'INSERT INTO COUPON_IMAGE (URL, OCCASION, DAFAULT_IMAGE) VALUES (?, ?, 0)',
  [dataUrl, brandName],
);

module.exports = {
  findById, findDefaultImagesAndOccaions, insertImage, findByImageUrl, insertBrandImage,
};
