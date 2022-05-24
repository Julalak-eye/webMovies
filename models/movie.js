const mongoose = require( "mongoose" );

const movieSchema = new mongoose.Schema({
    
    poster: String,
    trailer: String,
    name: String,
    date: String,
    genre: String,
    rate: String,
    time: String,
    synopsis: String,
    boxOffice: Boolean,
    // String
    category:Boolean,
    // เลือกว่าหนังอันไหน
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String

    },
    
    comments: [{
        //connect 2 data base
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

module.exports = mongoose.model( 'Movies', movieSchema );