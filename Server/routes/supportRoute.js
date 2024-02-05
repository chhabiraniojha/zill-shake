const express = require('express')

const supportRouter = express.Router()

// controllers
const authMiddleware = require('../middlewares/authMiddleware')
const { getIssueList, addSupportIssue } = require('../controllers/supportController')

supportRouter
.post('/', authMiddleware, addSupportIssue)
.get('/issues', getIssueList)

module.exports = supportRouter