const express = require('express');
const { login, signup } = require('../controller/admin.controller.js'); // Adjust the path accordingly

const router = express.Router();

router.post('/login', login);
router.post('/sign',signup);

module.exports = router;
