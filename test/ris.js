var assert    = require('assert');
var RisParser = require('../parsers/ris/ris.js');

describe('ris', function () {

    it('should throw an exception on a ris-file missing fields', function () {
        var ris = new RisParser('this does not look like ris format'); 
        assert.throws(function () {
            ris.parse();
        }, /No fields found/);
    });

    it('should throw an exception on an illegal field', function () {
        var ris = new RisParser(['TY  - BOOK', 'XX  - This tag is an invalid field.', 'ER  -'].join('\n')); 
        assert.throws(function () {
            ris.parse();
        }, /Illegal field/);
    });
    
    it('should not allow an illegal TY (reference type)', function () {
        var ris = new RisParser('TY  - BUUUUK\nER  -'); 
        assert.throws(function () {
            ris.parse();
        }, /reference type/);
    });
    
    it('should throw an exception on an empty ris-file', function () {
        var ris = new RisParser(''); 
        assert.throws(function () {
            ris.parse();
        }, /empty/);
    });
    
    it('should properly return what kind of type the ris format describes (ie. book)', function () {
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
        var risWithoutER = new RisParser(['TY  - BOOK', 'ER  -', 'PB  - Cappelen Damn'].join('\n')); 
        assert.throws(function () {
            risWithoutER.parse();
        }, /field is not ER/);
    });
    
    it('throws an exception if uneven occurences of TY/ER fields.', function () {
        var risWithoutER = new RisParser(['TY  - BOOK', 'TY  - BOOK', 'ER  -'].join('\n')); 
        assert.throws(function () {
            risWithoutER.parse();
        }, /Uneven occurences/);
    });
    
    it('should not throw an exception if ER-field is the last field.', function () {
        var risWithER = new RisParser(['TY  - BOOK', 'PB  - Cappelen Damn', 'ER  -'].join('\n')); 
        assert.doesNotThrow(function () {
            risWithER.parse(); 
        });
    }); 

    it('throws an exception if the TY-field is not the first field.', function () {
        var ris = new RisParser(['PB  - Cappelen Damn', 'TY  - BOOK', 'ER  -'].join('\n')); 
        assert.throws(function () {
            ris.parse();
        }, /field is not TY/);
    });
});
