const express = require("express");
const mysql = require('mysql');
const router = express.Router();
require("dotenv").config();
const dbConnect = require('../../mysql');

router.get("/", async (req, res) => {

  console.log("Inside");
  let user_id = req.query.id;
  console.log(user_id);
  var sql = 'SELECT USERS.ID,EMAIL_ID,FIRST_NAME,LAST_NAME,ADDRESS_ID,CONTACT,WALLET_AMOUNT,STREET,CITY,STATE,COUNTRY,ZIPCODE FROM USERS INNER JOIN ADDRESS ON ADDRESS.ID = USERS.ADDRESS_ID WHERE USERS.ID = ?';

  const db = mysql.createConnection({
    host: 'sastacoupon.c5lcdzbaqcbr.ap-northeast-1.rds.amazonaws.com',
    user: 'admin',
    password: 'sastacoupon123',
    database: 'sastacoupon'
  })

  db.connect((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("MYSQL CONNECTED")
    }
    db.query(sql, [user_id], function (err, result, fields) {
      if (err) {
        console.log(err);
      }
      console.log('Executed Successfully');
      if (result.length === 0) {
        res.send("Incorrect Id")
      }
      else {
        console.log("" + JSON.stringify(result));
        res.send(JSON.stringify(result[0]));
      }
    });

  });//connect

});//get

router.post("/", async (req, res) => {
  let user_id = req.query.id;

  const name = req.body.name.trim().split(/\s+/);
  console.log(name[0]);
  var result1;
  var sql = 'UPDATE USERS SET FIRST_NAME = ?, LAST_NAME = ?,  CONTACT = ? WHERE ID = ?';
  var sql1 = 'UPDATE ADDRESS SET STREET = ?, CITY = ?,  STATE = ?, COUNTRY = ? ZIPCODE = ? WHERE ID = ?';

  const db = mysql.createConnection({
    host: 'sastacoupon.c5lcdzbaqcbr.ap-northeast-1.rds.amazonaws.com',
    user: 'admin',
    password: 'sastacoupon123',
    database: 'sastacoupon'
  })

  db.connect((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("MYSQL CONNECTED")
    }
    db.query(sql, [name[0], name[1], req.body.contact, user_id], function (err, result, fields) {
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
        res.send(JSON.stringify(result.affectedRows));
      }
    });

  })
  //Second Query to update address
  // db.query(sql1, [req.body.street, req.body.city, req.body.state, req.body.country, req.body.address_id], function (err, result, fields) {
  //   if (err) {
  //     console.log(err);
  //   }
  //   else {
  //     console.log('Executed Successfully');
  //     console.log(result.affectedRows + " record(s) updated");
  //   }
  //   if (result.length === 0) {
  //     res.send("Incorrect Id")
  //   }
  //   else {
  //     console.log("" + JSON.stringify(result));
  //     res.send(JSON.stringify(result.affectedRows));
  //   }
  // });//Second Query End




}
);

module.exports = router;