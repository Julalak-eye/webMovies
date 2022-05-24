const   mongoose = require( "mongoose" ),
        passportLocalMongoose = require( 'passport-local-mongoose' );

const ticketSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
    },

    schedulingId: {
        type: mongoose.Schema.Types.ObjectId,
            ref: 'MovieScheduling'
    },
    
    mySeat: [{
        type: String 
    }]
});

module.exports = mongoose.model( 'Ticket', ticketSchema );