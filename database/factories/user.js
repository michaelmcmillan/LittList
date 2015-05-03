var database  = require('../bootstrap.js');
var User      = require('../../models/user.js');

var UserFactory = {
    
    constructUser: function (row) {
        var user = new User();
        user.setId(row.id);
        user.setEmail(row.email);
        user.setHashedPassword(row.password);
        return user;
    },

    read: function (email, done) {
        var self = this;
        database.query('SELECT * FROM Users ' +
            'WHERE email = ?', email,
        function (err, rows, fields) {
            if (err) return done(err);

            var row = rows[0];
            var user = self.constructUser(row);
            done(undefined, user);
        });
    },

    create: function (user, done) {
        var self = this;
        database.query('INSERT INTO Users SET ?', {
            email:    user.getEmail(),
            password: user.getPassword()
        }, function (err, rows, fields) {
            if (err) return done(err);
            return self.read(user.getEmail(), done);
        });
    }
};

module.exports = UserFactory;
