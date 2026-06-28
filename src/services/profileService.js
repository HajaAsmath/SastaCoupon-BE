const logger = require('../utils/logger');
const profileRepo = require('../repos/ProfileRepo');

const getUserDetail = async (userId) => {
  const [rows] = await profileRepo.findProfile(userId);
  if (!rows || rows.length === 0) {
    throw new Error('User not found');
  }
  return rows[0];
};

const saveUserDetail = async (userProfile) => {
  await profileRepo.saveProfile(userProfile);
  await profileRepo.saveAddress(userProfile);
  logger.info('User profile saved', { userId: userProfile.id });
};

const getUserCredits = async (userId) => {
  const [rows] = await profileRepo.fetchCreditsById(userId);
  if (!rows || rows.length === 0) {
    throw new Error('User not found');
  }
  return rows[0].WALLET_AMOUNT;
};

module.exports = { getUserDetail, saveUserDetail, getUserCredits };
