const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    category_name:{
        type:String,
        require:true
    }
},{timestamps:true})

const category = mongoose.model('category',categorySchema);

module.exports = category;