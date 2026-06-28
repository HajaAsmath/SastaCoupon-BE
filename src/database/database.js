const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    dialectOptions: process.env.DB_SSL === 'true'
      ? { ssl: { rejectUnauthorized: false } }
      : {},
  },
);

module.exports = sequelize;
