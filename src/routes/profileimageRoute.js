const express = require('express');
const multer = require('multer')
const sharp = require('sharp')
const router = express.Router();

const profileimageController = require('../controllers/profileimageController');

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a valid image file'))
        }
        cb(undefined, true)
    }
  })

router.post('/image',upload.single('upload'), profileimageController.postimage);


module.exports = router;
