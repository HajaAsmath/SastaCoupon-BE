require('dotenv').config();
const logger = require('../utils/logger');
const db = require('../database/mysql');
const memcache = require('../utils/memcache');

const couponSoldPost = async (req, res) => {
  const couponId = req.body.id || req.query.id;
  logger.info('Marking coupon as sold', { couponId });

  const sql = 'UPDATE COUPON SET SOLD = 1 WHERE ID = ?';

  db.query(sql, [couponId], (err, result) => {
    if (err) {
      logger.error('Error marking coupon as sold', { error: err.message, couponId });
      return res.status(500).send('Error updating coupon status');
    }
    logger.info('Coupon marked as sold', { couponId, affectedRows: result.affectedRows });
    memcache.flush();
    return res.status(200).json({ message: 'Coupon sold', affectedRows: result.affectedRows });
  });
};

module.exports = { couponSoldPost };
