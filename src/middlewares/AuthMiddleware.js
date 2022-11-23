require('dotenv').config();
const jwt = require('jsonwebtoken')
const userRepo = require('../repos/UserRepo')


const authMiddleWare = async (req, res, next) => {
    try {
        const accessToken = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
    
        if (accessToken) {
          const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
          const verificationResponse = (await jwt.verify(accessToken, secretKey));
          const userId = verificationResponse.userId;
          const findUser = await userRepo.findByUserId(userId).then(data => {
              return {userId: data[0][0].ID, emailId: data[0][0].EMAIL_ID}
          });
    
          if (findUser) {
            req.user = findUser;
            next();
          } else {
            next(new Error('Wrong authentication token'));
          }
        } else {
          next(new Error('Authentication token missing'));
        }
      } catch (error) {
        next(new Error('Wrong authentication token'));
      }
}
 
module.exports = authMiddleWare;