const Author = require('../model/author.model.js');
const Book = require('../model/book.model.js');
const Category = require('../model/category.model.js');

const addBook = async (req, res) => {
    const { book_title, book_description, book_page, status, category_name, author_name } = req.body;
    const file = req.file;

    try {
        const author = await Author.findOne({ author_name });
        if (!author) {
            return res.status(400).send({ error: 'Author not found' });
        }

        const category = await Category.findOne({ category_name });
        if (!category) {
            return res.status(400).send({ error: 'Category not found' });
        }

        if (!file) {
            return res.status(400).send({ error: 'Book cover photo is required' });
        }

        const newBook = new Book({
            category_id: category._id,
            author_id: author._id,
            book_title,
            book_description,
            book_cover_photo: file.filename,
            book_page,
            status,
        });

        await newBook.save();
        res.status(200).send(newBook);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

const deleteBook = async(req,res)=>{
    const {id} = req.params;
}

module.exports = {
    addBook
}
