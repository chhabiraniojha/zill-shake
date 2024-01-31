const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')

const promotionsRouter = express.Router()

// controllers
const { mySubOrdinates } = require('../controllers/promotionsController')

promotionsRouter
.get('/suboridnates', authMiddleware, mySubOrdinates)


module.exports =  promotionsRouter