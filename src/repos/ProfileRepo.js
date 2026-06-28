const db = require('../database/mysql');

const findProfile = (userId) => db.promise().query(
  `SELECT USERS.ID, EMAIL_ID, FIRST_NAME, LAST_NAME, ADDRESS_ID, CONTACT,
          WALLET_AMOUNT, PROFILE_IMG, STREET, CITY, STATE, COUNTRY, ZIPCODE
   FROM USERS
   LEFT OUTER JOIN ADDRESS ON ADDRESS.ID = USERS.ADDRESS_ID
   WHERE USERS.ID = ?`,
  [userId],
);

const saveProfile = (userProfile) => db.promise().query(
  'UPDATE USERS SET FIRST_NAME = ?, LAST_NAME = ?, CONTACT = ?, PROFILE_IMG = ? WHERE ID = ?',
  [userProfile.firstname,
    userProfile.lastname,
    userProfile.contact,
    userProfile.profile_img,
    userProfile.id],
);

const saveAddress = (userProfile) => db.promise().query(
  'UPDATE ADDRESS SET STREET = ?, CITY = ?, STATE = ?, COUNTRY = ?, ZIPCODE = ? WHERE ID = ?',
  [userProfile.street,
    userProfile.city,
    userProfile.state,
    userProfile.country,
    userProfile.zipcode,
    userProfile.address_id],
);

const fetchCreditsById = (userId) => db.promise().query(
  'SELECT WALLET_AMOUNT FROM USERS WHERE ID = ?',
  [userId],
);

module.exports = {
  findProfile, saveProfile, saveAddress, fetchCreditsById,
};
