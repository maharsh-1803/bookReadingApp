const mongoose = require('mongoose');

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
        required: true
    },
    book_page: {
        type: [String],
    },
    status: {
        type: Boolean
    }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
