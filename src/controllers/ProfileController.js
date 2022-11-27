
require('dotenv').config();
const logger = require('../utils/logger')
const profileService = require('../services/profileService');
const express = require("express");
const mysql = require('mysql');

// const app = express();
// const cors = require('cors')
// const mysql = require('mysql');
// const router = express.Router();
//app.use(cors())
//app.use(express.json())

const profile_get = async (req, res) => {
    console.log("Inside Profile Controller ")   ;
    let user_id = req.query.id;
    console.log(user_id);
    try {
        const user_detail = await profileService.getUserDetail(user_id);
        console.log(JSON.stringify(user_detail))
        res.status(200).send(JSON.stringify(user_detail[0]));
    } catch (err) {
        logger.error('Error - ', err);
        res.status(500).send();
    }
  
  
    // console.log("Inside");
    // let user_id = req.query.id;
    // console.log(req);
    // console.log(user_id);
    // var sql = 'SELECT USERS.ID,EMAIL_ID,FIRST_NAME,LAST_NAME,ADDRESS_ID,CONTACT,WALLET_AMOUNT,STREET,CITY,STATE,COUNTRY,ZIPCODE FROM USERS INNER JOIN ADDRESS ON ADDRESS.ID = USERS.ADDRESS_ID WHERE USERS.ID = ?';

    // const db = mysql.createConnection({
    //     host: 'sastacoupon.c5lcdzbaqcbr.ap-northeast-1.rds.amazonaws.com',
    //     user: 'admin',
    //     password: 'sastacoupon123',
    //     database: 'sastacoupon'
    // })

    // db.connect((err) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log("MYSQL CONNECTED")
    //     }
    //     db.query(sql, [user_id], function (err, result, fields) {
    //         if (err) {
    //             console.log(err);
    //         }
    //         console.log('Executed Successfully');
    //         if (result.length === 0) {
    //             res.send("Incorrect Id")
    //         }
    //         else {
    //             console.log("" + JSON.stringify(result));
    //             res.send(JSON.stringify(result[0]));
    //         }
    //     });

    // });//connect


}

const db = require('../../mysql');

const profile_post = async (req, res) => {
    const user_profile = req.body;

    // try {
    //     const user_detail = await profileService.saveUserDetail(user_profile);
    //     console.log(JSON.stringify(user_detail))
    //     res.status(200).send(JSON.stringify(user_detail[0]));
    // } catch (err) {
    //     logger.error('Error - ', err);
    //     res.status(500).send();
    // }

    const obj = req.body;
    let user_id = obj.id;
    
    // console.log(obj);
    // console.log(user_id)
    // var result1;
    var sql = 'UPDATE USERS SET FIRST_NAME = ?, LAST_NAME = ?,  CONTACT = ? WHERE ID = ?';
    var sql1 = 'UPDATE ADDRESS SET STREET = ?, CITY = ?,  STATE = ?, COUNTRY = ?, ZIPCODE = ? WHERE ID = ?';

        db.query(sql, [obj.firstname, obj.lastname,obj.contact, user_id] , function (err, result, fields) {
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
              //  res.send(JSON.stringify(result.affectedRows));
            }
        });

   //  Second Query to update address
    db.query(sql1, [req.body.street, req.body.city, req.body.state, req.body.country, req.body.zipcode,'123'], function (err, result, fields) {
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
        res.status(200).send(JSON.stringify(result.affectedRows));
        console.log("Address Updated")
      }
    });//Second Query End


}

module.exports = {  profile_get, profile_post }