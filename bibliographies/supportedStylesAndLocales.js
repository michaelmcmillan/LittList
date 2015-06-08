var config           = require('../config.js');
var supportedStyles  = require('./supportedStyles.js');
var supportedLocales = require('./supportedLocales.js');

function supportedStylesAndLocales (done) {

    var allowedStyles   = config.bibliography.styles.allowed;
    var allowedLocales  = config.bibliography.locales.allowed;

    var stylesLocation  = config.bibliography.styles.location;
    var localesLocation = config.bibliography.locales.location;
    
    supportedStyles(allowedStyles, stylesLocation, function (err, styles) {
        supportedLocales(allowedLocales, localesLocation, function (err, locales) {
            return done(undefined, styles, locales);
        });
    });
}

module.exports = supportedStylesAndLocales;
