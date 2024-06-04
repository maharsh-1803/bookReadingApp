const Author = require('../model/author.model.js');
const Book = require('../model/book.model.js');
const Category = require('../model/category.model.js');

const addBook = async (req, res) => {
    const { book_title, book_description, book_page, status, category_name, name } = req.body;
    const file = req.file;

    try {
        const author = await Author.findOne({ name });
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

const deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).send({ error: 'Book not found' });
        }

        await book.remove();
        res.status(200).send({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

const displayAllBook = async (req, res) => {
    try {
        const books = await Book.find()
        res.status(200).send(books);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

const editBook = async (req, res) => {
    const { id } = req.params;
    const { book_title, book_description, book_page, status, category_name, author_name } = req.body;
    const file = req.file;

    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).send({ error: 'Book not found' });
        }

        if (author_name) {
            const author = await Author.findOne({ author_name });
            if (!author) {
                return res.status(400).send({ error: 'Author not found' });
            }
            book.author_id = author._id;
        }

        if (category_name) {
            const category = await Category.findOne({ category_name });
            if (!category) {
                return res.status(400).send({ error: 'Category not found' });
            }
            book.category_id = category._id;
        }

        if (file) {
            book.book_cover_photo = file.filename;
        }

        if (book_title) {
            book.book_title = book_title;
        }
        if (book_description){
            book.book_description = book_description;
        } 
        if (book_page){
            book.book_page = book_page;
        } 
        if (status) {
            book.status = status;
        }

        await book.save();
        res.status(200).send(book);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

const bookDetail = async(req,res)=>{
    const {id} = req.params;
    try {
        const book = await Book.findById(id)
        if(!book)
        {
            res.status(400).send({message:"book is not present with this id"})
        }
        res.status(200).send(book);
    } catch (error) {
        res.status(400).send({error:error.message})
    }
}

const booksByAuthor = async (req, res) => {
    const { name } = req.params;

    try {
        const author = await Author.findOne({ name });
        if (!author) {
            return res.status(404).send({ error: 'Author not found' });
        }

        const books = await Book.aggregate([
            {
                $match: { author_id: author._id }
            },
            {
                $lookup: {
                    from: 'authors',
                    localField: 'author_id',
                    foreignField: '_id',
                    as: 'author'
                }
            },
            {
                $unwind: '$author'
            },
            {
                $project: {
                    book_title: 1,
                    book_description: 1,
                    book_cover_photo: 1,
                    book_page: 1,
                    status: 1,
                    author: '$author.author_name'
                }
            }
        ]);

        res.status(200).send(books);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

module.exports = {
    addBook,
    deleteBook,
    displayAllBook,
    editBook,
    bookDetail,
    booksByAuthor
}
