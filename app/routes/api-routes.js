var orm = require("../config/orm.js");
var PNGImage = require('pngjs-image');
var express = require('express');
var fileUpload = require('express-fileupload');
var Twitter = require('twitter');


// Twitter API
// =============================================================

var client = new Twitter({
    consumer_key: '3YQoTNAeLXqedFytaYsm7XAqv',
    consumer_secret: 'lXebEZx5rv6ToeLeXHNX43PTsCYgQZnhBxeRwNmtC9FaQgExc5',
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

                    var picID = "picturesque" + counter + ".jpg";
                    sampleFile = req.files.sampleFile;
                    sampleFile.mv('./app/routes/images/something4.jpg', function(err) {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            res.send('File uploaded!');
                        }
                    });


                    var data = require('fs').readFileSync('./app/routes/images/something4.jpg');
                    var imgSize = require('fs').statSync('./app/routes/images/something.jpg').size;

                    console.log("This is the file size: " + imgSize);
                    // Make post request on media endpoint. Pass file data as media parameter
                    // client.post('media/upload', { media: data }, function(error, media, response) {

                    //     if (!error) {

                    //         // If successful, a media object will be returned.
                    //         console.log(media);

                    //         // Lets tweet it
                    //         var status = {
                    //             status: 'I am a tweet',
                    //             media_ids: media.media_id_string // Pass the media id string
                    //         }

                    //         client.post('statuses/update', status, function(error, tweet, response) {
                    //             if (!error) {
                    //                 console.log(tweet);
                    //             }
                    //         });

                    //     }

                    //     else {
                    //     	console.error(error);
                    //     }
                    // });

                    // const pathToMovie = './app/routes/images/something4.jpg';
                    // const mediaType = 'image/gif'; // `'video/mp4'` is also supported
                    // const mediaData = require('fs').readFileSync(pathToMovie);
                    // const mediaSize = require('fs').statSync(pathToMovie).size;

                    // initUpload() // Declare that you wish to upload some media
                    //     .then(appendUpload) // Send the data for the media
                    //     .then(finalizeUpload) // Declare that you are done uploading chunks
                    //     .then(mediaId => {
                    //         // You now have an uploaded movie/animated gif
                    //         // that you can reference in Tweets, e.g. `update/statuses`
                    //         // will take a `mediaIds` param.
                    //     });

                    // /**
                    //  * Step 1 of 3: Initialize a media upload
                    //  * @return Promise resolving to String mediaId
                    //  */
                    // function initUpload() {
                    //     return makePost('media/upload', {
                    //         command: 'INIT',
                    //         total_bytes: mediaSize,
                    //         media_type: mediaType,
                    //     }).then(data => data.media_id_string);
                    // }

                    // /**
                    //  * Step 2 of 3: Append file chunk
                    //  * @param String mediaId    Reference to media object being uploaded
                    //  * @return Promise resolving to String mediaId (for chaining)
                    //  */
                    // function appendUpload(mediaId) {
                    //     return makePost('media/upload', {
                    //         command: 'APPEND',
                    //         media_id: mediaId,
                    //         media: mediaData,
                    //         segment_index: 0
                    //     }).then(data => mediaId);
                    // }

                    // /**
                    //  * Step 3 of 3: Finalize upload
                    //  * @param String mediaId   Reference to media
                    //  * @return Promise resolving to mediaId (for chaining)
                    //  */
                    // function finalizeUpload(mediaId) {
                    //     return makePost('media/upload', {
                    //         command: 'FINALIZE',
                    //         media_id: mediaId
                    //     }).then(data => mediaId);
                    // }

                    // /**
                    //  * (Utility function) Send a POST request to the Twitter API
                    //  * @param String endpoint  e.g. 'statuses/upload'
                    //  * @param Object params    Params object to send
                    //  * @return Promise         Rejects if response is error
                    //  */

                    // //  var params = {
                    // //  	status: 'I am a tweet',
                    // // media_ids: mediaId
                    // //  }



                    // function makePost(endpoint, params) {
                    //     return new Promise((resolve, reject) => {
                    //         client.post('statuses/upload', params, (error, data, response) => {
                    //             console.log(mediaData);
                    //             console.log(mediaSize);
                    //             console.log(data);
                    //             if (error) {
                    //                 reject(error);
                    //             } else {
                    //                 resolve(data);
                    //             }
                    //         });
                    //     });
                    // }


                    // })

                    var pathToMovie = './app/routes/images/something.jpg';
                    var mediaType = 'image/gif'; // `'video/mp4'` is also supported
                    var mediaData = require('fs').readFileSync(pathToMovie);
                    var mediaSize = require('fs').statSync(pathToMovie).size;

                    initUpload() // Declare that you wish to upload some media
                        .then(appendUpload) // Send the data for the media
                        .then(finalizeUpload) // Declare that you are done uploading chunks
                        .then(function(mediaId) {
                            // You now have an uploaded movie/animated gif
                            // that you can reference in Tweets, e.g. `update/statuses`
                            // will take a `mediaIds` param.
                        });

                    /**
                     * Step 1 of 3: Initialize a media upload
                     * @return Promise resolving to String mediaId
                     */
                    function initUpload() {
                        return makePost('media/upload', {
                            command: 'INIT',
                            total_bytes: mediaSize,
                            media_type: mediaType
                        }).then(function(data) {
                            return data.media_id_string;
                        });
                    }

                    /**
                     * Step 2 of 3: Append file chunk
                     * @param String mediaId    Reference to media object being uploaded
                     * @return Promise resolving to String mediaId (for chaining)
                     */
                    function appendUpload(mediaId) {
                        return makePost('media/upload', {
                            command: 'APPEND',
                            media_id: mediaId,
                            media: mediaData,
                            segment_index: 0
                        }).then(function(data) {
                            return mediaId;
                        });
                    }

                    /**
                     * Step 3 of 3: Finalize upload
                     * @param String mediaId   Reference to media
                     * @return Promise resolving to mediaId (for chaining)
                     */
                    function finalizeUpload(mediaId) {
                        return makePost('media/upload', {
                            command: 'FINALIZE',
                            media_id: mediaId
                        }).then(function(data) {
                            return mediaId;
                        });
                    }

                    /**
                     * (Utility function) Send a POST request to the Twitter API
                     * @param String endpoint  e.g. 'statuses/upload'
                     * @param Object params    Params object to send
                     * @return Promise         Rejects if response is error
                     */

                    //  var params = {
                    //  	status: 'I am a tweet',
                    // media_ids: mediaId
                    //  }


                    function makePost(endpoint, params) {
                        return new Promise(function(resolve, reject) {
                            client.post(endpoint, params, function(error, data, response) {
                                console.log(mediaData);
                                console.log(mediaSize);
                                console.log(data);
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve(data);
                                }
                            });
                        });
                    }


                });

}
