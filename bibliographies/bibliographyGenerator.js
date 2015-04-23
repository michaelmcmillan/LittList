var Citeproc = require('citeproc');
var CSL      = require('../models/csl.js');
var config   = require('../config.js');

// Convert the references from the list to CiteJSON
// format so that citeproc can intrepret it
function BibliographyGenerator (list, done) {
        
    // Convert the list to a CSL compatible format
    var citations = CSL(list);

    // Find the references to the style and the locale 
    var styleFile      = list.getBibliographyStyle();
    var styleLocation  = config.bibliography.styles.location  + styleFile;
    var localeLocation = config.bibliography.locales.location + 'locales-nb-NO.xml';
    
    // Call the citeproc wrapper with the citations
    Citeproc(citations, styleLocation, localeLocation, function (citeproc) {

        citeproc.updateItems(Object.keys(citations));
        var bibliography = citeproc.makeBibliography();
        bibliography = bibliography[1].join('\n');            

        return done(bibliography);
    });
}

module.exports = BibliographyGenerator;
