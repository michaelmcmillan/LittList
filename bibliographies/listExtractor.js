var Citeproc = require('citeproc');

// Convert the references from the list to CiteJSON
// format so that citeproc can intrepret it
function ListExtractor () {

        var citations = {
            first: {
                'id': 'first',
                'type': 'book',
                'title': 'Digital Typography',
                'publisher': 'Center for the Study of Language and Information',
                'number-of-pages': '685',
                'source': 'Amazon.com',
                'ISBN': '1575860104', 
            }
        }

        var style  = __dirname + '/styles/chicago-fullnote-bibliography.csl';
        var locale = __dirname + '/locales/locales-nb-NO.xml';

        Citeproc(citations, style, locale, function (citeproc) {
            citeproc.updateItems(Object.keys(citations));
            var bibliography = citeproc.makeBibliography();
            bibliography = bibliography[1].join('\n');            
            console.log(bibliography);
        });
}

ListExtractor();

module.exports = ListExtractor;

