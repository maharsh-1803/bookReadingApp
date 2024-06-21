const mongoose = require('mongoose')

const mobileNumberRegex = /^[0-9]{10}$/;

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
        type:String
    },
    status:{
        type:Boolean,
        require:true
    },
    mobile:{
        type:String,
        require:true,
        validate: {
            validator: function(v) {
                return mobileNumberRegex.test(v);
            },
            message: props => `${props.value} is not a valid mobile number!`
        }
        
    },
    email:{
        type:String,
        require:true
    }
},{timestamps:true})

const Author = mongoose.model('Author',authorSchema);

module.exports = Author;