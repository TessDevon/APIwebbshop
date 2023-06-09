var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose')

require("dotenv").config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/products');
var categoriesRouter = require('./routes/categories');
var ordersRouter = require('./routes/orders');

var app = express();

async function init() {
    try{
        const options = {useNewUrlParser:true, useUnifiedTopology:true}
        await mongoose.connect(process.env.MONGODB_URL, options)
        console.log("Connected to database")
    } catch (error) {
        console.error(error)
    }
}
init()

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("secretkey"));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/orders', ordersRouter);

module.exports = app;
