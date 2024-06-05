const Book = require("../model/book.model");
const Bookmark = require("../model/bookmark.model");
const User = require("../model/user.model");

const addBookMark = async (req, res) => {
    
    const {reg_id, book_title } = req.body;

    try {
        const user = await User.findOne({ reg_id});
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        const book = await Book.findOne({ book_title });
        if (!book) {
            return res.status(404).send({ error: 'Book not found' });
        }
        const bookmark = await Bookmark.create({
            user_id: user._id,
            book_id: book._id
        });
        return res.status(200).send(bookmark);
    } catch (error) {
        return res.status(400).send({ error:error.message });
    }
};

const removeBookmark = async (req, res) => {
    const {reg_id, book_title } = req.body;

    try {
        const user = await User.findOne({ reg_id});
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        const book = await Book.findOne({ book_title });
        if (!book) {
            return res.status(404).send({ error: 'Book not found' });
        }
        const bookmark = await Bookmark.findOneAndDelete({ user_id: user._id, book_id: book._id });
        if (!bookmark) {
            return res.status(404).send({ error: 'Bookmark not found' });
        }
        return res.status(200).send({ message: 'Bookmark removed successfully' });
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
};

module.exports={
    addBookMark,
    removeBookmark
}