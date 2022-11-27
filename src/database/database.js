const Sequelize = require('sequelize')
require('dotenv').config();
  
const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USERNAME,
    process.env.PASSWORD, {
        dialect: 'mysql', 
        host: process.env.DATABASE
    }
);

module.exports = sequelize  