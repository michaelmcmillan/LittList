function RisParser (source) {
    
    var risFields  = require('./risFields.js');
    var risTypes   = require('./risTypes.js');
    var risPattern = /^([A-Z]{2})\s{2}\-\s?(.*)/;
    
    var matches    = [];
    var fields     = {};

    var validRisFormat = function () {
        
        var fieldKeys = Object.keys(fields);
       
        if (matches.length === undefined)
            throw new Exception ('No RIS fields found.');
        
        for (field in fields) {
            
            if (risFields[field] === undefined)
                throw new Exception ('Illegal RIS field.');
            
            if (fields[field] === undefined && field !== 'ER')
                throw new Exception ('Missing value for field.');

            if (field == 'TY' && risTypes[fields[field]] === undefined) 
                throw new Exception ('Illegal reference type.');
        }
        
        if (fieldKeys[0] !== 'TY')
            throw new Exception ('First field is not TY (type of reference).');
        
        if (fieldKeys[fieldKeys.length - 1] !== 'ER')
            throw new Exception ('Last field is not ER (end reference).');
        
        return true;
    }

    this.parse = function () {
        
        source.split('\n').forEach(function (line) {
            matches.push(line.match(risPattern));
        });
         
        for (i = 0; i < matches.length; i++)
            fields[matches[i][1]] = matches[i][2];
        
        if (validRisFormat())
            return fields;
    }
}

module.exports = RisParser;
