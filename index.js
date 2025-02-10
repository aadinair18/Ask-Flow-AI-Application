const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDb = require('./config/dbConnect');
const authRoutes = require('./routes/Users.js');
const questionRouter = require('./routes/Questions.js');
const blogsRouter = require('./routes/blogs.js');
const answerRouter = require('./routes/Answers.js');
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
connectDb();

// Mount the routes
app.use('/api/auth', authRoutes);
app.use('/api/login', authRoutes);
app.use('/api/profile', authRoutes);
app.use('/api/updateProfile', authRoutes);
app.use('/api/askquestion', questionRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/answer', answerRouter);

// Test route
app.get("/", (req, res) => {
    res.send("Hello world, the server is running.");
});



// Start the server
app.listen(5000, () => {
    console.log("Server started on port 5000");
});