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

        var picID = "pic" + counter + ".jpg";
        sampleFile = req.files.sampleFile;
        sampleFile.mv('./app/routes/images/' + picID, function(err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send('File uploaded!');
            }
        });
        

        var data = require('fs').readFileSync('./app/routes/images/' + picID);

        // Make post request on media endpoint. Pass file data as media parameter
        client.post('media/upload', { media: data }, function(error, media, response) {

            if (!error) {

                // If successful, a media object will be returned.
                console.log(media);

                // Lets tweet it
                var status = {
                    status: 'I am a tweet',
                    media_ids: media.media_id_string // Pass the media id string
                }

                client.post('statuses/update', status, function(error, tweet, response) {
                    if (!error) {
                        console.log(tweet);
                    }
                });

            }

            else {
            	console.error(error);
            }
        });

        counter++;
    })


}
