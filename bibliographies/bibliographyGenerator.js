var Citeproc = require('citeproc');
var CSL      = require('../models/csl.js');

// Convert the references from the list to CiteJSON
// format so that citeproc can intrepret it
function BibliographyGenerator (list, done) {
        
    // Convert the list to a CSL compatible format
    var citations = CSL(list);

    // These locations should be defined in the config
    var style  = __dirname + '/styles/chicago-fullnote-bibliography.csl';
    var locale = __dirname + '/locales/locales-nb-NO.xml';
    
    // Call the citeproc wrapper with the citations
    Citeproc(citations, style, locale, function (citeproc) {

        citeproc.updateItems(Object.keys(citations));
        var bibliography = citeproc.makeBibliography();
        bibliography = bibliography[1].join('\n');            

        return done(bibliography);
    });
}

module.exports = BibliographyGenerator;
