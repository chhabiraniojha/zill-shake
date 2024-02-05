const express = require('express');
const { getPlan } = require('../controllers/planController');
const authMiddleware = require('../middlewares/authMiddleware');
const planRouter = express.Router();

planRouter.get('/:planId', authMiddleware, getPlan);

module.exports = planRouter;
