var orm = require("../config/orm.js");
var PNGImage = require('pngjs-image');
var express = require('express');
var fileUpload = require('express-fileupload');
var Twit = require('twit');
var fs = require('fs');


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


    app.post('/upload', function(req, res) {

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
                console.log(data)
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

}
