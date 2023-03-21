var express = require('express');
var router = express.Router();
const CategoriesModel = require('../models/categories_models')

const CryptoJS = require("crypto-js");

// HÄMTA ALLA PRODUKTER FÖR EN SPECIFIK KATEGORI
/*router.post('/', async(req, res) => {
  try {
    //const category = req.body.name
    const productsByCategory = await CategoriesModel.findAll({name: name})
    res.json(productsByCategory)
  } catch (error){
    console.log(error)
    res.status(400)
  }
});*/


// SKAPA KATEGORI, KEY MÅSTE ANGES // UTAN KEY SVARA 401
router.post('/add', async (req, res) => {
    try {
      if (req.body.token != "") {
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

module.exports = router;
