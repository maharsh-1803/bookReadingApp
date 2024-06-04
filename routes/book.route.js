const express = require('express');
const adminToken = require('../middleware/adminToken');
const { addBook, deleteBook, displayAllBook, editBook, bookDetail, booksByAuthor } = require('../controller/book.controller.js');
const upload = require('../middleware/multerFile.js');

const router = express.Router();

router.post('/addBook', upload.single('file'), adminToken, addBook); //authenticate by author
router.delete('/deleteBook/:id', adminToken, deleteBook); // authenticate by author
router.get('/displayAllBook',adminToken,displayAllBook)
router.patch('/editBook',adminToken,editBook); //authenticate by author
router.patch('/bookDetail',adminToken,bookDetail);
router.get('/getBooksByAuthor',adminToken,booksByAuthor)

module.exports = router;
