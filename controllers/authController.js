const bcrypt = require('bcrypt'); // Using require for bcryptjs
const jwt = require('jsonwebtoken');
const usermodel = require('../models/user.model.js'); // Import your user model using require
const dotenv = require('dotenv');

dotenv.config();  // Load environment variables from .env file

const signUpController = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).send({ message: "All fields are mandatory to pass" });
        }

        // Check if the user already exists
        const exist = await usermodel.findOne({ email });
        if (exist) {
            return res.status(400).send({ message: "User Already exists" });
        }

        // Generate salt and hash the password
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                return res.status(500).json({ message: "Error generating salt" });
            }

            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) {
                    return res.status(500).json({ message: "Error hashing password" });
                }

                // Create the new user
                const newUser = await usermodel.create({
                    name,
                    email,
                    password: hash
                });

                // Send success response
                res.status(200).send({
                    message: "Successfully Registered...",
                    newUser
                });
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong..." });
    }
};


const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are mandatory to be filled." });
        }

        // Check if user exists
        const user = await usermodel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                message: "User not found. Kindly register."
            });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // Create JWT token
        const token = jwt.sign(
            {
                email: user.email,
                id: user._id
            },
            "shhh",  // Corrected typo in environment variable
            { expiresIn: '2d' }
        );

        // Respond with token and user details
        res.status(200).send({
            message: "User logged in successfully.",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Something went wrong." });
    }
};


module.exports = { signUpController, loginController }; // Exporting the controller using module.exports
