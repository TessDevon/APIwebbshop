const mongoose = require('mongoose')

const OrderItemSchema = mongoose.Schema({
    productId: {
        type: mongoose.Types.ObjectId,
        ref: 'product'
    }, 
    quantity: Number
})

const OrderSchema = mongoose.Schema({
    user:  {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        require: true
    },
    products: {
        type: [OrderItemSchema],
    }
})

module.exports = mongoose.model('order', OrderSchema)