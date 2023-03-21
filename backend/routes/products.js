var express = require('express');
var router = express.Router();
//const UserModel = require('../models/user_models');
const ProductModel = require('../models/product_models');
const CategoriesModel = require('../models/categories_models');
const CryptoJS = require("crypto-js");


// HÄMTA ALLA PRODUKTER
router.get('/', async(req, res) => {
  try {
    const products = await ProductModel.find().populate({path:'category', select:'name -_id'})
    res.json(products)
  } catch {
    console.log(error)
    res.status(400)
  }
});


// HÄMTA SPECIFIK PRODUKT
router.get('/:id', async(req, res) => {
  try {
    const _id = req.params.id
    const product = await ProductModel.findOne({_id})
    await product.populate({path:'category', select:'name -_id'})
    res.json(product)
  } catch (error){
    console.log(error)
    res.status(400)
  }
});


// SKAPA PRODUKT // UTAN TOKEN SÅ SKALL ANROPET MISSLYCKAS = 401
router.post('/add', async (req, res) => {
  try {
    if (req.body.token != "") {
      const product = new ProductModel(req.body)
      await product.save()
      await product.populate({path:'category', select:'name -_id'})
      res.status(201).json(product)
    } else {
      res.status(401).end()
    }
  } catch (error) {
    console.log(error)
    res.status(400)
  }
});
  
module.exports = router;