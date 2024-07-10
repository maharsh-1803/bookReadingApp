const express = require('express');
const { sendOtp, verifyOtp, resendOtp } = require('../controller/otp.controller');
const router = express.Router();

router.post('/sendOtp',sendOtp);
router.post('/verifyOtp',verifyOtp);
router.post('/resendOtp',resendOtp)

module.exports=router;