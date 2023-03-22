var express = require('express');
var router = express.Router();
const CategoriesModel = require('../models/categories_models')
const CryptoJS = require("crypto-js");


// SKAPA KATEGORI, KEY MÅSTE ANGES // UTAN KEY SVARA 401
router.post('/add', async (req, res) => {
    try {
      if (req.body.token === process.env.TOKEN_KEY) {
        const category = new CategoriesModel(req.body)
        console.log(category);
        await category.save()
        res.status(201).json(category)
      } else {
        res.status(401).end()
      }
    } catch (error) {
      console.log(error)
      res.status(400)
    }
});


// HÄMTA ALLA KATEGORIER
router.get('/', async(req, res) => {
  try {
    const categories = await CategoriesModel.find()
    res.json(categories)
  } catch (error) {
    console.log(error)
    res.status(400)
  }
});

module.exports = router;
