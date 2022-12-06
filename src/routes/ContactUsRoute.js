const express = require('express');
const { submitContactUsform } = require('../controllers/ContactUsController');

const router = express.Router();

router.post('/contactUs', submitContactUsform);

module.exports = router;
