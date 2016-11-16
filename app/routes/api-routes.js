var orm 			= require ("../config/orm.js");


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

	})
}
