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
    }
})