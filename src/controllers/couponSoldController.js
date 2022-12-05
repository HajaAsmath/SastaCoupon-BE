require('dotenv').config();
const shortid = require('shortid')
const Razorpay = require('razorpay')
const mysql = require('mysql');
const logger = require('../utils/logger')
const db = require('../database/mysql');

const couponSoldPost = async (req, res) => {


    logger.info(`Coupon Sold Triggered`+req.body);
    let coupon_id = req.body.id  || req.query.id ;
    console.log(coupon_id)

    var sql_sold = 'UPDATE COUPON SET SOLD = ? WHERE ID = ?';

    db.query(sql_sold, ['1', coupon_id], function (err, result, fields) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Coupon Sold ');
            res.status(200).json(JSON.stringify(result));
        }

    });


}

module.exports = { couponSoldPost }

