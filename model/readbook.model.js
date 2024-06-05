const mongoose = require('mongoose');

const readbookSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    book_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book",
        require:true
    }
})

const ReadBook = mongoose.model('ReadBook',readbookSchema);

module.exports = ReadBook;