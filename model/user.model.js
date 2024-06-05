const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    reg_from:{
        type:String,
        require:true
    },
    reg_id:{
        type:String,
        require:true
    }
});

const User = mongoose.model('User',userSchema);

module.exports = User;