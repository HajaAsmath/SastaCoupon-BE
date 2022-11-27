const db = require('../../mysql');


const findProfile = async (userId) => {
    console.log("Inside Profile Repo "+userId)   ;
    return db.promise().query(`SELECT USERS.ID,EMAIL_ID,FIRST_NAME,LAST_NAME,ADDRESS_ID,CONTACT,WALLET_AMOUNT,STREET,CITY,STATE,COUNTRY,ZIPCODE FROM USERS INNER JOIN ADDRESS ON ADDRESS.ID = USERS.ADDRESS_ID WHERE USERS.ID = ${userId}`);
}

const saveProfile = async (user_profile) => {
    console.log("Inside save Profile Repo "+JSON.stringify(user_profile))   ;
    return db.promise()
    .query(`UPDATE USERS SET FIRST_NAME =  ${user_profile.firstname} , LAST_NAME = ${user_profile.lastname} , CONTACT = ${user_profile.contact} WHERE ID =  ${user_profile.id}`);
}

module.exports = { findProfile,saveProfile }