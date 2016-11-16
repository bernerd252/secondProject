var orm 			= require ("../config/orm.js");
var PNGImage = require('pngjs-image');

// Routes
// =============================================================
module.exports = function(app){

	// Search for Specific Character (or all characters) then provides JSON
	app.get('/api/:cleanups?', function(req, res){
		console.log(req.body)
		// If the user provides a specific character in the URL...
		if(req.params.cleanups){

			// Then display the JSON for ONLY that character.
			// (Note how we're using the ORM here to run our searches)
			orm.searchCleanup(req.params.cleanups,function(data){
				res.json(data);
			})
		}

		// Otherwise...
		else{
			// Otherwise display the data for all of the characters. 
			// (Note how we're using the ORM here to run our searches)
			var data =  orm.allCleanups(function(data){
				res.json(data); });
			};

	});

	// If a user sends data to add a new character...
	app.post('/api/new', function(req, res){

		// Take the request...
		var cleanup = req.body;

		// Then send it to the ORM to "save" into the DB.
		orm.addCleanup(cleanup, function(data){
		});

		var image = PNGImage.createImage(100, 300);
 
		// Get width and height 
		console.log(image.getWidth());
		console.log(image.getHeight());
		 
		// Set a pixel at (20, 30) with red, having an alpha value of 100 (half-transparent) 
		image.setAt(20, 30, { red:255, green:0, blue:0, alpha:100 });
		 
		// Get index of coordinate in the image buffer 
		var index = image.getIndex(20, 30);
		 
		// Print the red color value 
		console.log(image.getRed(index));
		 
		// Get low level image object with buffer from the 'pngjs' package 
		var pngjs = image.getImage();
		 
		image.writeImage('/images', function (err) {
		    if (err) throw err;
		    console.log('Written to the file');
		});

	})

	
}
