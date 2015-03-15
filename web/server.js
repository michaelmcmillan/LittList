/* Dependencies */
var express     = require('express');
var session     = require('express-session');
var handlebars  = require('express-handlebars'); 
var app         = express();

/* Application */
var config      = require('../config.js');
var routes      = require('./routes.js'); 
var logger      = require('../log/logger.js');

/* Bootstrap */
app.use(express.static(__dirname + '/assets'));
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use('/', routes);

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'e'
}));

app.engine('handlebars', handlebars({
    defaultLayout: __dirname + '/views/layouts/main',
    partialsDir:   __dirname + '/views/partials/'
}));

/* Lift-off */
app.listen(config.web.port, function () {
    logger.info('LittList is now listening on port', config.web.port);
});
