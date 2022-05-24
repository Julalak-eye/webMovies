const Movie = require( "../models/movie" ),
    Comment = require( "../models/comment" );

const middlewareObj = {};

middlewareObj.admin = function( req, res, next ){
    if ( req.isAuthenticated()){
        Movie.findById( req.params.id, function( err, foundMovie ){
            if( err ){
                res.redirect( "back" );
            }
            else{
                //check admin login
                if( foundMovie.author.id.equals( req.user.id )){
                    next();
                }
                else {
                    req.flash( "error", "You are not have permission to do this action!!!" );
                    res.redirect( "back" );
                }
            }
        });
    }
    else {
        req.flash( "error", "Please Login" );
        res.redirect( "/login" );
    }
}

middlewareObj.checkComment = function( req, res, next ){
    if ( req.isAuthenticated()){
        Comment.findById( req.params.comment_id, function( err, foundComment ){
            if( err ){
                res.redirect( "back" );
            }
            else{
                //check admin login
                if( foundComment.author.id.equals( req.user.id )){
                    next();
                }
                else {
                    req.flash( "error", "You are not have permission to do this action!!!" );
                    res.redirect( "back" );
                }
            }
        });
    }
    else {
        req.flash( "error", "Please Login" );
        res.redirect( "/login" );
    }
}


middlewareObj.isLoggedIn = function( req, res, next ){
    if ( req.isAuthenticated()){
        return next();
    }
    req.flash( "error", "You need to login first" );
    res.redirect( "/login" );
}

middlewareObj.isAdmin = function( req, res, next ){
    if ( req.isAuthenticated()){
        if( req.user.isAdmin){
            return next();
        }
        else {
            req.flash( "error", "You are not have permission to do this action!!!" );
            res.redirect( "back" ); 
        }
       
    }
    else{
        req.flash( "error", "You need to login first" );
        res.redirect( "/login" );
    }
    
}

module.exports = middlewareObj;