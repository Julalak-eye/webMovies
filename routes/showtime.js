const express = require( "express" ),
    router = express.Router({ mergeParams: true }),
    Movie = require( "../models/movie" ),
    Cinema = require( "../models/cinema" );

    router.get( "/", function( req, res ){
        Movie.findById(req.params.id, function(err, foundMovies) {
            if (err) {
                console.log(err);
            } else {
               Cinema.find().where("movieId").equals(foundMovies._id).exec(function( err, foundTheater ){
                    if ( err ){
                        console.log( err );
                    } 
                    else {
                        res.render( "theater/showtime.ejs", { theater: foundTheater, movie: foundMovies });
                    }
                });
            }
        }); 
    });

module.exports = router;