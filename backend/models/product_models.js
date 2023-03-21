const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        require:true
    },
    description: {
        type:String,
        require:true
    },
    price: {
        type: Number,
        require:true
    },
    lager: {
        type: Number,
        require: true
    },
    category: {        
        type:mongoose.Types.ObjectId,
        ref: "category",
        require:true
    }/*, 
    token: {
        type: String,
        requeire: true
    }*/
})


module.exports = mongoose.model('product', ProductSchema)