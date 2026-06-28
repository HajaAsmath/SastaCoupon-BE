require('dotenv').config();
const logger = require('../utils/logger');
const profileService = require('../services/profileService');

const profile_get = async (req, res) => {
  const userId = req.query.id;
  logger.info('Profile fetch request', { userId });

  try {
    const userDetail = await profileService.getUserDetail(userId);
    res.status(200).json(userDetail);
  } catch (err) {
    logger.error('Error fetching profile', { error: err.message, userId });
    if (err.message === 'User not found') {
      res.status(404).send('User not found');
    } else {
      res.status(500).send('Error fetching profile');
    }
  }
};

const profile_post = async (req, res) => {
  const userId = req.body.id;
  logger.info('Profile update request', { userId });

  try {
    await profileService.saveUserDetail(req.body);
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (err) {
    logger.error('Error saving profile', { error: err.message, userId });
    res.status(500).send('Error saving profile');
  }
};

const getUserCredits = async (req, res) => {
  const userId = req.user.userId;
  logger.info('Credits fetch request', { userId });

  try {
    const credits = await profileService.getUserCredits(userId);
    res.status(200).json({ credits });
  } catch (err) {
    logger.error('Error fetching credits', { error: err.message, userId });
    res.status(500).send('Error fetching credits');
  }
};

module.exports = { profile_get, profile_post, getUserCredits };
