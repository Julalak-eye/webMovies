const mongoose = require( "mongoose" );

const promotionSchema = new mongoose.Schema({
    
    productPoster: String,
    productName: String,
    detail: String,
    sold: String
    
});

module.exports = mongoose.model( 'Promotions', promotionSchema ); 