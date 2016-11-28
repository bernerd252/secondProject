var orm = require("../config/orm.js");

var records = [
    { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [{ value: 'jack@example.com' }] }, { id: 2, username: 'jill', password: 'birthday', displayName: 'Jill', emails: [{ value: 'jill@example.com' }] }
];

exports.findById = function(id, cb) {
    process.nextTick(function() {
        var idx = id - 1;
        if (records[idx]) {
            cb(null, records[idx]);
        } else {
            cb(new Error('User ' + id + ' does not exist'));
        }
    });
}


exports.findByUsername = function(username, cb) {
    process.nextTick(function() {
        orm.findUser(username, function(data) {
        	console.log("Record prints: " + data.userName);
            if (data.userName === username) {
                return cb(null, data);
            }
            return cb(null, null);
        });

        
    });

}
