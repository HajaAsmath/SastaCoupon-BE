const db = require('../database/mysql');

const findByEmaiId = (email) => db.promise().query(`SELECT * from USERS where EMAIL_ID='${email}'`);

const findByUserId = (userId) => db.promise().query(`SELECT * from USERS where ID=${userId}`);

const createAddress = () => db.promise().query('INSERT INTO ADDRESS (STREET, CITY, STATE, COUNTRY, ZIPCODE) VALUES (null, null, null, null, null)');

const insertUser = (email, password, addressId) => db.promise().query(`INSERT INTO USERS (EMAIL_ID, PASSWORD, ADDRESS_ID) VALUES ('${email}', '${password}', ${addressId})`);

module.exports = {
  findByEmaiId, findByUserId, insertUser, createAddress,
};
