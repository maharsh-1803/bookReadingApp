const express = require('express');
const { loginUser, registerUser, allBook, bookDetail, allUser, userDetail } = require('../controller/user.controller');
const adminToken = require('../middleware/adminToken');

const router = express.Router();

router.post('/loginUser',loginUser);
router.post('/registerUser',registerUser)
router.get('/allBook',allBook)
router.get('/bookDetail/:id',bookDetail)
router.get('/allUser',adminToken,allUser);
router.get('/userDetail/:id',adminToken,userDetail);

module.exports = router;