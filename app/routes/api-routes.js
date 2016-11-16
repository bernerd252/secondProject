var orm = require("../config/orm.js");
var PNGImage = require('pngjs-image');
var express = require('express');
var fileUpload = require('express-fileupload');

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

            sampleFile = req.files.sampleFile;
            sampleFile.mv('./app/routes/images/ahmed.jpg', function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.send('File uploaded!');
                }
            });


    })


}
