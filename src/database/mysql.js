const mysql = require('mysql2');
const logger = require('../utils/logger');
require('dotenv').config();

const dbConnect = () => {
  const config = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  };

  if (process.env.DB_SSL === 'true') {
    config.ssl = { rejectUnauthorized: false };
  }

  const db = mysql.createConnection(config);

  db.connect((err) => {
    if (err) {
      logger.error('MySQL connection failed', { error: err.message });
    } else {
      logger.info('MySQL connected');
    }
  });

  return db;
};

const db = dbConnect();

module.exports = db;
