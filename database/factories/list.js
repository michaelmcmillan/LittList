var database         = require('../bootstrap.js');
var Author           = require('../../models/author.js');
var Book             = require('../../models/book.js');
var List             = require('../../models/list.js');
var AuthorFactory    = require('./author.js');
var ReferenceFactory = require('./reference.js');
var BookFactory      = require('./book.js');

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

var ListFactory = {
    
    read: function (id, done) {
        var self = this;
        database.query('SELECT * FROM Lists ' + 
            'WHERE id = ?', id,
        function (err, rows, fields) {
            if (err) return done(err);
            var row = rows[0];

            var list = new List();
            list.setId(row.id);
            list.setUrl(row.url);
            
            database.query('SELECT * FROM Contents ' +
                'JOIN `References` ON Contents.reference_id = References.id ' +
                'JOIN `Lists` ON Contents.list_id = Lists.id ' +
                'WHERE Lists.id = ?', row.id,
            function (err, rows, fields) {
                if (err) return done(err);

                rows.forEach(function (row) {
                    list.addReference(row.reference_id);
                });

                return done(undefined, list);
            });
        });
    },
    
    update: function (list, done) {
        var self = this;       
        
        self.read(list.getId(), function (err, readList) {
            if (err) return done(err);            
 
            // Differentiate between whats stored and whats not
            var contentInDatabase = readList.getReferences();
            var passedInContent   = list.getReferences();
            
            // Find the diff between content passed and content in db
            var added   = passedInContent.diff(contentInDatabase);
            var removed = contentInDatabase.diff(passedInContent);

            // Async queue
            var queue = 0;

            // Delete the removed references
            if (removed.length !== 0) {
                queue++;
                database.query('DELETE FROM Contents ' + 
                    'WHERE list_id = ' + database.escape(list.getId()) + ' ' +  
                    'AND reference_id IN (?)', removed,
                function (err, rows, fields) {
                    if (err) return done(err);
                    if (--queue === 0)
                        return self.read(list.getId(), done);
                });         
            }

            var contentEntries = [];
            added.forEach(function (add) {
                contentEntries.push([list.getId(), add]);
            });
 
            // Execute query by inserting contentEntries
            if (contentEntries.length !== 0) {
                queue++;
                database.query('INSERT INTO Contents ' + 
                    '(list_id, reference_id) VALUES ?', 
                [contentEntries], function (err, rows, field) {
                    if (err) return done(err);
                    if (--queue === 0)
                        return self.read(list.getId(), done);
                });
            }
        }); 
    },

    create: function (list, done) {
        var self = this;
        
        // Create the actual List entry
        database.query('INSERT INTO Lists SET ?', {
            url: list.getUrl()
        }, function (err, rows, field) {
            
            // Get the id from the created list
            var list_id = rows.insertId;

            // If no contents return the list id
            if (list.getReferences().length === 0)
                return done(undefined, list_id);

            // Link the contents (referenceIds) to the list
            var contentEntries = [];
            list.getReferences().forEach(function (reference_id) {
                contentEntries.push([list_id, reference_id]);
            });
            
            // Execute query by inserting contentEntries
            database.query('INSERT INTO Contents ' + 
                '(list_id, reference_id) VALUES ?', 
            [contentEntries], function (err, rows, field) {
                if (err) return done(err);
                return self.read(list_id, done);
            });
        });
    },
}

module.exports = ListFactory;
