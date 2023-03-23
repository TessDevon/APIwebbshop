var express = require('express');
var router = express.Router();
const UserModel = require('../models/user_models');
const CryptoJS = require("crypto-js");


// HÄMTA ALLA USERS // SKICKA INTE MED LÖSENORD // BARA ID, NAMN, EMAIL PÅ ALLA USERS
router.get('/', async(req, res) => {
  try {
    const users = await UserModel.find()
    let resultUsers = users.map(user => ({id:user._id, name:user.name, email:user.email}))
    res.json(resultUsers)
  } catch {
    console.log(error)
    res.status(400)
  }
});

// HÄMTA SPECIFIK USER // SKICKA HELA OBJEKTET
router.post('/', async(req, res) => {
  try {
    const _id = req.body.id
    const user = await UserModel.findOne({_id})
    res.json(user)
  } catch (error){
    console.log(error)
    res.status(400)
  }
});

// SKAPA USER
router.post('/add', async (req, res) => {
  try {
    const user = new UserModel(req.body)
    let passwordToSave = CryptoJS.SHA3(req.body.password).toString()
    user.password = passwordToSave
    await user.save()
    res.status(201).json(user)
  } catch (error) {
    console.log(error)
    res.status(400)
  }
});

// LOGGA IN USER MED EMAIL // VID FEL LÖSENORD SÅ SKALL SVARA MED 401
router.post('/login', function(req, res, next) {
  const { email, password } = req.body;

  UserModel.find({email:email})
  .then (results => {
    for (let i = 0; i < results.length; i++) {
      const foundUser = results[i];
      console.log(CryptoJS.SHA3(password).toString())
      if(CryptoJS.SHA3(password).toString() === foundUser.password) {
        const cookieObject = {id: foundUser.id}
        const cookieData = JSON.stringify(cookieObject)
        const cookiePayload = CryptoJS.AES.encrypt(cookieData, "my key").toString()
        res.cookie(`Usercookie`, cookiePayload);
        res.json("ok")
        return;
      }
    }
    res.status(401).json("Incurrect password or email")
  })
});

module.exports = router;