require('dotenv').config();
const logger = require('../utils/logger')
const profileService = require('../services/profileService');
const express = require("express");
const mysql = require('mysql');

const multer = require('multer')
const sharp = require('sharp')



const postimage = async (req, res) => {
    
   console.log("Inside Image");

    try {
        await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toFile(__dirname + `/images/${req.file.originalname}`)
        res.status(201).send('Image uploaded succesfully')
   } catch (error) {
       console.log(error)
       res.status(400).send(error)
   }

}


module.exports = {  postimage }