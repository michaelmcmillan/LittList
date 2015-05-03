var database  = require('../bootstrap.js');
var User      = require('../../models/user.js');
var ListFactory = require('./list.js');

var UserFactory = {
    
    diff: function (a, b) {
        return a.filter(function(i) {
            return b.indexOf(i) < 0;
        });
    },

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
            if (rows.length === 0) 
                return done(new Error('Fant ingen bruker.'));

            var row = rows[0];
            var user = self.constructUser(row);

            self.getListsForUser(row.id, function (err, lists) {
                if (err) return done(err);
                user.addList(lists);
                return done(undefined, user);
            });
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
    },
    
    update: function (user, done) {
        var self = this;

        self.read(user.getEmail(), function (err, readUser) {
            if (err) return done(err);
            
            // Differentiate between whats stored and whats not
            var listsInDatabase = readUser.getLists().map(function (list) {
                return list.getId();
            });

            var passedInLists = user.getLists().map(function (list) {
                return list.getId();
            });

            var added   = self.diff(passedInLists, listsInDatabase);
            var removed = self.diff(listsInDatabase, passedInLists);

            // If no changes has been made, simply return the list as is
            if (removed.length === 0 
            &&  added.length   === 0) {
                return self.read(user.getId(), done);
            }
            
            // Async queue
            var queue = 0;
            
            // Delete the removed lists 
            if (removed.length !== 0) {
                queue++;
                database.query('DELETE FROM UsersHasLists ' + 
                    'WHERE user_id = ' + database.escape(user.getId()) + ' ' +  
                    'AND list_id IN (?)', [removed],
                function (err, rows, fields) {
                    if (err) return done(err);
                    if (--queue === 0)
                        return self.read(user.getEmail(), done);
                });         
            }
            
            // Add new lists
            var addedListIds = [];
            added.forEach(function (addedListId) {
                addedListIds.push([user.getId(), addedListId]);
            });
 
            if (addedListIds.length !== 0) {
                queue++;
                database.query('INSERT INTO UsersHasLists ' + 
                    '(user_id, list_id) VALUES ?', 
                [addedListIds], function (err, rows, field) {
                    if (err) return done(err);
                    if (--queue === 0)
                        return self.read(user.getEmail(), done);
                });
            }
        });
    },

    getListsForUser: function (userId, done) {
        database.query('SELECT * FROM UsersHasLists ' + 
            'WHERE user_id = ?', userId, 
        function (err, rows, fields) {
            if (err) return done(err);
            if (rows.length === 0)
                return done(undefined, []);
            
            var lists = [];
            rows.forEach(function (row) {
                ListFactory.read(row.list_id, function (err, list) {
                    if (err) return done(err);
                    lists.push(list);
                    rows.pop();
                    if (rows.length === 0)
                       return done(undefined, lists); 
                });
            });
        });
    }
};

module.exports = UserFactory;
