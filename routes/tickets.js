const express = require( "express" ),
    router = express.Router({ mergeParams: true }),
    middlewareObj = require( "../middleware" ),
    Movie = require( "../models/movie" ),
    Cinema = require( "../models/cinema" ),
    Scheduling = require( "../models/movieScheduling" ),
    Ticket = require( "../models/ticket" );

    router.put( "/", middlewareObj.isLoggedIn, function( req, res ){
        Movie.findById(req.params.movie_id, function(err, foundMovies){
            if ( err ){
                console.log( err );
            }
            else {
                Cinema.findById(req.params.theater_id, function( err, foundCinema){
                    if ( err ){
                        console.log( err );
                    }
                    else { 
                        Scheduling.findById( req.body.scheduleId, function( err, foundSchedule){
                            if( err ){
                                console.log( err );
                            }
                            else{
                                res.render("theater/confirmTicket.ejs", {movie: foundMovies, theater: foundCinema, showtime: req.body.showtime, scheduleId: foundSchedule, seat: req.body.seat})
                            }
                        });
                    }
                });
               
            }
        });
    });

    router.post("/", function( req, res ){
        Scheduling.findById( req.body.scheduleId, function( err, foundScheduling){
            if( err ){
                 console.log(err);
            }
            else{
                let seats = req.body.seat.split(',');
                Ticket.create({
                    userId: req.user, schedulingId: foundScheduling
                },async function( err, newTicket){
                    newTicket.mySeat = req.body.seat;
                    newTicket.save();
                    await (seats).forEach( seat => {
                        foundScheduling.seat.forEach( scheduleSeat => {
                            if( scheduleSeat.name === seat){
                                scheduleSeat.available = false;
                            }
                        });
                    });
                    foundScheduling.save();
                    res.redirect( "/profile" );
                });
            }
        });
    });

module.exports = router;