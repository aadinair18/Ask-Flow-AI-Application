const mongoose = require('mongoose');

const blogsModel = require('../models/blogs.model');
const postBlogs = async (req, res) => {

    const { title, body, tags } = req.body;
    try {
        if (!title || !body || !tags) {
            return res.status(400).send({ message: "Title body and tags are required.." });
        }
        const blogs = await blogsModel.create({
            title,
            body,
            tags,
            author: req.user.id
        })
        res.status(201).send({
            message: "Blogs posted successfully",
            blogs,
        });

    }
    catch (error) {
        console.error("Error posting question:", error.message);
        res.status(500).send({ message: "Failed to post question", error: error.message });
    }
};
const getAllBlogs = async (req, res) => {
    try {

        const blogs = await blogsModel.find().populate('author', 'name email');
        res.status(200).send({
            message: "Questions Fetched Successfully...",
            blogs
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
module.exports = { postBlogs, getAllBlogs };