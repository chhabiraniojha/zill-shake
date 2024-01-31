const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { getWalletInfo, addAmount } = require('../controllers/walletController')

const walletRouter = express.Router()

walletRouter
.get('/', authMiddleware, getWalletInfo)
.post('/add', authMiddleware, addAmount)

module.exports =  walletRouter