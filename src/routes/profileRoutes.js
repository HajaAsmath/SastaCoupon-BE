const express = require("express");
const router = express.Router();


const profileController= require('../controllers/ProfileController');
//const authMiddleWare = require('../middlewares/AuthMiddleware');

router.get('/profile', profileController.profile_get);
router.post('/profile', profileController.profile_post);


module.exports = router;

