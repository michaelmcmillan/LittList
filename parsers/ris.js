function RisParser (source) {
    
    var risFields  = require('./risFields.js');
    var risTypes   = require('./risTypes.js');
    var risPattern = /^([0-9|A-Z]{2})  \- (.*)/;
    
    var matches    = [];
    var fields     = {};

    var validate = function () {
        
        if (matches.length === undefined)
            throw new Exception ('No RIS fields found.');
        
        for (field in fields)
            if (risFields[field] === undefined)
                throw new Exception ('Illegal RIS field.');
    }

    this.parse = function () {
        
        source.split('\n').forEach(function (line) {
            matches.push(line.match(risPattern));
        });
         
        for (i = 0; i < matches.length; i++)
            fields[matches[i][1]] = matches[i][2];
        
        validate();
        
        return fields;
    }
}

module.exports = RisParser;
