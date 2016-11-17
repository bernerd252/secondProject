var orm = require("../config/orm.js");
var PNGImage = require('pngjs-image');
var express = require('express');
var fileUpload = require('express-fileupload');
var Twitter = require('twitter');


// Twitter API
// =============================================================

var client = new Twitter({
    consumer_key: '6GvMBkLDa6YQWNTzeQ2zb4CC7',
    consumer_secret: 'Te4WA96rGv2ISypasGmQG65QaupoyDSShhuQcgtYq2RJTS8QUP',
    access_token_key: '799057205119123456-PE3tV1pYtOEyDpUdV8i3P3UjjBJ0OTN',
    access_token_secret: '03RvoJ1rHN7AmgiE6rsecJ4DXVCxIqTfywDmu6fSdbuH9'
});

var counter = 0;

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
            orm.searchCleanup(req.params.cleanups, function(data) {
                res.json(data);
            })
        }

        // Otherwise...
        else {
            // Otherwise display the data for all of the characters. 
            // (Note how we're using the ORM here to run our searches)
            var data = orm.allCleanups(function(data) {
                res.json(data);
            });
        };

    });

    app.use(fileUpload());

    // If a user sends data to add a new character...
    app.post('/api/new', function(req, res) {

        // Take the request...
        var cleanup = req.body;
        console.log(cleanup);
        // Then send it to the ORM to "save" into the DB.
        orm.addCleanup(cleanup, function(data) {
            // res.send("Post request to database");
        });


        var app = express();

        // default options 

        var sampleFile;

        if (!req.files) {
            res.send('No files were uploaded.');
            return;
        }

        var picID = "pic" + counter;
        sampleFile = req.files.sampleFile;
        sampleFile.mv('./app/routes/images/' + picID, function(err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send('File uploaded!');
            }
        });

        client.post('statuses/update', { status: 'I Love Twitter' }, function(error, tweet, response) {
            if (error) throw error;
            console.log(tweet); // Tweet body. 
            // console.log(response); // Raw response object. 
        });


    })


}
