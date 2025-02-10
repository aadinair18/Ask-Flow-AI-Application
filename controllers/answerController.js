
const answerModel = require('../models/answer.model.js');
const answermodel = require('../models/answer.model.js');
const questionsModel = require('../models/questions.model.js');


const addAnswer = async (req, res) => {
    console.log('Request received:', req.body);
    console.log('Value of question ID:', req.params.id);

    const userId = req.user.id; // Assuming middleware sets `req.user`
    const { answerTitle, answerBody } = req.body; // Extract values from req.body

    try {
        console.log('Checking if question exists...');
        // Check if the question exists
        const question = await questionsModel.findById(req.params.id);
        if (!question) {
            console.error('Question not found for ID:', req.params.id);
            return res.status(404).send({ message: "Question not found..." });
        }

        console.log('Question exists. Creating the answer...');
        // Create the new answer with mapped fields
        const newAnswer = await answermodel.create({
            questionId: req.params.id,
            author: userId,
            title: answerTitle, // Map to the expected field
            body: answerBody,   // Map to the expected field
        });

        console.log('New answer created:', newAnswer);
        res.status(201).send({
            message: "Answer added Successfully",
            ansBody: newAnswer,
        });
    } catch (error) {
        console.error("Error adding answer:", error.message, error.stack);
        res.status(500).send({ message: "Something went wrong. Please try again later." });
    }
};
const getAnswers = async (req, res) => {
    const { questionId } = req.params;
    try {
        console.log(questionId);
        const answer = await answermodel.find({ questionId: req.params.id }).populate('author');
        if (answer.length === 0) {
            return res.status(404).send({ message: "No answer  found for this question..." });
        }

        res.status(200).send({ message: "Answer fetched Successfully...", answer });

    }
    catch (err) {
        console.log(err);

        res.status(500).send({ message: "Something went wrong. Please try again later." });
    }
}
// const getSingleAnswer = async (req, res) => {
//     console.log("our ans id that we are parsing --> " + req.params.id);
//     const { questionId } = req.params; // Ensure `questionId` is passed in the request params
//     try {
//         const singleAnswer = await answerModel
//             .findOne({ questionId }) // Query using `findOne` with `questionId`
//         // Populate the `author` field

//         if (!singleAnswer) {
//             return res.status(404).send({ message: "No Answer found for this particular question." });
//         }

//         return res.status(200).send({ message: "Answer fetched successfully.", singleAnswer });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).send({ message: "Something went wrong, please try again later." });
//     }
// };

const getSingleAnswer = async (req, res) => {
    const { questionId } = req.params; // Extract questionId from request params

    try {
        // Find answers where questionId matches
        const answers = await answerModel
            .find({ questionId }) // Query to match questionId
            .populate('author'); // Optional: Populate author details

        if (!answers || answers.length === 0) {
            return res.status(404).send({ message: "No answers found for this question." });
        }

        return res.status(200).send({
            message: "Answers fetched successfully.",
            answers
        });
    } catch (err) {
        console.error("Error fetching answers: ", err);
        return res.status(500).send({ message: "Something went wrong, please try again later." });
    }
};



module.exports = { addAnswer, getAnswers, getSingleAnswer };