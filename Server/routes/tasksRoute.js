const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const activePlanMiddleware = require('../middlewares/activePlanMiddleware')
const { getTasks, claimRewardFromTasks, claimedRewards } = require('../controllers/taksController')
const walletInfoMiddleware = require('../middlewares/walletMiddleware')

const tasksRouter = express.Router()

tasksRouter
.get('/:planId', authMiddleware, activePlanMiddleware, getTasks)
.get('/claim/:planId/:taskId', authMiddleware, activePlanMiddleware, walletInfoMiddleware, claimRewardFromTasks)
.get('/claimed-rewards/:planId', authMiddleware, activePlanMiddleware, walletInfoMiddleware, claimedRewards)

module.exports = tasksRouter