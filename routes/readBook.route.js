const express = require('express');
const { addReadBook, removeReadBook } = require('../controller/readBook.controller');

const router = express.Router();

router.post('/addReadBook/:reg_id',addReadBook);
router.delete('/removeReadBook/:reg_id',removeReadBook)

module.exports = router;