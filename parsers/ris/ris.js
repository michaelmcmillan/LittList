function RisParser (source) {
    
    var risFields  = require('./fields.js');
    var risTypes   = require('./types.js');
    var risPattern = /^([A-Z]{2})\s{2}\-\s?(.*)/;
    
    var matches    = [];
    var fields     = {};
    var fieldKeys  = []; 

    var validRisFormat = function () {
       
        for (field in fields) {
            
            if (risFields[field] === undefined)
                throw new Error ('Illegal field.');
            
            if (fields[field] === undefined && field !== 'ER')
                throw new Error ('Missing value for field.');

            if (field == 'TY' && risTypes[fields[field]] === undefined) 
                throw new Error ('Illegal reference type.');
        }
        
        if (fieldKeys[0] !== 'TY')
            throw new Error ('First field is not TY (type of reference).');
        
        if (fieldKeys[fieldKeys.length - 1] !== 'ER')
            throw new Error ('Last field is not ER (end reference).');

        return true;
    }
   
    this.parse = function () {
        
        source.split('\n').forEach(function (line) {
            matches.push(line.match(risPattern));
        });
        
        if (source.length === 0)
            throw new Error ('File is empty.');

        if (matches[0] === null)
            throw new Error ('No fields found.');
        
        var TY = 0, ER = 0;
        for (i = 0; i < matches.length; i++) {
            if (matches[i][1] === 'TY') TY += 1; 
            if (matches[i][1] === 'ER') ER += 1; 
             
            fields[matches[i][1]] = matches[i][2];
        }
        
        if (TY - ER !== 0)
            throw new Error ('Uneven occurences of TY/ER.');

        fieldKeys = Object.keys(fields);
        
        if (validRisFormat())
            return fields;
    }
}

module.exports = RisParser;
