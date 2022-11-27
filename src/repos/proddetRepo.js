const db = require('../../mysql');

const findById = async (id) => {
    return db.promise().query(`SELECT * from COUPON_IMAGE where ID='${id}'`)
}

const findDefaultImagesAndOccaions = async () => {
    return await db.promise().query(`SELECT URL, OCCASION, DAFAULT_IMAGE from COUPON_IMAGE`)
}

module.exports = {findById, findDefaultImagesAndOccaions}