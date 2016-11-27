var mysql = require('mysql');

var source = {

    localhost: {
        port: 3306,
        host: 'localhost',
        user: 'root',
        password: "",
        database: "burgers_db"
    },

    jawsDB: {
        port: 3306,
        host: 'enqhzd10cxh7hv2e.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'ttdbssts1ifmmd1w',
        password: "dvcp9e81q26s6j1u",
        database: "q5mmi7qiopnk0kpm"

    }
}

var connection = mysql.createConnection(source.localhost);


connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

module.exports = connection;