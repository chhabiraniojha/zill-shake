const express = require('express')
const { registerUser, loginUser, resetPassword } = require('../controllers/authController')
const { logout } = require('../controllers/userController')

const authRouter = express.Router()

authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
authRouter.get('/logout', logout)
authRouter.post('/reset-password', resetPassword)

module.exports =  authRouter