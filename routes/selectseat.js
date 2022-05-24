const express = require( "express" ),
    router = express.Router({ mergeParams: true }),
    Movie = require( "../models/movie" ),
    Cinema = require( "../models/cinema" ),
    Scheduling = require( "../models/movieScheduling" );

    router.post( "/:theater_id/:movie_id", function( req, res ){ 
        Movie.findById(req.params.movie_id, function(err, foundMovies){
            if ( err ){
                console.log( err );
            }
            else {
                Cinema.findById(req.params.theater_id, function(err, foundCinema) {
                    if ( err ){
                        console.log( err );
                    } else {
                        Scheduling.findOne({
                            movieId: foundMovies, cinema: foundCinema.cinema, selectShowtime: req.body.showtime, date: req.body.date
                        }, function(err, foundScheduling){
                            if(err){
                                console.log(err);
                            }
                            else{
                                res.render( "theater/selectseat.ejs", { theater: foundCinema, movie: foundMovies, showtime: req.body.showtime, seat: foundScheduling.seat, scheduleId: foundScheduling._id, Schedule: foundScheduling});
                            }
                        })
                    }
                }); 
            }
        });
    });

module.exports = router;