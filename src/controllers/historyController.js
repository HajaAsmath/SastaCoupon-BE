require('dotenv').config();
const shortid = require('shortid')
const Razorpay = require('razorpay')
const mysql = require('mysql');
const logger = require('../utils/logger')
const db = require('../../mysql');

const coupon_history_get = async (req, res) => {
console.log( "Inside History" );

logger.info(`Product Detail Controller Triggered`);
let buyer_id =req.query.id;
console.log(req.query);

var result1;
var sql = 'SELECT * FROM ORDER_DETAILS  WHERE BUYER_ID = ?';

    db.query(sql, [buyer_id], function (err, result, fields) {
        if (err) {
            console.log(err);
        }
        console.log(err);
        console.log('Executed Successfully');
        if (result.length === 0) {
            res.send("Incorrect Coupon Id")
        }
        else {
            logger.info("Response of Product details:" + JSON.stringify(result));
            res.status(200).json(JSON.stringify(result));
        }
    });
 



}

module.exports = { coupon_history_get}