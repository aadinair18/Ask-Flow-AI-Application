// config/dbConnect.js
const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");
    } 
    catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit process if database connection fails
    }
};

// Exporting connectDb function
module.exports = connectDb;
