const mysql = require('mysql2');
const fs = require('fs');
const logger = require('../utils/logger');
require('dotenv').config();

const dbConnect = () => {
  const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    ssl: {
      ca: fs.readFileSync('cacert.pem'),
      rejectUnauthorized: false,
    },
  });

  //  console.log(db);

  db.connect((err) => {
    if (err) {
      logger.info(err.stack);
    } else {
      logger.info('MYSQL CONNECTED');
    }
  });

  return db;
};

const db = dbConnect();

module.exports = db;
