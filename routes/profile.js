const express = require( "express" ),
    router = express.Router({mergeParams: true}),
    middlewareObj = require( "../middleware" ),
    Movie = require( "../models/movie" ),
    User = require( "../models/user"),
    Scheduling = require( "../models/commentScheduling"),
    Ticket = require( "../models/ticket");

    router.get("/", middlewareObj.isLoggedIn, function( req, res){
        User.findById( req.user._id, function( err, foundUser){
            if( err ){
                console.log( err );
            }
            else{
                Ticket.find().where('userId').equals(foundUser._id).populate('schedulingId').exec( function( err, foundTicket){
                    if( err ){
                        console.log( err );
                    }
                    else{
                        let a = [];
                        foundTicket.forEach( function(b){
                            a.push(b.schedulingId.movieId);
                        })
                        Movie.find({_id: {$in:a}} ,function(err, found){
                            if(err){
                                console.log(err)
                            }
                            else{
                                Scheduling.find().where('userId').equals(foundUser._id).populate('commentId').exec( function( err, foundScheduling){
                                    if( err ){
                                        console.log( err );
                                    }
                                    else{
                                        let b = [];
                                        let d = [];
                                        foundScheduling.forEach( function(c){
                                            d.push(c.commentId.text);
                                        })
                                        foundScheduling.forEach( function(c){
                                            b.push(c.movieId);
                                        })
                                        Movie.find().where('_id').equals(foundUser.like).exec( function( err, foundMovie){
                                            if( err ){
                                                console.log( err );
                                            }
                                            else{
                                                Movie.find({_id: {$in:b}}).populate('comments').exec(function(err, foundComment){
                                                    if( err ){
                                                        console.log(err);
                                                    }
                                                    else{
                                                        res.render("profile/profile.ejs", { movie: foundMovie, user: foundUser, ticket: foundTicket, seat: foundTicket, movieTicket: found, comment: foundComment, commentText: d});
                                                    }
                                                })
                                            }
                                        })
                                    }
                                });  
                            }
                        })   
                    }
                });  
            }
        });
    }); 

    router.post("/:id", middlewareObj.isLoggedIn, function(req, res){
        Movie.findById( req.params.id, function( err, foundMovie){
            if( err ){
                console.log( err );
            }
            else {
                User.findById( req.user._id, function( err, foundUser){
                    if( err ){
                        console.log( err );
                    }
                    else{
                        foundUser.like.push(foundMovie);
                        foundUser.save();
                        res.redirect( 'back' );
                    }
                });
            }
        });
    });

    router.delete("/:id", middlewareObj.isLoggedIn, function(req, res){
        Movie.findById( req.params.id, function( err, foundMovie){
            if( err ){
                console.log( err );
            }
            else {
                User.findById( req.user._id, function( err, foundUser){
                    if( err ){
                        console.log( err );
                    }
                    else{
                        foundUser.like.pull(foundMovie);
                        foundUser.save();
                        res.redirect( 'back' );
                    }
                });
            }
        });
    });

module.exports = router;