var express = require('express');
var router = express.Router();
const UserModel = require('../models/user_models');
const CryptoJS = require("crypto-js");

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });
  
  module.exports = router;