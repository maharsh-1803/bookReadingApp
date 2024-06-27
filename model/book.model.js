const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
    page_no:{
        type:String,
        require:true
    },
    content:{
        type:String,
        require:true
    }
})

const bookSchema = new mongoose.Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    },
    book_title: {
        type: String,
        required: true
    },
    book_description: {
        type: String,
        required: true
    },
    book_cover_photo: {
        type: String,
    },
    book_page: [pageSchema],
    status: {
        type: String,
        enum:['pending','approve','decline'],
        default:'pending',
        require:true
    }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
