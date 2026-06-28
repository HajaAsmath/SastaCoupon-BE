const mysql = require('mysql2');
const fs = require('fs');
const logger = require('../utils/logger');
require('dotenv').config();

const dbConnect = () => {
  const config = {
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  };

  if (process.env.DB_SSL === 'true') {
    config.ssl = {
      ca: fs.readFileSync('cacert.pem'),
      rejectUnauthorized: false,
    };
  }

  const db = mysql.createConnection(config);

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
