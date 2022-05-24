const   mongoose = require( "mongoose" ),
        passportLocalMongoose = require( 'passport-local-mongoose' );

const userSchema = new mongoose.Schema({
   username: String,
   email: String,
   password: String,
   isAdmin: { type: Boolean, default: false },
   like: [{
      type: mongoose.Schema.Types.ObjectId,
            ref: 'Movies'
   }]
});

userSchema.plugin( passportLocalMongoose );

module.exports = mongoose.model( 'User', userSchema );