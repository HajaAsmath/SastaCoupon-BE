
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
  //     console.log("Inside Profile Controller ")   ;
  //     let user_id = req.query.id || req.body.id;
  //     console.log(user_id);
  //     try {
  //         const user_detail = await profileService.getUserDetail(user_id);
  //         console.log(JSON.stringify(user_detail))
  //         res.status(200).send(JSON.stringify(user_detail[0]));
  //     } catch (err) {
  //         logger.error('Error - ', err);
  //         res.status(500).send();
  //     }


  console.log("Inside");
  let user_id = req.query.id;
  // console.log(req);
  console.log(req.query.id);
  var sql = 'SELECT USERS.ID,EMAIL_ID,FIRST_NAME,LAST_NAME,ADDRESS_ID,CONTACT,WALLET_AMOUNT,PROFILE_IMG,STREET,CITY,STATE,COUNTRY,ZIPCODE FROM USERS LEFT OUTER JOIN ADDRESS ON ADDRESS.ID = USERS.ADDRESS_ID WHERE USERS.ID = ? ';

  db.query(sql, [user_id], function (err, res1, fields) {
    if (err) {
      console.log(err);
    }
    console.log('Executed Successfully' + JSON.stringify(res1[0]));
    if (res1.length == 0) {
      res.send(JSON.stringify(res1[0]));
      // res.send("Incorrect Id")
    }
    else {
      console.log("" + JSON.stringify(res1));
      res.send(JSON.stringify(res1[0]));
    }
  });




}

const db = require('../database/mysql');

const profile_post = async (req, res) => {
  const user_profile = req.body;

  const obj = req.body;
  logger.info("hello"+JSON.stringify(obj));
  let user_id = obj.id;


  var sql = 'UPDATE USERS SET FIRST_NAME = ?, LAST_NAME = ?,  CONTACT = ? ,PROFILE_IMG = ? WHERE ID = ?';
  var sql1 = 'UPDATE ADDRESS SET STREET = ?, CITY = ?,  STATE = ?, COUNTRY = ?, ZIPCODE = ? WHERE ID = ?';

  db.query(sql, [obj.firstname, obj.lastname, obj.contact, obj.profile_img, user_id], function (err, result, fields) {
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
  console.log(req.body);
  //  Second Query to update address
  db.query(sql1, [req.body.street, req.body.city, req.body.state, req.body.country, req.body.zipcode, req.body.address_id], function (err, result, fields) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Executed address  Successfully');
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

const getUserCredits = async (req, res) => {
  try {
    const credits = await profileService.getUserCredits(req.user.userId).catch(err => {
      throw Error('Unexpected error while fetching credits');
    });
    res.status(200).json(JSON.stringify({ credits: credits }));
  } catch (err) {
    logger.error('Error fetching credits - ', err);
    res.status(500).send(err.message);
  }
}

module.exports = { profile_get, profile_post, getUserCredits }