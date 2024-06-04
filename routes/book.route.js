const express = require('express');
const adminToken = require('../middleware/adminToken');
const {addBook} = require('../controller/book.controller.js');
const upload = require('../middleware/multerFile.js');

const router = express.Router();

router.post('/addBook',upload.single('file'),adminToken,addBook)

module.exports=router;