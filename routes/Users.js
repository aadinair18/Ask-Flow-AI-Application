const express = require('express');
const router = express.Router();
const { signUpController, loginController } = require('../controllers/authController.js');
const { getUserProfile, updateUserProfile } = require('../controllers/userController.js');
const middlewareChecks = require('../middlewares/auth.middleware.js');

// Routes
router.post('/signup', signUpController);       // User registration
router.post('/login', loginController);         // User login
router.get('/getUserprofile', middlewareChecks, getUserProfile);  // Fetch user profile with middleware
router.put('/updateProfile', middlewareChecks, updateUserProfile);
module.exports = router;
