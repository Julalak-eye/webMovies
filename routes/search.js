const express = require( "express" ),
    router = express.Router(),
    Movie = require( "../models/movie" );

    router.post("/", function( req, res){
        res.redirect('/search/' + req.body.search);
    });

    router.get("/:search", function( req, res ){
        Movie.find({name: {'$regex': req.params.search, '$options': 'i'}}, function( err, foundSearch ){
            if( err ){
                console.log( err );
            }
            else {
                res.render('search.ejs', { search: foundSearch});
            }
        })
    });

module.exports = router;