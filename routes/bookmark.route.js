const express = require('express');
const { addBookMark, removeBookmark } = require('../controller/bookmark.controller');

const router = express.Router();

router.post('/addBookMark/:id',addBookMark);
router.delete('/removeBookMark/:id',removeBookmark)

module.exports=router;