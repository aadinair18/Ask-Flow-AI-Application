const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            index: true,
            match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 128,
        },
        about: {
            type: String,
            default: "I am about to be written..."
        },
        bio: {
            type: String,
            default: "Hello! I'm new here.",
        },
        avatar: {
            type: String,
            default: "default-avatar.png",
            validate: {
                validator: function (v) {
                    return /\.(jpg|jpeg|png|gif)$/.test(v);
                },
                message: "Please use a valid image file format (jpg, jpeg, png, gif)",
            },
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

module.exports = mongoose.model("Users", userSchema);
