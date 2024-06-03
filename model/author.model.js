const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    dob:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    state:{
        type:String,
        require:true
    },
    country:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    photo:{
        originalName:String
    },
    status:{
        type:Boolean,
        require:true
    },
    mobile:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    }
},{timestamps:true})

const Author = mongoose.model('Author',authorSchema);

module.exports = Author;