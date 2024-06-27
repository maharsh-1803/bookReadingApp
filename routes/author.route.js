const express = require('express');
const { registerAuthor, profileDisplay, loginAuthor, allAuthor, editAuthor, deleteAuthor } = require('../controller/author.controller');
const upload= require('../middleware/multerFile.js');
const adminToken = require('../middleware/adminToken.js');

const router = express.Router();

router.post('/registerAuthor',upload.single('file'),adminToken,registerAuthor);
router.get('/profileDisplay/:id',profileDisplay)
router.post('/loginAuthor',loginAuthor)
router.get('/allAuthor',adminToken,allAuthor)
router.patch('/editAuthor/:id',adminToken,upload.single('file'),editAuthor);
router.delete('/deleteAuthor/:id',adminToken,deleteAuthor);


module.exports=router
