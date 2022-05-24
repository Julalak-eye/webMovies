const mongoose = require("mongoose");

const movieSchedulingSchema = new mongoose.Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie'
    },
    cinema: String,
    selectShowtime: String,
    date: String,
    seat: [{
        name: String,
        available: {type: Boolean, default: true}
    }, 
    ]
});

module.exports = mongoose.model( 'MovieScheduling', movieSchedulingSchema );