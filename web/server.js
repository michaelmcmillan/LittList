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
var controllers  = require('../controllers/controllers.js'); 

/* Bootstrap */
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/assets'));
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

/* Session */
app.use(session({
    key: 'littlist',
    secret: config.session.secret,
    store: new sessionStore(config.database()),
    resave: true,
    saveUninitialized: true 
}));

/* Templating */
app.engine('handlebars', handlebars({
    defaultLayout: __dirname + '/views/layouts/main',
    partialsDir:   __dirname + '/views/partials/'
}));

/* Attach ip to req */
app.use(function (req, res, next) {
    req.ip = req.connection.remoteAddress;
    next();
});

/* Routes */
app.use('/', routes);
app.use(controllers.error.notFound);
app.use(controllers.error.exception);

/* Lift-off */
app.listen(config.web.port, function () {
    logger.log('info', 'LittList is now listening on port %d', config.web.port);
});

/* Landing */
process.on('SIGTERM', function () {
    logger.log('info', 'LittList is now shutting down');
    process.exit()
});

