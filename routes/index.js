const express = require( "express" ),
    router = express.Router(),
    User = require( "../models/user" ),
    passport = require( "passport" ),
    Movie = require( "../models/movie" ),
    Promotion = require( "../models/promotion" );

    router.get("/", function( req, res ){
        Movie.find({}, function( err, allMovies ) {
            if ( err ) {
                console.log( err );
            } else {
                Promotion.find({}, function( err, allPromotions ){
                    if( err ){
                        console.log( err );
                    }
                    else {
                         res.render( "index.ejs", { movie: allMovies, promotion: allPromotions });
                    }
                });
            }
        });
    }); 

    //register
    router.get( "/register", function( req, res ){
        res.render( "register.ejs" )
    });

    router.post( "/register", function( req, res ){
        let newUser = new User({ username: req.body.username });
        if( req.body.secret == 'Top Secret'){
            newUser.isAdmin = true;
        }
        User.register( newUser, req.body.password, function( err, user ){
            if ( err ){
                req.flash( "error", err.message );
                return res.redirect( "/register" );
            } else {
                passport.authenticate( "local" )(req, res, function() {
                    req.flash( "success", "Register successfully" );
                    res.redirect( "/" );
                });
            }
        });
    })

    //login
    router.get( "/login", function( req, res ) {
        res.render( "login.ejs" )
    });

    router.post( "/login", passport.authenticate( "local", {
        successRedirect: "/",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true,
        successFlash: "Successfully login",
        failureFlash: "Invalid username or password"
    }), function(req, res) {});

    //logout
    router.get( "/logout", function( req, res ){
        req.logout();
        req.flash( "success", "Log out successfully" );
        res.redirect( "/" );
    });

module.exports = router;