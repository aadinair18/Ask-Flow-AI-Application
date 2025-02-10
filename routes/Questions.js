const express = require('express');
const router = express.Router();
const { askQuestion, getAllQuestion, deleteQuestion, getSpecificQuestion } = require('../controllers/questionController.js');
const middlewareChecks = require('../middlewares/auth.middleware.js');

router.post('/postQuestion', middlewareChecks, askQuestion);
router.get('/getAllQuestion', middlewareChecks, getAllQuestion);
// here we are going to add one more end point that is get a specific question.
router.get("/getspecificQuestion/:id", middlewareChecks, getSpecificQuestion)
router.delete("/deleteQuestion/:id", middlewareChecks, deleteQuestion);

module.exports = router;