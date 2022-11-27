require('dotenv').config();
const shortid = require('shortid')
const Razorpay = require('razorpay')
const mysql = require('mysql');
const logger = require('../utils/logger')
const db = require('../../mysql');

const razorpay = new Razorpay({
    key_id: 'rzp_test_NpKUjWehxc13rP',
    key_secret: 'XutQhK8ic37ngBLlmN2A499v'
})

const payment = async (req, res) => {
    console.log("Inside razor post");
    console.log(req.body);
    const payment_capture = 1
    const amount = req.body.amount * 100;
    console.log(amount);
    const currency = 'INR';
    var sql = 'INSERT INTO ORDER_DETAILS (ORDER_ID,COUPON_ID,STATUS,BUYER_ID,TRANSACTION_TYPE,PAYMENT_ID)VALUES ?';
    const options = {
        amount: amount,
        currency,
        receipt: shortid.generate(),
        payment_capture
    }
    try {
        const response = await razorpay.orders.create(options)
        console.log(response)
        // Updateorder id in db 

        var values = [
            [response.id, req.body.coupon_id, response.status, req.body.id, 'Bought',""]
        ];
      
            db.query(sql, [values], function (err, result, fields) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Executed Successfully');
                    console.log(result.affectedRows + " record(s) updated");
                }
                if (result.length === 0) {
                    res.send("Incorrect Id")
                }
                else {
                    console.log("" + JSON.stringify(result));
                    // res.send(JSON.stringify(result.affectedRows));
                }
            });
        //**************************
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount,
            order_id:response.id
        })
    } catch (error) {
        console.log(error)
    }
}

const verification = (req, res) => {

    console.log("inside verifuy");
    let user_id = req.query.id;
    var result1;
    var sql = 'UPDATE  ORDER_DETAILS SET  STATUS = ?  ,PAYMENT_ID = ? WHERE ORDER_ID = ?';
    

    const secret = 'sastacoupon123'
    console.log(req.body)
    const res_verify = req.body.payload.payment.entity;
    console.log(req.body.payload.payment.entity)

    // *****Verifing the Signature *******************
    const crypto = require('crypto')
    const shasum = crypto.createHmac('sha256', secret)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest('hex')
    console.log(digest, req.headers['x-razorpay-signature'])


    // Verifying the Signature 
    if (digest === req.headers['x-razorpay-signature']) {
        console.log('Request is legit')
            db.query(sql, [res_verify.status,res_verify.id,res_verify.order_id], function (err, result, fields) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Executed Successfully');
                    console.log(result.affectedRows + " record(s) updated");
                }
                if (result.length === 0) {
                    res.send("Incorrect Id")
                }
                else {
                    console.log("" + JSON.stringify(result));
                    // res.send(JSON.stringify(result.affectedRows));
                }
            });

       // })


    } else {
        // pass it
    }
    res.json({ status: 'ok' })

}

const product_details = (req, res) => {
    logger.info(`Product Detail Controller Triggered`);
    let coupon_id =req.query.id;
    console.log(req.query);

    var result1;
    var sql = 'SELECT a.ID,a.NAME, a.DESCRIPTION,a.EXPIRY,a.PRICE,a.SELLER_ID,a.BUYER_ID,a.IMAGE_ID,a.CREATED_TIMESTAMP,a.COUPON_CODE, b.URL, b.OCCASION ,b.DAFAULT_IMAGE  FROM COUPON AS a INNER JOIN COUPON_IMAGE AS b ON a.IMAGE_ID=b.ID WHERE a.ID = ?';


        db.query(sql, [coupon_id], function (err, result, fields) {
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
                res.send(JSON.stringify(result[0]));
            }
        });
    //})
}

module.exports = {  payment, verification, product_details }