var logger      = require('../../log/logger.js');
var ListFactory = require('../../database/factories/list.js');
var BibliographyGenerator = require('../../bibliographies/bibliographyGenerator.js');

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
            
            logger.profile('bibliography generation', {
                id: list.getId()
            });

            res.render('list', {
                references: list.getReferences(),
                list: bibliography,
                count: list.getReferences().length
            }); 
        });
    });
}

module.exports = ViewListController;
