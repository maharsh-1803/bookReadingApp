const express = require('express');
const { login, signup, changePassword } = require('../controller/admin.controller.js'); 
const adminToken = require('../middleware/adminToken.js');

const router = express.Router();

router.post('/login', login);
router.post('/sign',signup);
router.patch('/changePassword',adminToken,changePassword)

module.exports = router;
