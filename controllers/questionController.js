const mongoose = require('mongoose');
const questionModels = require('../models/questions.model.js');
const questionsModel = require('../models/questions.model.js');


const askQuestion = async (req, res) => {

    const { title, body, tags } = req.body;
    try {
        if (!title || !body || !tags) {
            return res.status(400).send({ message: "Title body and tags are required.." });
        }
        const question = await questionModels.create({
            title,
            body,
            tags,
            author: req.user.id
        })
        res.status(201).send({
            message: "Question posted successfully",
            question,
        });

    }
    catch (error) {
        console.error("Error posting question:", error.message);
        res.status(500).send({ message: "Failed to post question", error: error.message });
    }
};
const getSpecificQuestion = async (req, res) => {
    try {
        // Fetch the question by ID
        const findQuestion = await questionModels.findById(req.params.id);

        // If the question is not found
        if (!findQuestion) {
            return res.status(404).send({
                message: "Question not found."
            });
        }

        // Successfully fetched the question
        return res.status(200).send({
            message: "Question fetched successfully.",
            data: findQuestion,
        });
    } catch (err) {
        console.error("Error fetching question:", err);
        return res.status(500).send({
            message: "An error occurred while fetching the question."
        });
    }
};

const getAllQuestion = async (req, res) => {
    try {

        const question = await questionsModel.find().populate('author', 'name email');
        res.status(200).send({
            message: "Questions Fetched Successfully...",
            question
        });
    }
    catch (error) {
        console.error("Error fetching questions:", error.message);
        res.status(500).send({
            message: "Failed to fetch questions",
            error: error.message
        });
    }
}
const deleteQuestion = async (req, res) => {
    const questionId = req.params.id;
    const userId = req.user.id;
    try {
        const question = await questionModels.findById(questionId);
        if (!question) {
            return res.status(404).send({ message: "Question not found..." });
        }
        if (question.author.toString() !== userId) {
            return res.status(403).send({ message: "You are not authorized to delete this question..." });
        }

        await question.deleteOne();
        return res.status(200).send({ message: "Question Deleted Successfully..." });
    }
    catch (error) {
        console.error("Error deleting question:", error);
        res.status(500).send({ message: "Something went wrong. Please try again later." });
    }
}
module.exports = { askQuestion, getAllQuestion, deleteQuestion, getSpecificQuestion };