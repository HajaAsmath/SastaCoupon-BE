const express = require("express");
const router = express.Router();
const authController = require('../controllers/AuthController');
const authMiddleWare = require('../middlewares/AuthMiddleware') 


router.post('/logIn', authController.logIn);
router.post('/signUp', authController.signUp);
router.post('/logout', authController.logout);
router.get('/test', authMiddleWare, authController.test);


module.exports = router;

