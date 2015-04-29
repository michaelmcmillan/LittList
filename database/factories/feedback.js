var database = require('../bootstrap.js');

var FeedbackFactory = {
    create: function (feedback, done) {
        var self = this;
        database.query('INSERT INTO Feedback SET ?', {
            text: feedback,
        }, function (err, result) {
            if (err) return done(err);
            return done();
        });
    }
}

module.exports = FeedbackFactory;
