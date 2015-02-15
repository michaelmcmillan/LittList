var assert    = require('assert');
var RisParser = require('../parsers/ris.js');

describe('ris', function () {

    var risSource;

    before(function () {
        risSource = [
            'TY  - BOOK',
            'ID  - 101342446',
            'T1  - Det tenkende mennesket: filosofi- og vitenskapshistorie med \n vitenskapsteori',
            'A1  - Dybvig, Dagfinn Døhl 1972-',
            'A1  - Dybvig, Magne 1940-',
            'Y1  - 2003///',
            'N1  - 1. utg. 2000',
            'N2  - 4. oppl. 2009 med 13-sifret ISBN',
            'IS  - 2. utg.',
            'SP  - 520 s. : ill.',
            'PB  - Tapir akademisk forl.',
            'CY  - Trondheim',
            'KW  - Science',
            'KW  - Philosophy',
            'KW  - Historisk framstilling',
            'KW  - Vitenskapsfilosofi',
            'KW  - \n      Filosofi',
            'ER  - '
        ].join('\n'); 
    });

    it('should throw an exception on an invalid ris-file', function () {
        var ris = new RisParser('this does not look like ris format'); 
        
        assert.throws(function () {
            ris.parse();
        });
    });

    it('should properly return what kind of entity the ris format describes (ie. book)', function () {
        var ris = new RisParser('TY  - BOOK'); 
        assert.equal(ris.parse().TY, 'BOOK');
    });
});
