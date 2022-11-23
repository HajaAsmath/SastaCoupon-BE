const express = require("express");
const router = express.Router();
const landingPageController = require('../controllers/LandingPageController');

router.get('/recent-coupons',landingPageController.recentCoupons);