const express = require('express')
const { addPlan, terminatePlan, myActivePlans, getMe, getOrders, myWallet, myTransactions, mySubordinates, getTodaysCommissionData, getTotalCommissionEarned, totalSpentInLifeTime, withDrawBalance, lifeTimeComissionEarned, lifeTimeWalletCredited, logout } = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')
const walletInfoMiddleware = require('../middlewares/walletMiddleware')
const activePlanMiddleware = require('../middlewares/activePlanMiddleware')

const userRouter = express.Router()

userRouter
.get('/me', authMiddleware, getMe)
.get('/plans', authMiddleware, myActivePlans)
.post('/plans', authMiddleware, activePlanMiddleware, walletInfoMiddleware, addPlan)
.delete('/plans/:plan', authMiddleware, terminatePlan)
.get('/orders', authMiddleware, getOrders)
.get('/wallet', authMiddleware, myWallet)
.get('/transactions', authMiddleware, myTransactions)
.get('/subordinates', authMiddleware, mySubordinates)
.get('/todays-commission', authMiddleware, getTodaysCommissionData)
.get('/total-commission', authMiddleware, getTotalCommissionEarned)
.get('/total-spent', authMiddleware, totalSpentInLifeTime)
.post('/withdraw', authMiddleware, withDrawBalance)
.get('/life-time-commission', authMiddleware, lifeTimeComissionEarned)
.get('/life-time-wallet-credited', authMiddleware, lifeTimeWalletCredited)


module.exports = userRouter