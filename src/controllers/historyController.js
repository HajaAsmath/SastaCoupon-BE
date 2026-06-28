require('dotenv').config();
const logger = require('../utils/logger');
const db = require('../database/mysql');

const coupon_history_get = async (req, res) => {
  const buyerId = req.query.id;
  logger.info('Coupon history request', { buyerId });

  const sql = `
    SELECT od.ORDER_ID, od.COUPON_ID, od.STATUS, od.BUYER_ID, od.SELLER_ID,
           od.TRANSACTION_TYPE, od.PAYMENT_TIMESTAMP, od.PAYMENT_ID, ci.URL
    FROM ORDER_DETAILS od
    LEFT OUTER JOIN COUPON c ON od.COUPON_ID = c.ID
    LEFT OUTER JOIN COUPON_IMAGE ci ON ci.ID = c.IMAGE_ID
    WHERE (od.BUYER_ID = ? OR od.SELLER_ID = ?) AND od.STATUS = ?
    ORDER BY od.PAYMENT_TIMESTAMP DESC
  `;

  db.query(sql, [buyerId, buyerId, 'captured'], (err, result) => {
    if (err) {
      logger.error('Error fetching coupon history', { error: err.message, buyerId });
      return res.status(500).send('Error fetching history');
    }

    if (!result || result.length === 0) {
      return res.status(200).json([]);
    }

    const history = result.map((item) => ({
      ...item,
      TRANSACTION_TYPE: String(item.SELLER_ID) === String(buyerId) ? 'SOLD' : item.TRANSACTION_TYPE,
    }));

    logger.info('History fetched', { buyerId, count: history.length });
    return res.status(200).json(history);
  });
};

module.exports = { coupon_history_get };
