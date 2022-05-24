const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
            ref: 'Movies'
    },
    cinema: String,
    allShowtime: [{
        type: String
    }],
    startDate: String,
    endDate: String 

});

module.exports = mongoose.model( 'Cinema', commentSchema );