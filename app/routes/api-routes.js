var orm = require("../config/orm.js");
var express = require('express');
var fileUpload = require('express-fileupload');
var Twit = require('twit');
var fs = require('fs');
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
var path = require('path');


var StrategyLocal = require('passport-local').Strategy;
var db = require('../db');


// Twitter API
// =============================================================
var T = new Twit({
    consumer_key: '3YQoTNAeLXqedFytaYsm7XAqv',
    consumer_secret: 'lXebEZx5rv6ToeLeXHNX43PTsCYgQZnhBxeRwNmtC9FaQgExc5',
    access_token: '799057205119123456-PE3tV1pYtOEyDpUdV8i3P3UjjBJ0OTN',
    access_token_secret: '03RvoJ1rHN7AmgiE6rsecJ4DXVCxIqTfywDmu6fSdbuH9'

});


// Routes
// =============================================================
module.exports = function(app) {

    // Search for Specific Character (or all characters) then provides JSON
    app.get('/api/:cleanups?', function(req, res) {
        console.log(req.body)
            // If the user provides a specific character in the URL...
        if (req.params.cleanups) {

            // Then display the JSON for ONLY that character.
            // (Note how we're using the ORM here to run our searches)
            orm.searchCleanups(req.params.cleanups, function(data) {
                res.json(data);
            })
        }

        // Otherwise...
        // else {
        //     // Otherwise display the data for all of the characters. 
        //     // (Note how we're using the ORM here to run our searches)
        //     var data = orm.allCleanups(function(data) {
        //         res.json(data);
        //     });
        // };

    });


    // TWITTER PASSPORT AUTHENTICATION


    // Configure the Twitter strategy for use by Passport.
    // =============================================================

    passport.use(new Strategy({
            consumerKey: '3YQoTNAeLXqedFytaYsm7XAqv',
            consumerSecret: 'lXebEZx5rv6ToeLeXHNX43PTsCYgQZnhBxeRwNmtC9FaQgExc5',
            callbackURL: 'http://localhost:8080/login/twitter/return'
        },
        function(token, tokenSecret, profile, cb) {
            // In this example, the user's Twitter profile is supplied as the user
            // record.  In a production-quality application, the Twitter profile should
            // be associated with a user record in the application's database, which
            // allows for account linking and authentication with other identity
            // providers.
            return cb(null, profile);
        }));


    // Configure Passport authenticated session persistence.
    // =============================================================
    passport.serializeUser(function(user, cb) {
        cb(null, user);
    });

    passport.deserializeUser(function(obj, cb) {
        cb(null, obj);
    });

    app.use(require('cookie-parser')());
    app.use(require("express-session")({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
    // Initialize Passport and restore authentication state, if any, from the
    // session.
    app.use(passport.initialize());
    app.use(passport.session());


    app.get("/login", function(req, res) {
        res.sendFile(path.join(__dirname, "/../../public/account.html"));
    });

    // Initiate the Twitter Authentication
    app.get("/login/twitter", passport.authenticate("twitter"));

    // When Twitter is done, it uses the below route to determine where to go
    app.get("/login/twitter/return",
        passport.authenticate("twitter", { failureRedirect: "/login" }),

        function(req, res) {
            res.redirect("/home");
            console.log('USER authenticated');
        });


    app.get("/upload",
        require("connect-ensure-login").ensureLoggedIn(),
        function(req, res) {

            res.sendFile(path.join(__dirname, "/../../public/upload.html"));

        });

    app.get("/create",
        require("connect-ensure-login").ensureLoggedIn(),
        function(req, res) {

            res.sendFile(path.join(__dirname, "/../../public/create.html"));

        });


    // ===========================================


    // LOCAL USER PASSPORT AUTHENTICATION

    // Configure the local strategy for use by Passport.
    //
    // The local strategy require a `verify` function which receives the credentials
    // (`username` and `password`) submitted by the user.  The function must verify
    // that the password is correct and then invoke `cb` with a user object, which
    // will be set at `req.user` in route handlers after authentication.
    passport.use(new StrategyLocal(
        function(username, password, cb) {
            db.users.findByUsername(username, function(err, user) {
                if (err) {
                    return cb(err);
                }
                if (!user) {
                    return cb(null, false);
                }
                if (user.password != password) {
                    console.log("User not logged in");
                    return cb(null, false);
                }
                return cb(null, user);
            });
        }));


    // Configure Passport authenticated session persistence.
    //
    // In order to restore authentication state across HTTP requests, Passport needs
    // to serialize users into and deserialize users out of the session.  The
    // typical implementation of this is as simple as supplying the user ID when
    // serializing, and querying the user record by ID from the database when
    // deserializing.
    passport.serializeUser(function(user, cb) {
        console.log("user logged in");
        cb(null, user.username);
    });

    passport.deserializeUser(function(username, cb) {
        db.users.findByUsername(username, function(err, user) {
            if (err) {
                return cb(err);
            }
            cb(null, user);
        });
    });


    app.post('/login/local',
        passport.authenticate('local', { failureRedirect: '/login' }),
        function(req, res) {
            res.redirect('/');
        });

    app.get('/logout',
        function(req, res) {
            req.logout();
            res.redirect('/');
        });

    // ===========================================

    app.use(fileUpload());


    app.post('/api/eventscreated', function(req, res) {

        var eventCreated = req.body;

        console.log(req.body);

        orm.addEvent(eventCreated, function(data) {
            res.json(data);
        })

    });

    app.post('/upload', function(req, res) {

        // Take the request...
        var cleanup = req.body;
        console.log(cleanup);
        // Then send it to the ORM to "save" into the DB.
        orm.addCleanup(cleanup, function(data) {
            // res.send("Post request to database");
        });


        // var app = express();

        // default options 

        var sampleFile;

        if (!req.files) {
            res.send('No files were uploaded.');
            return;
        }

        var picID = Date.now() + ".jpg";
        var filePath = './app/routes/images/' + picID;
        console.log("This is the pic ID: " + picID);
        sampleFile = req.files.upload_image_file;
        sampleFile.mv(filePath, function(err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send('File uploaded!');
            }
            setTimeout(tweetContent, 10000);
            // Delete the image after 24 hours
            setTimeout(deleteImage, 86400000);
        });


        function tweetContent() {
            T.postMediaChunked({ file_path: filePath }, function(err, data, response) {
                console.log("this is the file path: " + filePath)
                var mediaIdStr = data.media_id_string
                var altText = "Image could not be loaded"
                var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

                T.post('media/metadata/create', meta_params, function(err, data, response) {
                    if (!err) {
                        // now we can reference the media and post a tweet (media will attach to the tweet) 
                        var params = { status: cleanup.description, media_ids: [mediaIdStr] }

                        T.post('statuses/update', params, function(err, data, response) {
                            console.log(data)
                        })
                    } else {
                        console.error(err);
                    }
                })
            })
        }

        function deleteImage() {
            fs.unlink(filePath, function(err) {
                if (err) {
                    console.error(err);
                }
            });
        }

    });

    app.post("/createUser", function(req, res) {
        var newUser = req.body;
        if (!newUser.first_name || !newUser.last_name || !newUser.email || !newUser.user_name || !newUser.password) {
            res.redirect("/login");
        }
        else{
            orm.addUser(newUser);
            res.redirect("/home")    
        }
        
    });


}
