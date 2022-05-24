const express = require( "express" ),
    router = express.Router(),
    multer = require( "multer" ),
    path = require( "path" ),

    storage = multer.diskStorage({
        destination: function( req, file, callback ) {
            callback( null, "./public/upload/promotion" );
        },
        filename: function( req, file, callback ) {
            callback( null, file.fieldname + '-' + Date.now() + path.extname( file.originalname ));
        }
    }),
    imageFilter = function( req, file, callback ) {
        if ( !file.originalname.match( /\.(jpg|jpeg|png)$/i )) {
            return callback( new Error( "Only jpg, jpeg and png" ), false );
        }
        callback(null, true);
    },
    upload = multer({ storage: storage, fileFilter: imageFilter }),
    middlewareObj = require( "../middleware" ),
    Promotion = require( "../models/promotion" );

    //index promotions
    router.get( "/", function( req, res ){
        Promotion.find({}, function( err, allPromotions ) {
            if ( err ) {
                console.log( err );
            } else {
                res.render( "promotion/promotions.ejs", { promotion: allPromotions });
            }
        });
    });

    // add promotion from form
    router.post( "/", middlewareObj.isAdmin, upload.single( "productPoster" ), function( req, res ) {

        req.body.promotions.productPoster = "/upload/promotion/" + req.file.filename;
        Promotion.create(req.body.promotions, function( err, newlyAdded ) {
            if (err) {
                console.log(err);
            } else {
                res.redirect("/promotions");
            }
        });
    });

    //create
    router.get("/new", middlewareObj.isAdmin, function( req, res ) {
        res.render("promotion/create.ejs")
    });

    //shows
    router.get("/:id", function(req, res) {
        //ถ้ามีการยุ่งหรืออ้างอิงDB อื่น
        Promotion.findById(req.params.id).exec(function( err, foundPromotions ){
            if (err) {
                console.log(err);
            } else {
                res.render('promotion/show.ejs', { promotion: foundPromotions })
            }
        });
    });

    //edit
    router.get( "/:id/edit", middlewareObj.isAdmin, function( req, res ){
        Promotion.findById( req.params.id, function( err, foundPromotions ){
            if( err ){
                console.log( err );
            }
            else {
                res.render( "promotion/edit.ejs", { promotion: foundPromotions })
            }
        });
    });

    router.put( "/:id", middlewareObj.isAdmin, upload.single( "productPoster" ), function( req, res ){
        if( req.file ){
            req.body.promotions.productPoster = '/upload/promotion/' + req.file.filename;
        }
        Promotion.findByIdAndUpdate( req.params.id, req.body.promotions, function( err, updatedPromotion ){
            if( err ){
                console.log( err );
                res.redirect( "/promotions/" );
            }
            else { 
                req.flash( "success", "Edit successfully" );
                res.redirect( "/promotions/" + req.params.id );
            }
        });
    });

    router.delete( "/:id", middlewareObj.isAdmin, function( req, res ){
        Promotion.findByIdAndDelete( req.params.id, function( err ){
            if( err ){
                console.log( err );
                res.redirect( "/promotions/" );
            }
            else {
                res.redirect( "/promotions/" );
            }
        });
    });

module.exports = router;
