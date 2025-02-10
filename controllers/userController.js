const userModel = require('../models/user.model.js');

// Fetch User Profile
const getUserProfile = async (req, res) => {

    // get user id first
    // search based on the user id 
    // if user not found.
    // if user found send it to the response.
    try {
        const userId = req.user.id; // yeh middleware seh set ho kr aah rahi hogi.
        const user = await userModel.findById(userId);


        if (!user) {
            return res.status(404).send({ message: "user not found" });
        }

        return res.status(200).send({ message: "Profile fetched Successfully...", user });
    }
    catch (error) {
        console.log("Error fetching the profile : ", error);
        res.status(500).send({ message: "Error fetching profile..." });
    }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
    const userId = req.user.id; // Assuming middleware sets `req.user.id`
    const { name, about, bio, avatar } = req.body;

    try {

        const userId = req.user.id;
        const { name, about, bio, avatar } = req.body;
        if (!name && !about && !bio && !avatar) {
            return res.status(400).send({ message: "Atleast once feild is required to be updated..." });
        }

        const feildToBeUpdated = {};
        if (name) feildToBeUpdated.name = name;
        if (bio) feildToBeUpdated.bio = bio;
        if (about) feildToBeUpdated.about = about;
        if (avatar) feildToBeUpdated.avatar = avatar;

        const updatedProfile = await userModel.findByIdAndUpdate(
            userId,
            { $set: feildToBeUpdated },
            { new: true, runValidators: true }
        );
        if (!updatedProfile) {
            return res.status(404).send({ message: "User not found..." });
        }

        return res.status(200).send({
            message: "Profile Update Sucessfully...",
            profile: updatedProfile
        });




    } catch (error) {
        console.error("Error updating profile:", error.message);
        res.status(500).send({ message: "Something went wrong. Please try again." });
    }
};

module.exports = { getUserProfile, updateUserProfile };
