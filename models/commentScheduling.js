const mongoose = require("mongoose");

const commentSchedulingSchema = new mongoose.Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
    },
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
    }
});

module.exports = mongoose.model( 'CommentScheduling', commentSchedulingSchema );