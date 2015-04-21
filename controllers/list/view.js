var logger      = require('../../log/logger.js');
var Harvard     = require('../../bibliographies/harvard/harvard.js');
var ListFactory = require('../../database/factories/list.js');
var Citeproc    = require('citeproc');

function ViewListController (req, res) {

    // Redirect to frontpage when no list
    // exists for the current session
    if (req.session.list === undefined)
        return res.redirect('/');
    
    // Load the list for the current session 
    ListFactory.read(req.session.list, function (err, list) {

        // Convert the references from the list 
        // to CSL-JSON format so that citeproc
        // can intrepret it
        var citations = {
            "first": {
                "id": "first",
                "type": "book",
                "title": "Digital Typography",
                "publisher": "Center for the Study of Language and Information",
                "number-of-pages": "685",
                "source": "Amazon.com",
                "ISBN": "1575860104", 
            }
        }

        var style  = '../../node_modules/citeproc/styles/chicago-fullnote-bibliography.csl';
        var locale = '../../node_modules/citeproc/locales/locales-nb-NO.xml';

        Citeproc(citations, style, locale, function (citeproc) {
            citeproc.updateItems(Object.keys(citations));
            var bibliography = citeproc.makeBibliography();
            bibliography = bibliography[1].join('\n');            

            res.render('list', {
                references: list.getReferences(),
                list: bibliography,
                count: list.getReferences().length
            });
        }); 
    });
}

module.exports = ViewListController;
