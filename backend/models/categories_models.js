const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    }/*,
    token: {
        type: String,
        require: true
    },*/
})

module.exports = mongoose.model('category', CategorySchema)