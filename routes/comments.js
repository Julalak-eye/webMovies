const express = require("express"),
    router = express.Router({mergeParams: true}),
    Movie = require( "../models/movie"),
    Comment = require( "../models/comment"),
    middlewareObj = require( "../middleware"),
    Scheduling = require( "../models/commentScheduling");

    //go to add comment page
    router.get("/new", middlewareObj.isLoggedIn, function(req, res) {
        Movie.findById(req.params.id, function(err, foundMovies) {
            if (err) {
                console.log(err);
            } else {
                res.render('comment/create.ejs', { movie: foundMovies })
            }
        });
    });

    // add new comment to data base
    router.post("/", middlewareObj.isLoggedIn, function(req, res) {
        Movie.findById(req.params.id, function(err, foundMovies) {
            if (err) {
                console.log(err);
            } else {
                Comment.create(req.body.comment, function(err, comment) {
                    if (err) {
                        console.log(err);
                    } else {
                        // รับข้อมูล
                        comment.author.id = req.user._id;
                        comment.author.username = req.user.username;
                        comment.save();
                        foundMovies.comments.push(comment);
                        foundMovies.save();
                        let ID = {
                            userId: req.user._id,
                            movieId: foundMovies._id,
                            commentId: comment._id
                        }
                        Scheduling.create(ID, function( err){
                            if( err ){
                                console.log(err);
                            }
                            else{
                                res.redirect('/movies/' + foundMovies._id);
                            }
                        })
                    }
                });
            }
        });
    });


    router.get( "/:comment_id/edit", middlewareObj.checkComment, function( req, res ){
        Comment.findById( req.params.comment_id, function( err, foundComment ){
            if( err ){
                console.log( err );
                res.redirect( "back" );
            }
            else {
                res.render( "comment/edit.ejs", { movie_id: req.params.id, comment: foundComment })
            }
        });
    });

    router.put( "/:comment_id", middlewareObj.checkComment, function( req, res ){
        Comment.findByIdAndUpdate( req.params.comment_id, req.body.comment, function( err, updatedComments){
            if ( err ){
                res.redirect( "back" );
            }
            else {
                res.redirect( "/movies/" + req.params.id );
            }
        });
    });

    router.delete( "/:comment_id", middlewareObj.checkComment, function( req, res ){
        Comment.findByIdAndRemove( req.params.comment_id, function( err ){
            if( err ){
                req.flash( "error", "There are something wrong!!!" );
                res.redirect( "/movies/" + req.params.id );
            }
            else {
                req.flash( "success", "Your comment was deleted." );
                res.redirect( "/movies/" + req.params.id );
            }
        });
    });

module.exports = router;