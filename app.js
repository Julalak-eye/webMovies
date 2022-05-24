    const express = require( "express" ),
        app = express(),
        bodyParser = require( "body-parser" ),
        mongoose = require( "mongoose" ),
        passport = require( "passport" ),
        LocalStrategy = require( "passport-local" ),
        flash = require( "connect-flash" ),
        methodOverride = require( "method-override" ),
        User = require( "./models/user" ),
        seedDB = require( "./seeds.js" );

    const indexRoutes = require( "./routes/index" ),
        commentRoutes = require( "./routes/comments" ),
        moviesRoutes = require( "./routes/movies" ),
        showtimeRoutes = require( "./routes/showtime" ),
        promotionsRoutes = require( "./routes/promotions" ),
        selectseatRoutes = require( "./routes/selectseat" ),
        ticketRoutes = require( "./routes/tickets" );
        SearchRoutes = require( "./routes/search" );
        ProfileRoutes = require( "./routes/profile" );
        TheaterRouter = require( "./routes/theater")

    mongoose.connect( 'mongodb://localhost/webMovies' );
    app.set( "view engine", "ejs" );
    app.use( express.static("./public"));
    app.use( bodyParser.urlencoded({ extended: true }));
    app.use( methodOverride( "_method" ));
    app.use( flash());
    //seedDB();

    app.use(require( 'express-session' )({
        secret: 'secret word',
        resave: false,
        saveUninitialized: false
    }));

    // ประกาศใช้งานส่วนpassport 
    app.use( passport.initialize());
    app.use( passport.session());
    passport.use(new LocalStrategy( User.authenticate()));
    passport.serializeUser( User.serializeUser());
    passport.deserializeUser( User.deserializeUser());

    app.use( function( req, res, next ){
        res.locals.currentUser = req.user;
        res.locals.error = req.flash( "error" );
        res.locals.success = req.flash( "success" );
        next();
    });


    app.use( "/", indexRoutes );
    app.use( "/movies", moviesRoutes );
    app.use( "/movies/:id/comments", commentRoutes );
    app.use( "/showtime/movie/:id", showtimeRoutes );
    app.use( "/promotions", promotionsRoutes );
    app.use( "/select-seat", selectseatRoutes );
    app.use( "/select-seat/:theater_id/:movie_id/ticket", ticketRoutes );
    app.use( "/profile", ProfileRoutes);
    app.use( "/search", SearchRoutes );
    app.use( "/theaters", TheaterRouter);

    app.use( "*", function(req, res){
        res.send("ERROR 404");
    });

    app.listen(3000, function(){
        console.log( "Active" );
    });