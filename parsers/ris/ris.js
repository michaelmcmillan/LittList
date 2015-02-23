function RisParser (source) {
    
    var risFields  = require('./fields.js');
    var risTypes   = require('./types.js');
    var risPattern = /^([a-zA-Z0-9]{2})\s{2}\-\s?(.*)/;
    var risError   = function (message) {
        this.name    = 'RisError';
        this.message = message; 
    };
    risError.prototype = new Error;

    var matches    = [];
    var fields     = {};
    var fieldKeys  = []; 

    var validRisFormat = function () {

        // The first field must be the TY-field
        if (fieldKeys[0] !== 'TY')
            throw new risError ('First field is not TY (type of reference).');
        
        // The last field must be the ER-field.
        if (fieldKeys[fieldKeys.length - 1] !== 'ER')
            throw new risError ('Last field is not ER (end reference).');
        
        for (field in fields) {

            // The field must be defined by the specification
            if (risFields[field] === undefined)
                throw new risError ('Illegal field: ' + field);
            
            // All fields except ER must have a value
            if (fields[field] === undefined && field !== 'ER')
                throw new risError ('Missing value for field:' + field);
            
            // TY-field (type of reference) must have a type defined by
            // the specification
            if (field == 'TY' && risTypes[fields[field]] === undefined) 
                throw new risError ('Illegal reference type:' + fields[field]);
        }
        return true;
    }
   
    this.parse = function () {

        source.split('\n').forEach(function (line) {
            matches.push(line.match(risPattern));
        });

        if (source.length === 0)
            throw new risError ('File is empty.');

        if (matches[0] === null)
            throw new risError ('No fields found.');
        
        // Split fields and values and count TY/ER occurences
        for (i = 0, TY = 0, ER = 0; i < matches.length; i++) {
            
            if (matches[i]    === null) continue;
            if (matches[i][1] === 'TY') TY += 1; 
            if (matches[i][1] === 'ER') ER += 1; 

            fields[matches[i][1]] = matches[i][2];
        }
        
        if (TY !== ER)
            throw new risError ('Uneven occurences of TY/ER.');

        fieldKeys = Object.keys(fields);
        
        if (validRisFormat())
            return fields;
    }
}

module.exports = RisParser;
