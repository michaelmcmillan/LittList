/* Dependencies */
var express      = require('express');
var session      = require('express-session');
var sessionStore = require('express-mysql-session')
var handlebars   = require('express-handlebars'); 
var bodyParser   = require('body-parser')
var app          = express();

/* Application */
var config       = require('../config.js');
var routes       = require('./routes.js'); 
var logger       = require('../log/logger.js');

/* Bootstrap */
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/assets'));
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

/* Session */
app.use(session({
    key: 'littlist',
    secret: 'e',
    store: new sessionStore(config.database()),
    resave: true,
    saveUninitialized: true 
}));

/* Templating */
app.engine('handlebars', handlebars({
    defaultLayout: __dirname + '/views/layouts/main',
    partialsDir:   __dirname + '/views/partials/'
}));

/* Routes */
app.use('/', routes);

/* Lift-off */
app.listen(config.web.port, function () {
    logger.info('LittList is now listening on port', config.web.port);
});
