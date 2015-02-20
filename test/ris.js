var assert    = require('assert');
var RisParser = require('../parsers/ris.js');

describe('ris', function () {

    var risSource;

    before(function () {
        risSource = [
            'TY  - BOOK',
            'ID  - 101342446',
            'T1  - Det tenkende mennesket: filosofi- og vitenskapshistorie med vitenskapsteori',
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
            'KW  - Filosofi',
            'ER  - '
        ].join('\n'); 
    });

    it('should throw an exception on an ris-file missing fields', function () {
        var ris = new RisParser('this does not look like ris format'); 
        assert.throws(function () {
            ris.parse();
        }, Error);
    });

    it('should throw an exception on an illegal ris-type', function () {
        var ris = new RisParser('XX  - This tag is an invalid tag.'); 
        assert.throws(function () {
            ris.parse();
        }, Error);
    });
    
    it('should allow no value on the ER field', function () {
        var ris = new RisParser('TY  - BUUUUK\nER   -'); 
        assert.throws(function () {
            ris.parse();
        }, Error);
    });
    
    it('should throw an exception on an illegal reference type', function () {
        var ris = new RisParser('TY  - BUUUUK\nER   -'); 
        assert.throws(function () {
            ris.parse();
        }, Error);
    });
    
    it('should throw an exception on an empty ris-file', function () {
        var ris = new RisParser(''); 
        assert.throws(function () {
            ris.parse();
        }, Error);
    });
    
    it('should properly return what kind of entity the ris format describes (ie. book)', function () {
        var ris = new RisParser(['TY  - BOOK', 'ER  -'].join('\n')); 
        assert.equal(ris.parse().TY, 'BOOK');
    });
    
    it('should return the publisher', function () {
        var ris = new RisParser('TY  - BOOK\nPB  - Cappelen Damn\nER  -'); 
        assert.equal(ris.parse().PB, 'Cappelen Damn');
    });
    
    it('should correctly parse a multi-line ris file', function () {
        var ris = new RisParser(['TY  - BOOK', 'PB  - Cappelen Damn', 'ER  -'].join('\n')); 
        assert.equal(ris.parse().PB, 'Cappelen Damn');
        assert.equal(ris.parse().TY, 'BOOK');
    });
    
    it('throws an exception if ER-field is not the last field.', function () {
        var risWithoutER = new RisParser(['TY  - BOOK', 'PB  - Cappelen Damn'].join('\n')); 
        assert.throws(function () {
            risWithoutER.parse();
        }, Error);
    });
    
    it('should have an ER-field ending the reference.', function () {
        var risWithER = new RisParser(['TY  - BOOK', 'PB  - Cappelen Damn', 'ER  -'].join('\n')); 
        assert.doesNotThrow(function () {
            risWithER.parse(); 
        });
    }); 

    it('throws an exception if the TY-field is not the first field.', function () {
        var ris = new RisParser(['PB  - Cappelen Damn', 'TY  - BOOK', 'ER  -'].join('\n')); 
        assert.throws(function () {
            ris.parse();
        }, Error);
    });
});
