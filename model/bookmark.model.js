const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    book_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book",
        require:true
    }
})

const Bookmark = mongoose.model('Bookmark',bookmarkSchema);

module.exports = Bookmark;