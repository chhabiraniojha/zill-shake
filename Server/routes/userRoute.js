const express = require('express')
const { addPlan, terminatePlan, myActivePlans, getMe, getOrders, myWallet, myTransactions, mySubordinates } = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')
const walletInfoMiddleware = require('../middlewares/walletMiddleware')
const activePlanMiddleware = require('../middlewares/activePlanMiddleware')

const userRouter = express.Router()

userRouter
.get('/me', authMiddleware, getMe)
.get('/plans', authMiddleware, myActivePlans)
.post('/plans', authMiddleware, activePlanMiddleware, walletInfoMiddleware, addPlan)
.delete('/plans', authMiddleware, terminatePlan)
.get('/orders', authMiddleware, getOrders)
.get('/wallet', authMiddleware, myWallet)
.get('/transactions', authMiddleware, myTransactions)
.get('/subordinates', authMiddleware, mySubordinates)

module.exports = userRouter