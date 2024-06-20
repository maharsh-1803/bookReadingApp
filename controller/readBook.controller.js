const Book = require("../model/book.model.js");
const ReadBook = require("../model/readbook.model");
const User = require("../model/user.model.js");

const addReadBook = async(req,res)=>{
        const {reg_id} = req.params;
        const { book_title } = req.body;
    
        try {
            const user = await User.findOne({ reg_id});
            if (!user) {
                return res.status(404).send({ error: 'User not found' });
            }
            const book = await Book.findOne({ book_title });
            if (!book) {
                return res.status(404).send({ error: 'Book not found' });
            }
            const readBook = await ReadBook.create({
                user_id: user._id,
                book_id: book._id
            });
            return res.status(200).send(readBook);

        } catch (error) {
            return res.status(400).send({error:error.message});
        }
}

const removeReadBook = async (req, res) => {
    const { reg_id } = req.params;
    const { book_title } = req.body;

    try {
        const user = await User.findOne({reg_id});
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const book = await Book.findOne({book_title });
        if (!book) {
            return res.status(404).send({ error: 'Book not found' });
        }
        const readBook = await ReadBook.findOneAndDelete({ user_id: user._id, book_id: book._id });
        if (!readBook) {
            return res.status(404).send({ error: 'Book not found in the user\'s reading list' });
        }
        return res.status(200).send({ message: 'Book removed from user\'s reading list' });
    } catch (error) {
        console.error('Error removing book:', error);
        return res.status(500).send({ error: 'Internal server error' });
    }
};



module.exports = {
    addReadBook,
    removeReadBook
}