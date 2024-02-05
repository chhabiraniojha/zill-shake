const express = require('express')
const { registerUser, loginUser } = require('../controllers/authController')
const { logout } = require('../controllers/userController')

const authRouter = express.Router()

authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
authRouter.get('/logout', logout)

module.exports =  authRouter