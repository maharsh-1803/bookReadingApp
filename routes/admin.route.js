const express = require('express');
const { login, signup, changePassword, changeStatus } = require('../controller/admin.controller.js'); 
const adminToken = require('../middleware/adminToken.js');

const router = express.Router();

router.post('/login', login);
router.post('/sign',signup);
router.patch('/changePassword',adminToken,changePassword)
router.post('/changeStatusBook/:id',adminToken,changeStatus);

module.exports = router;
