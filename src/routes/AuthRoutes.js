const express = require('express');

const router = express.Router();
const authController = require('../controllers/AuthController');

router.post('/logIn', authController.logIn);
router.post('/signUp', authController.signUp);
router.post('/logout', authController.logout);

module.exports = router;
