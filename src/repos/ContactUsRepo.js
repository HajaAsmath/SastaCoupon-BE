const db = require('../database/mysql');
const logger = require('../utils/logger');

const insertContactUsInfo = async (contactUsForm) => {
    return await db.promise().query(`INSERT INTO sastacoupon.CONTACT_US (NAME, EMAIL, ORDER_ID, MESSAGE) VALUES ('${contactUsForm.customerName}', '${contactUsForm.customerEmail}', '${contactUsForm.orderId}', '${contactUsForm.message}')`);
}

module.exports = {insertContactUsInfo}