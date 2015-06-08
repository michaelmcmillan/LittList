var logger      = require('../../log/logger.js');
var config      = require('../../config.js');
var ListFactory = require('../../database/factories/list.js');
var BibliographyGenerator     = require('../../bibliographies/bibliographyGenerator.js');
var supportedStylesAndLocales = require('../../bibliographies/supportedStylesAndLocales.js');

function ViewListController (req, res) {

    // Redirect to frontpage when no list
    // exists for the current session
    if (req.session.list === undefined)
        return res.redirect('/');
    
    // Load the list for the current session 
    ListFactory.read(req.session.list, function (err, list) {
        
        // Use citeproc to generate the bibliography
        logger.profile('bibliography generation');
        BibliographyGenerator(list, function (bibliography) {
            
            // End profiling and attach the list id
            logger.profile('bibliography generation', {
                id: list.getId()
            });

            // Fetch the available reference styles and locales
            supportedStylesAndLocales(function (err, styles, locales) {
                    
                // Mark the style used as selected 
                styles.forEach(function (style) {
                    style.selected = (style.file === list.getBibliographyStyle());
                });
                
                // Mark the locale used as selected 
                locales.forEach(function (locale) {
                    locale.selected = (locale.file === list.getBibliographyLocale());
                });
                
                // Find out if feedback form should be displayed
                var displayFeedback = req.query.feedback === '' ? true : false;

                // Finally render the list with references,
                // the generated bibliography and supported styles
                res.render('list', {
                    references:            list.getReferences(),
                    list:                  bibliography,
                    supportedStyles:       styles,
                    supportedLocales:      locales,
                    referencesInListCount: list.getReferences().length,
                    displayFeedback:       displayFeedback,
                    expired:               list.hasExpired(),
                    lifetime:              list.getHumanFriendlyLifetime()
                }); 
            });
        });
    });
}

module.exports = ViewListController;
