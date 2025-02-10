const express = require('express');
const router = express.Router();
const { addAnswer, getAnswers, getSingleAnswer } = require('../controllers/answerController.js');
const middlewareChecks = require('../middlewares/auth.middleware.js'); // Authentication middleware

// POST an answer for a specific question (e.g., /api/answer/:id)
router.post('/:id', middlewareChecks, addAnswer);

// GET answers for a specific question (e.g., /api/answer/:id/getanswer)
router.get('/:id/getanswer', middlewareChecks, getAnswers);
router.get('/:id', middlewareChecks, getSingleAnswer);

module.exports = router;
