const db = require('../../mysql');

const findById = async (id) => {
    return db.promise().query(`SELECT * from COUPON_IMAGE where ID='${id}'`)
}

const insertImage = async (url) => {
    return db.promise().query(`INSERT INTO COUPON_IMAGE (URL) VALUES ('${url}')`);
}

const findDefaultImagesAndOccaions = async () => {
    return await db.promise().query(`SELECT URL, OCCASION, DAFAULT_IMAGE from COUPON_IMAGE`);
}

const findByImageUrl = async (url) => {
    return await db.promise().query(`SELECT ID FROM COUPON_IMAGE WHERE URL='${url}'`);
}

module.exports = {findById, findDefaultImagesAndOccaions, insertImage, findByImageUrl}