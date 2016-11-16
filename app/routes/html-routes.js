// Dependencies
// =============================================================
var path 		= require('path');


// Routes
// =============================================================
module.exports = function(app){

	// Each of the below routes just handles the HTML page that the user gets sent to.
	app.get('/', function(req, res){
		res.sendFile(path.join(__dirname + '/../public/view.html'));
	});

	app.get('/upload', function(req, res){
		res.sendFile(path.join(__dirname + '/../public/upload.html'));
	});

	app.get('/find', function(req, res){
		res.sendFile(path.join(__dirname + '/../public/find.html'));

	});

	app.get('/create', function(req, res){
		res.sendFile(path.join(__dirname + '/../public/create.html'));

	});

	app.get('/gallery', function(req, res){
		res.sendFile(path.join(__dirname + '/../public/gallery.html'));

	});


}

