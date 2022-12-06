require('dotenv').config();
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

const authService = require('../services/AuthService');

const addJwtToken = (user, res) => {
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET_KEY);
  const options = {
    maxAge: 1000 * 60 * 15,
  };
  res.cookie('Authorization', accessToken, options);
  return accessToken;
};

const logIn = async (req, res) => {
  let result;
  try {
    result = await authService.logIn(req.body.email, req.body.password);
    if (result) {
      const token = addJwtToken({ userId: result.userId, email: req.body.email }, res);
      res.status(200).json({
        userId: result.userId, email: req.body.email, credits: result.credits, token,
      });
    }
  } catch (err) {
    logger.error(err);
    res.status(404).send(err.message);
  }
};

const signUp = async (req, res) => {
  try {
    const result = await authService.signUp(req.body.email, req.body.password);
    const token = addJwtToken({ email: req.body.email }, res);
    res.status(200).json({ userId: result.userId, email: req.body.email, token });
  } catch (err) {
    logger.error(err);
    res.status(500).send(err.message);
  }
};

const logout = () => 'Success';

const test = async (req, res) => {
  try {
    res.end(await authService.test('mcpc123'));
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  logIn, signUp, logout, test,
};
