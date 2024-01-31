const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const activePlanMiddleware = require('../middlewares/activePlanMiddleware')
const { getTasks, claimRewardFromTasks } = require('../controllers/taksController')
const walletInfoMiddleware = require('../middlewares/walletMiddleware')

const tasksRouter = express.Router()

tasksRouter
.get('/', authMiddleware, activePlanMiddleware, getTasks)
.get('/claim', authMiddleware, activePlanMiddleware, walletInfoMiddleware, claimRewardFromTasks)

module.exports = tasksRouter