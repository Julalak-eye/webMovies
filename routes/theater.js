const { render } = require("express/lib/response");

const express = require( "express" ),
    router = express.Router({ mergeParams: true }),
    Movie = require( "../models/movie");
    Cinema = require( "../models/cinema" );

    router.get("/", function( req, res){
        Cinema.find({}, function(err, foundCinema){
            if(err){
                console.log(err);
            } else {
                Movie.find({}, function( err, foundMovie){
                if(err){
                    console.log(err)
                }
                else{
                    res.render("theater/theater.ejs", { cinema: foundCinema, movie: foundMovie})
                }
                });
            }
        });
    });
module.exports = router;