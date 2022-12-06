require('dotenv').config();
const jwt = require('jsonwebtoken');
const userRepo = require('../repos/UserRepo');

const authMiddleWare = async (req, res, next) => {
  try {
    const accessToken = req.cookies.Authorization || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);

    if (accessToken) {
      const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
      const verificationResponse = (await jwt.verify(accessToken, secretKey));
      const { userId } = verificationResponse;
      const findUser = await userRepo.findByUserId(userId).then((data) => ({
        userId: data[0][0].ID, emailId: data[0][0].EMAIL_ID,
      }));

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        res.status(401).send('Wrong authentication token');
      }
    } else {
      res.status(401).send('Authentication token missing');
    }
  } catch (error) {
    res.status(401).send(error.message);
  }
};

module.exports = authMiddleWare;
