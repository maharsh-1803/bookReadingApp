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
        return res.status(200).send(newBook);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
}

const deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findByIdAndDelete(id);
        if (!book) {
            return res.status(404).send({ error: 'Book not found' });
        }
        return res.status(200).send({ message: 'Book deleted successfully' });
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
}

const displayAllBook = async (req, res) => {
    try {
        const books = await Book.find()
        return res.status(200).send(books);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
}

const editBook = async (req, res) => {
    const { id } = req.params;
    const { book_title, book_description, book_page, status, category_name, name } = req.body;
    const file = req.file;

    try {
        let book = await Book.findById(id);
        if (!book) {
            return res.status(404).send({ error: 'Book not found' });
        }


        if (name) {
            const author = await Author.findOne({ name });
            if (!author) {
                return res.status(400).send({ error: 'Author not found' });
            }
            updateFields.author_id = author._id;
        }

        if (category_name) {
            const category = await Category.findOne({ category_name });
            if (!category) {
                return res.status(400).send({ error: 'Category not found' });
            }
            updateFields.category_id = category._id;
        }
        const updateFields = {
            book_title,
            book_description,
            book_page,
            status,
            category_name,
            name
        };
        if (file) {
            updateFields.book_cover_photo = req.file.filename
        }

        let updatedBook = await Book.findByIdAndUpdate(id, updateFields, { new: true });

        return res.status(200).send(updatedBook);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
}



const bookDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id)
        if (!book) {
            return res.status(400).send({ message: "book is not present with this id" })
        }
        return res.status(200).send(book);
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}

const booksByAuthor = async (req, res) => {
    const { id } = req.params;

    try {
        const author = await Author.findById(id);
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

        return res.status(200).json({
            message: "Book got successfully",
            books: books
        });
    } catch (error) {
        return res.status(400).send({ error: error.message });
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
