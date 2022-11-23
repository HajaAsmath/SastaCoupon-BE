const express = require("express");
const mysql = require('mysql');
const router = express.Router();
require("dotenv").config();

router.get("/", async (req, res) => {
    let user_id = req.params.id;
    console.log("hello");
    var result1;
  var sql = 'SELECT * FROM USERS WHERE ID = ?';

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
            if(result.length===0){
               res.send("Incorrect Id")
            }
            else{
            console.log(""+JSON.stringify(result));
            res.send(JSON.stringify(result[0]));
            }
          });
      })
    
});

module.exports = router;