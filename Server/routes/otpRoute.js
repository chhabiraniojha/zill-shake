const express = require('express')
const otpRouter = express.Router()

const { sendOTP, verifyOTP, resendOTP } = require('../controllers/otp')

otpRouter.post('/send', sendOTP)
otpRouter.post('/resend', resendOTP)

module.exports = otpRouter