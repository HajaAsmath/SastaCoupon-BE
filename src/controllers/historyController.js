require('dotenv').config();
const shortid = require('shortid');
const Razorpay = require('razorpay');
const mysql = require('mysql');
const logger = require('../utils/logger');
const db = require('../database/mysql');

const coupon_history_get = async (req, res) => {
  console.log('Inside History');

  logger.info('Product Detail Controller Triggered');
  const buyer_id = req.query.id;
  console.log(req.query);

  let result1;

  const sql = 'SELECT ORDER_DETAILS.ORDER_ID,ORDER_DETAILS.COUPON_ID,ORDER_DETAILS.STATUS,ORDER_DETAILS.BUYER_ID,ORDER_DETAILS.SELLER_ID,ORDER_DETAILS.TRANSACTION_TYPE,ORDER_DETAILS.PAYMENT_TIMESTAMP,ORDER_DETAILS.PAYMENT_ID,URL FROM ORDER_DETAILS LEFT OUTER JOIN COUPON ON ORDER_DETAILS.COUPON_ID = COUPON.ID  LEFT OUTER JOIN  COUPON_IMAGE ON COUPON_IMAGE.ID = COUPON.IMAGE_ID  WHERE ( ORDER_DETAILS.BUYER_ID = ? OR ORDER_DETAILS.SELLER_ID = ?  ) ORDER BY PAYMENT_TIMESTAMP DESC';

  db.query(sql, [buyer_id, buyer_id], (err, result, fields) => {
    if (err) {
      console.log(err);
    }
    console.log(err);
    console.log('Executed Successfully');
    if (result.length === 0) {
      res.send(JSON.stringify('Incorrect Coupon Id'));
    } else {
      result.map((item) => {
        if (item.SELLER_ID == buyer_id) {
          item.TRANSACTION_TYPE = 'SOLD';
        }
      });
      logger.info(`Response of Product details:${JSON.stringify(result)}`);
      res.status(200).json(JSON.stringify(result));
    }
  });
};

module.exports = { coupon_history_get };
