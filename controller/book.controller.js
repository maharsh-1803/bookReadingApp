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
        const books = await Book.aggregate([
            {
                $lookup: {
                    from: 'authors', // Collection name in MongoDB
                    localField: 'author_id', // Field in the Book collection
                    foreignField: '_id', // Field in the Author collection
                    as: 'authorDetails' // Name of the field to add the author details
                }
            },
            {
                $unwind: '$authorDetails' // Unwind the array to get author details as an object
            },
            {
                $project: {
                    _id: 1,
                    book_title: 1,
                    book_description: 1,
                    status: 1,
                    book_cover_photo: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    'authorDetails.name': 1, 
                    'authorDetails.dob': 1,  
                    'authorDetails.city': 1, 
                    'authorDetails.state': 1, 
                    'authorDetails.country': 1, 
                    'authorDetails.gender': 1, 
                    'authorDetails.photo': 1, 
                    'authorDetails.email': 1, 
                    'authorDetails.mobile': 1 
                }
            }
        ]);

        return res.status(200).send(books);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
};


const editBook = async (req, res) => {
    const { id } = req.params;
    const { book_title, book_description, book_page, status, category_name, name } = req.body;
    const file = req.file;

    try {
        const updateFields = {
            book_title,
            book_description,
            book_page,
            status,
            category_name,
            name
        };
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
    const baseURL = "https://bookingreadingapp.onrender.com/uploads";
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(400).send({ message: "Book is not present with this ID" });
        }

        const bookWithFullURL = {
            ...book.toObject(), 
            book_cover_photo: baseURL + "/" + book.book_cover_photo
        };

        return res.status(200).send(bookWithFullURL);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
};

module.exports = bookDetail;


const booksByAuthor = async (req, res) => {
    const { id } = req.params;
    const baseURL = "https://bookingreadingapp.onrender.com/uploads";
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
        const booksWithFullURL = books.map(book => ({
            ...book,
            book_cover_photo: `${baseURL}/${book.book_cover_photo}`
        }));

        return res.status(200).json({
            message: "Book got successfully",
            books: booksWithFullURL
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
