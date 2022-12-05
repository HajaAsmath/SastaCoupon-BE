const db = require('../database/mysql');

const insertContactUsInfo = (contactUsForm) => db.promise().query(`INSERT INTO sastacoupon.CONTACT_US (NAME, EMAIL, ORDER_ID, MESSAGE) VALUES ('${contactUsForm.customerName}', '${contactUsForm.customerEmail}', '${contactUsForm.orderId}', '${contactUsForm.message}')`);

module.exports = { insertContactUsInfo };
