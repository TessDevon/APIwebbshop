var express = require('express');
var router = express.Router();
const CryptoJS = require("crypto-js");
const OrderModel = require('../models/order_models');
const ProductModel = require('../models/product_models');


// HÄMTA ALLA ORDERS, KEY MÅSTE ANGES FÖR ATT FÅ TILLGÅNG TILL ORDERS, FEL KEY // SKALL MISSLYCKAS
router.get('/all/:API_token', async(req, res) => {
    try { 
        if ( req.params.API_token === process.env.TOKEN_KEY) {
            const orders = await OrderModel.find()
            res.json(orders)
        } else {
            res.status(401).json({"message":"Not Authorized"}).end()
        }
    } catch {
      console.log(error)
      res.status(400)
    }
  });


// SKAPA ORDER FÖR EN SPECIFIK USER
router.post('/add', async (req, res) => {
    try {
      const order = new OrderModel(req.body)  
      await order.save()
      res.status(201).json(order)

      const products = order.products 

      products.forEach(async ({productId, quantity}) => {
        const product = await ProductModel.findById({_id:productId});
        if (product) {
          product.lager -= quantity; 
          await product.save();
        }
      })
    } catch (error) {
      console.log(error)
      res.status(400)
    }
  });


// HÄMTA ORDERS FÖR EN USER // SKALL MISSLYCKAS = INGEN KEY  // SVARA MED 401 // SKALL LYCKAS = KEY
router.post('/user', async(req, res) => {
    try { 
        if (req.body.token === process.env.TOKEN_KEY) {
            const _id = req.body.user
            const order = await OrderModel.find({user:_id})
            res.json(order)
        } else {
            res.status(401).json({"message":"Not Authorized"}).end()
        }
    } catch {
      console.log(error)
      res.status(400)
    }
  });

module.exports = router;