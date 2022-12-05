const profileRepo = require('../repos/ProfileRepo');

const getUserDetail = async (userId) => profileRepo.findProfile(userId).then((data) => {
  console.log(data[0]);
  if (data[0].length > 0) {
    console.log('Inside Profile Service inside check ');

    return data[0];
  }
  throw new Error('User not found');
});
const saveUserDetail = (userProfile) => profileRepo.saveProfile(userProfile).then((data) => {
  if (data[0].length > 0) {
    console.log('Inside Profile Service inside check ');

    return data[0];
  }
  throw new Error('User not found');
});

const getUserCredits = (userId) => profileRepo.fetchCreditsById(userId).then((data) => {
  if (data[0].length > 0) {
    return data[0][0].WALLET_AMOUNT;
  }
  return 'User not found';
});

module.exports = { getUserDetail, saveUserDetail, getUserCredits };
