const db = require('../../mysql');

const findByEmaiId = (email) => {
    return db.promise().query(`SELECT * from USERS where EMAIL_ID='${email}'`)
}

const findByUserId = (userId) => {
    return db.promise().query(`SELECT * from USERS where ID=${userId}`);
}

const insertUser = (email, password) => {
    return db.promise().query(`INSERT INTO USERS (EMAIL_ID, PASSWORD) VALUES ('${email}', '${password}')`);
}

module.exports = {findByEmaiId, findByUserId, insertUser}