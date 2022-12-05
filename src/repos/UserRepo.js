const db = require('../database/mysql');

const findByEmaiId = (email) => db.promise().query(`SELECT * from USERS where EMAIL_ID='${email}'`);

const findByUserId = (userId) => db.promise().query(`SELECT * from USERS where ID=${userId}`);

const insertUser = (email, password) => db.promise().query(`INSERT INTO USERS (EMAIL_ID, PASSWORD) VALUES ('${email}', '${password}')`);

module.exports = { findByEmaiId, findByUserId, insertUser };
