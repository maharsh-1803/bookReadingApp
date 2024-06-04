const express = require('express');
const { registerAuthor, profileDisplay, loginAuthor, allAuthor, authorDetail, changeStatus } = require('../controller/author.controller');
const upload= require('../middleware/multerFile.js');
const adminToken = require('../middleware/adminToken.js');

const router = express.Router();

router.post('/registerAuthor',upload.single('file'),registerAuthor);
router.get('/profileDisplay/:id',profileDisplay)
router.post('/loginAuthor',loginAuthor)
router.get('/allAuthor',adminToken,allAuthor)
router.get('/authorDetail/:id',adminToken,authorDetail)
router.patch('/changeStatus/:id',adminToken,changeStatus)


module.exports=router
