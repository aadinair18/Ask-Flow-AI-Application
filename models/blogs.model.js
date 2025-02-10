const mongoose = require('mongoose');

const blogsSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    }
    ,
    body: {
        type: String,
        required: true
    }
    ,
    tags: {
        type: [String],
        required: true
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },

    votes: {
        type: Number,
        default: 0
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
    ,
    updatedAt: {
        type: Date
    }
}
);
module.exports = mongoose.model('Blogs', blogsSchema);