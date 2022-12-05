const db = require('../database/mysql');

const findProfile = (userId) => db.promise().query(`SELECT USERS.ID,EMAIL_ID,FIRST_NAME,LAST_NAME,ADDRESS_ID,CONTACT,WALLET_AMOUNT,STREET,CITY,STATE,COUNTRY,ZIPCODE FROM USERS INNER JOIN ADDRESS ON ADDRESS.ID = USERS.ADDRESS_ID WHERE USERS.ID = ${userId}`);

const saveProfile = (userProfile) => db.promise()
  .query(`UPDATE USERS SET FIRST_NAME =  ${userProfile.firstname} , LAST_NAME = ${userProfile.lastname} , CONTACT = ${userProfile.contact} WHERE ID =  ${userProfile.id}`);

const fetchCreditsById = (userId) => db.promise().query(`SELECT WALLET_AMOUNT FROM USERS WHERE ID = ${userId}`);

module.exports = { findProfile, saveProfile, fetchCreditsById };
