require('dotenv').config();
const shortid = require('shortid');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const logger = require('../utils/logger');
const db = require('../database/mysql');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const payment = async (req, res) => {
  logger.info('Payment initiated', { body: req.body });
  const paymentCapture = 1;
  const amount = req.body.amount * 100;
  const currency = 'INR';

  const sqlInsertOrder = 'INSERT INTO ORDER_DETAILS (ORDER_ID,COUPON_ID,STATUS,BUYER_ID,SELLER_ID,TRANSACTION_TYPE,PAYMENT_ID) VALUES ?';
  const sqlCreditSeller = 'UPDATE USERS SET WALLET_AMOUNT = WALLET_AMOUNT + ? WHERE ID = ?';

  const options = {
    amount,
    currency,
    receipt: shortid.generate(),
    payment_capture: paymentCapture,
  };

  try {
    const response = await razorpay.orders.create(options);
    logger.info('Razorpay order created', { orderId: response.id });

    const values = [[
      response.id,
      req.body.coupon_id,
      response.status,
      req.body.id,
      req.body.seller_id,
      'Bought',
      '',
    ]];

    db.query(sqlInsertOrder, [values], (err, result) => {
      if (err) {
        logger.error('Error inserting order record', { error: err.message });
        return;
      }
      logger.info('Order record inserted', { affectedRows: result.affectedRows });

      db.query(sqlCreditSeller, [req.body.amount, req.body.seller_id], (creditErr) => {
        if (creditErr) {
          logger.error('Error crediting seller wallet', { error: creditErr.message });
        }
      });
    });

    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
      order_id: response.id,
    });
  } catch (error) {
    logger.error('Razorpay order creation failed', { error: error.message });
    res.status(500).send('Payment processing failed');
  }
};

const verification = (req, res) => {
  logger.info('Payment verification webhook received');

  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    logger.error('RAZORPAY_WEBHOOK_SECRET not configured');
    return res.status(500).json({ status: 'error', message: 'Webhook secret not configured' });
  }

  const sqlUpdateOrder = 'UPDATE ORDER_DETAILS SET STATUS = ?, PAYMENT_ID = ? WHERE ORDER_ID = ?';

  const shasum = crypto.createHmac('sha256', secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest('hex');

  if (digest !== req.headers['x-razorpay-signature']) {
    logger.warn('Invalid Razorpay webhook signature');
    return res.status(400).json({ status: 'invalid_signature' });
  }

  const paymentEntity = req.body.payload.payment.entity;
  logger.info('Webhook signature verified', { paymentId: paymentEntity.id });

  db.query(sqlUpdateOrder, [paymentEntity.status, paymentEntity.id, paymentEntity.order_id], (err, result) => {
    if (err) {
      logger.error('Error updating order status', { error: err.message });
    } else {
      logger.info('Order status updated', { affectedRows: result.affectedRows });
    }
  });

  return res.json({ status: 'ok' });
};

const product_details = (req, res) => {
  const couponId = req.query.id;
  logger.info('Product detail request', { couponId });

  const sql = `
    SELECT a.ID, a.NAME, a.DESCRIPTION, a.EXPIRY, a.PRICE,
           a.SELLER_ID, a.BUYER_ID, a.IMAGE_ID, a.CREATED_TIMESTAMP,
           a.COUPON_CODE, a.SOLD, b.URL, b.OCCASION, b.DAFAULT_IMAGE
    FROM COUPON AS a
    INNER JOIN COUPON_IMAGE AS b ON a.IMAGE_ID = b.ID
    WHERE a.ID = ?
  `;

  db.query(sql, [couponId], (err, result) => {
    if (err) {
      logger.error('Error fetching product details', { error: err.message, couponId });
      return res.status(500).send('Error fetching coupon details');
    }
    if (!result || result.length === 0) {
      logger.warn('Coupon not found', { couponId });
      return res.status(404).send('Coupon not found');
    }
    logger.info('Product details fetched', { couponId });
    return res.status(200).json(result[0]);
  });
};

module.exports = { payment, verification, product_details };
