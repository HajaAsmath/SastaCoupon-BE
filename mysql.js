const mysql = require('mysql2');
const logger = require('./src/utils/logger');
require('dotenv').config();
const dbConnect = () => {
  console.log("Inside Mysql");
  const db = mysql.createConnection({
    host: process.env.HOST,
    user: 'admin',
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  });

  console.log(process.env.USERNAME);

//  console.log(db);
  
  
  db.connect((err) => {
      if (err) {
        logger.info(err);
      } else {
        logger.info("MYSQL CONNECTED")
      }
  });
  
  return db;
}

const db = dbConnect();

module.exports = db;
