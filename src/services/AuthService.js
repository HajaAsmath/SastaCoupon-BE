const bcrypt = require('bcrypt');
const userRepo = require('../repos/UserRepo');

const logIn = (email, passsword) => userRepo.findByEmaiId(email)
  .then(async (data) => {
    if (data[0].length > 0) {
      const { ID, PASSWORD, WALLET_AMOUNT } = data[0][0];
      if (await bcrypt.compare(passsword, PASSWORD)) {
        return { userId: ID, credits: WALLET_AMOUNT };
      }
      throw new Error('Username/Password doesn\'t match');
    } else {
      throw new Error('Username/Password doesn\'t match');
    }
  }).catch((err) => {
    throw err;
  });

const signUp = async (email, password) => {
  if (email && password) {
    const user = await userRepo.findByEmaiId(email).then((data) => data[0]);
    if (user.length === 0) {
      const encryptedPassword = await bcrypt.hash(password, 10);
      return userRepo.insertUser(email, encryptedPassword)
        .then((data) => {
          if (data[0].affectedRows === 1) {
            return { userId: data[0].insertId };
          }
          return { userId: null };
        }).catch((err) => {
          throw new Error(err);
        });
    }
    throw new Error('User already exist');
  } else {
    throw new Error('Unexpected error occured');
  }
};

const test = (password) => bcrypt.hash(password, 10);

module.exports = { logIn, signUp, test };
