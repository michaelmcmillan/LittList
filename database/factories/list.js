var database         = require('../bootstrap.js');
var Author           = require('../../models/author.js');
var Book             = require('../../models/book.js');
var List             = require('../../models/list.js');
var AuthorFactory    = require('./author.js');
var ReferenceFactory = require('./reference.js');
var BookFactory      = require('./book.js');
var WebsiteFactory   = require('./website.js');


var ListFactory = {
    
    diff: function (a, b) {
        return a.filter(function(i) {
            return b.indexOf(i) < 0;
        });
    },

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
            list.setBibliographyStyle(row.style);
            list.setBibliographyLocale(row.locale);
            list.setCreatedAt(row.created_at);
            
            // Async queue
            var queue = 2;
            
            // Get the books in the list
            database.query('SELECT * FROM Contents ' +
                'JOIN `Books` ON Books.reference_id = Contents.reference_id ' +
                'JOIN `Lists` ON Contents.list_id = Lists.id ' +
                'WHERE Lists.id = ?', row.id,
            function (err, rows, fields) {
                if (err) return done(err);
                var referenceIds = []; 
                rows.forEach(function (row) {
                    referenceIds.push(row.reference_id);
                });

                BookFactory.readAll(referenceIds, function (err, books) {
                    if (err) return done(err);    
                    list.addReference(books);

                    if (--queue === 0)
                        return done(undefined, list);
                });
            });

            // Get the websites in the list
            database.query('SELECT * FROM Contents ' +
                'JOIN `Websites` ON Websites.reference_id = Contents.reference_id ' +
                'JOIN `Lists` ON Contents.list_id = Lists.id ' +
                'WHERE Lists.id = ?', row.id,
            function (err, rows, fields) {
                if (err) return done(err);
                var referenceIds = []; 
                rows.forEach(function (row) {
                    referenceIds.push(row.reference_id);
                });

                WebsiteFactory.readAll(referenceIds, function (err, websites) {
                    if (err) return done(err);    
                    list.addReference(websites);

                    if (--queue === 0)
                        return done(undefined, list);
                });
            });
        });
    },
    
    update: function (list, done) {
        var self = this;       
        
        self.read(list.getId(), function (err, readList) {
            if (err) return done(err);            
            
            // Differentiate between whats stored and whats not
            var contentInDatabase = readList.getReferences().map(function (reference) {
                return reference.getId();
            });

            var passedInContent   = list.getReferences().map(function (reference) {
                return reference.getId();
            });

            // Find the diff between content passed and content in db
            var added   = self.diff(passedInContent, contentInDatabase);
            var removed = self.diff(contentInDatabase, passedInContent);
            
            // If no changes has been made, simply return the list as is
            if (removed.length === 0 
            &&  added.length   === 0
            &&  list.getBibliographyStyle()  === readList.getBibliographyStyle()
            &&  list.getBibliographyLocale() === readList.getBibliographyLocale()) {
                return self.read(list.getId(), done);
            }

            // Async queue
            var queue = 0;
            
            // Update the bibliography style
            if (list.getBibliographyStyle() !== undefined) {
                ++queue;
                database.query('UPDATE Lists SET style = ? WHERE id = ?',
                    [list.getBibliographyStyle(), list.getId()],
                    function (err, rows, fields) {
                    if (err) return done(err);
                    if (--queue === 0)
                        return self.read(list.getId(), done);
                });
            }
            
            // Update the bibliography locale 
            if (list.getBibliographyLocale() !== undefined) {
                ++queue;
                database.query('UPDATE Lists SET locale = ? WHERE id = ?',
                    [list.getBibliographyLocale(), list.getId()],
                    function (err, rows, fields) {
                    if (err) return done(err);
                    if (--queue === 0)
                        return self.read(list.getId(), done);
                });
            }

            // Delete the removed references
            if (removed.length !== 0) {
                queue++;
                database.query('DELETE FROM Contents ' + 
                    'WHERE list_id = ' + database.escape(list.getId()) + ' ' +  
                    'AND reference_id IN (?)', [removed],
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
            url: list.getUrl(),
            style: list.getBibliographyStyle(),
            locale: list.getBibliographyLocale(),
            created_at: list.getCreatedAt()
        }, function (err, rows, field) {
            
            // Get the id from the created list
            var list_id = rows.insertId;

            // If no contents return the list id
            if (list.getReferences().length === 0)
                return done(undefined, list_id);

            // Link the contents (referenceIds) to the list
            var contentEntries = [];
            list.getReferences().forEach(function (reference) {
                contentEntries.push([list_id, reference.getId()]);
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
