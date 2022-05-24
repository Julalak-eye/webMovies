const express = require( "express" ),
    router = express.Router(),
    multer = require( "multer" ),
    path = require( "path" ),

    storage = multer.diskStorage({
        destination: function( req, file, callback ){
            callback( null, "./public/upload/" );
        },
        filename: function( req, file, callback ){
            callback( null, file.fieldname + '-' + Date.now() + path.extname( file.originalname ));
        }
    }),
    imageFilter = function( req, file, callback ){
        if ( !file.originalname.match( /\.(jpg|jpeg|png|mp4)$/i )){
            return callback( new Error( "Only jpg, jpeg, png and gif " ), false );
        }
        callback( null, true );
    },
    upload = multer({ storage: storage, fileFilter: imageFilter }),
    middlewareObj = require( "../middleware" ),
    Movie = require( "../models/movie" ),
    Cinema = require( "../models/cinema" ),
    Scheduling = require( "../models/movieScheduling" ),
    User = require( "../models/user");

    //show data
    router.get( "/", function( req, res ){
        Movie.find({}, function( err, allMovies ){
            if ( err ){
                console.log( err );
            } else {
                res.render( "movie/movies.ejs", { movie: allMovies });
            }
        });
    });

    // add new movie
    router.post( "/", middlewareObj.isLoggedIn, upload.fields( [{ name: "poster" }, {name: "trailer"}]), function( req, res ){
        req.body.movies.poster = "/upload/" + req.files["poster"][0].filename;
        req.body.movies.trailer = "/upload/" + req.files["trailer"][0].filename;
        req.body.movies.author = {
            id: req.user._id,
            username: req.user.username
        };
        // input new data
        Movie.create( req.body.movies, function( err, newlyAdded ){
            if ( err ){
                console.log( err );
            } else {
                res.redirect( "/movies" );
            }
        });
    });

    //go to now Showing
    router.get( "/now-showing", function( req, res ){
        Movie.find({}, function( err, allMovies ){
            if ( err ){
                console.log( err );
            } else {
                res.render( "movie/nowShowing.ejs", { movie: allMovies });
            }
        });
    });

    //go to coming soon
    router.get( "/coming-soon", function( req, res ){
        Movie.find({}, function( err, allMovies ){
            if ( err ){
                console.log( err );
            } else {
                res.render( "movie/comingSoon.ejs", { movie: allMovies });
            }
        });
    });

    //go to add new movies
    router.get( "/new", middlewareObj.isAdmin, function( req, res ){
        res.render( "movie/create.ejs" )
    });

    //shows detail movies
    router.get( "/:id", function( req, res ){
        //ถ้ามีการยุ่งหรืออ้างอิงDB อื่น
        Movie.findById( req.params.id ).populate( 'comments' ).exec( function( err, foundMovies ){
            if ( err ){
                console.log( err );
            } else {
                if( req.isAuthenticated()){
                    User.findById ( req.user._id, function( err, foundUser){
                        if( err ){
                            console.log( err );
                        }
                        else{
                             res.render( 'movie/show.ejs', { movie: foundMovies, like: foundUser.like })
                        }
                    });
                } else{
                    res.render( 'movie/show.ejs', { movie: foundMovies }) 
                }
            }
        });
    });

    //edit movies
    router.put( "/:id", middlewareObj.isAdmin, upload.fields( [{ name: "poster" }, {name: "trailer"}]), function( req, res ){
        if( req.files["poster"]){
            req.body.movie.poster = '/upload/' + req.file["poster"][0].filename;
        }
        if( req.files["trailer"] ){
            req.body.movie.trailer = '/upload/' + req.file["trailer"][0].filename;
        }
        Movie.findByIdAndUpdate( req.params.id, req.body.movie, function( err, updatedMovie ){
            if( err ){
                console.log( err );
                res.redirect( "/movies/" );
            }
            else { 
                req.flash( "success", "Edit successfully" );
                res.redirect( "/movies"  );
            }
        });
    });

    // delete movies
    router.delete( "/:id", middlewareObj.isAdmin, function( req, res ){
        Movie.findByIdAndDelete( req.params.id, function( err ){
            if( err ){
                console.log( err );
                res.redirect( "/movies/" );
            }
            else {
                res.redirect( "/movies/" );
            }
        });
    });

    //edit movies
    router.get( "/:id/edit", middlewareObj.isAdmin, function( req, res ){
        Movie.findById( req.params.id, function( err, foundMovies ){
            if( err ){
                console.log( err );
            }
            else {
                res.render( "movie/edit.ejs", { movie: foundMovies })
            }
        });
    });

    //go to add showtime and theater
    router.get("/:id/cinema/add", middlewareObj.isAdmin, function(req, res) {
        Movie.findById(req.params.id, function(err, foundMovies) {
            if (err) {
                console.log(err);
            } else {
                res.render('theater/create.ejs', { movie: foundMovies })
            }
        });
    });

    // add new theater to data base
    router.post( "/:id/cinema/", middlewareObj.isAdmin, function( req, res ){
        Movie.findById( req.params.id, function( err, foundMovies ) {
            if ( err ) {
                console.log( err );
            } else {
                if( req.body.theater.cinema == 1 ){
                    req.body.theater.allShowtime = [ "11:00", "14:00", "17:00", "20:00" ];
                }
                else if( req.body.theater.cinema == 2 ){
                    req.body.theater.allShowtime = [ "10:00", "13:00", "16:00", "19:00" ];
                }
                else if( req.body.theater.cinema == 3 ){
                    req.body.theater.allShowtime = [ "09:00", "11:00", "14:00", "17:00" ];
                }
                else if( req.body.theater.cinema == 4 ){
                    req.body.theater.allShowtime  = [ "12:00", "15:00", "18:00"];
                }
                else if( req.body.theater.cinema == 5 ){
                    req.body.theater.allShowtime  = [ "13:00", "16:00", "19:00" ];
                }
                else if( req.body.theater.cinema == 6 ){
                    req.body.theater.allShowtime  = [ "14:00", "17:00", "20:00" ];
                }
                else if( req.body.theater.cinema == 7 ){
                    req.body.theater.allShowtime  = [ "10:00", "12:00"];
                }
                else if( req.body.theater.cinema == 8 ){
                    req.body.theater.allShowtime  = [ "08:00", "11:00"];
                }

                Cinema.create( req.body.theater, function(err, Theater) {
                    if ( err ){
                        console.log( err );
                    } else {
                            Theater.movieId = foundMovies ;
                            Theater.save();

                            let start = new Date(Theater.startDate);
                            let end = new Date(Theater.endDate);
                            
                            let a = start.getDate();
                            let b = end.getDate();
                            let n = b-a;

                            for(let i = 0 ; i<=n ; i++){
                                Theater.allShowtime.forEach( a => {
                                    let b = new Date()
                                    b.setDate(start.getDate() + i)
                                    Scheduling.create({
                                        movieId: foundMovies,
                                        cinema: Theater.cinema,
                                        selectShowtime: a,
                                        date:  b.getFullYear() + "-" + Number(b.getMonth()+1) + "-" +b.getDate()
                                    }, function(err, back){
                                        if(err){
                                            console.log(err);
                                        } 
                                        else{
                                            back.seat = [{ name: "A1"},{ name: "A2"},{ name: "A3"},{ name: "A4"},{ name: "A5"},
                                            { name: "B1"},{ name: "B2"},{ name: "B3"},{ name: "B4"},{ name: "B5"},
                                            { name: "C1"},{ name: "C2"},{ name: "C3"},{ name: "C4"},{ name: "C5"},
                                            { name: "D1"},{ name: "D2"},{ name: "D3"},{ name: "D4"},{ name: "D5"}]
                                            
                                            back.save() 
                                        }
                                    })    
                                });
                            }
                            res.redirect( "/movies" );
                        }
                    });
                }
            });
        });

    
module.exports = router;