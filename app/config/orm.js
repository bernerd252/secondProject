var connection = require('./connection.js');

// ORM 
// =============================================================

var tableName = "cleanupSites";

var orm = {

	// Here our ORM is creating a simple method for performing a query of the entire table.
	// We make use of the callback to ensure that data is returned only once the query is done.
	cleanups: function(callback){
		var s = 'SELECT * FROM ' + tableName;

		connection.query(s, function(err, result) {
	 
            callback(result);

        });
	},

	// Here our ORM is creating a simple method for performing a query of a single character in the table.
	// Again, we make use of the callback to grab a specific character from the database. 

	searchCleanups: function(name, callback){
		var s = 'select * from ' + tableName + ' where routeName=?';

		connection.query(s,[name], function(err, result) {
	 
            callback(result);
        });

	},

	// Here our ORM is creating a simple method for adding characters to the database
	// Effectively, the ORM's simple addCharacter method translates into a more complex SQL INSERT statement. 

	addCleanup: function(cleanup, callback){

		// Creating a routeName so its easy to search. 

		var routeName = cleanup.routeName.replace(/\s+/g, '').toLowerCase();
		var userName = cleanup.userName.replace(/\s+/g, '').toLowerCase();


	

		console.log(routeName);

		var s = "INSERT INTO " + tableName + " (routeName, userName) VALUES (?,?)";

		connection.query(s,[routeName, userName], function(err, result) {
            console.log("Successfully pushed to database");
            callback(result);

        });

	}


};

module.exports = orm;