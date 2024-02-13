const express = require('express')

const supportRouter = express.Router()

// controllers
const authMiddleware = require('../middlewares/authMiddleware')
const { getIssueList, addSupportIssue, getAllSupportTickets } = require('../controllers/supportController')

supportRouter
.post('/', authMiddleware, addSupportIssue)
.get('/issues', getIssueList)
.get('/prev-tickets', authMiddleware, getAllSupportTickets)

module.exports = supportRouter