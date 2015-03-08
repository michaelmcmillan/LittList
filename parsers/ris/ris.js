function RisParser (source, strict) {
    
    var risFields  = require('./fields.js');
    var risTypes   = require('./types.js');
    var risPattern = /^([a-zA-Z0-9]{2})\s{2}\-\s?(.*)/;
    var strict     = (strict === undefined || strict === true ? true : false);

    var matches    = [];
    var fields     = {};
    var fieldKeys  = []; 

    var validRisFormat = function () {

        // The first field must be the TY-field
        if (fieldKeys[0] !== 'TY')
            throw new Error ('First field is not TY (type of reference).');
        
        // The last field must be the ER-field.
        if (fieldKeys[fieldKeys.length - 1] !== 'ER')
            throw new Error ('Last field is not ER (end reference).');
        
        for (field in fields) {

            // The field must be defined by the specification
            if (risFields[field] === undefined)
                throw new Error ('Illegal field: ' + field);
            
            // All fields except ER must have a value
            if (fields[field] === undefined && field !== 'ER')
                throw new Error ('Missing value for field:' + field);
            
            // TY-field (type of reference) must have a type defined by
            // the specification
            if (field == 'TY' && risTypes[fields[field]] === undefined) 
                throw new Error ('Illegal reference type:' + fields[field]);
        }
        return true;
    }
   
    this.parse = function () {
        
        // Combine linebroken lines
        source = source.replace(/\n\s{6}/, ' ');
        
        // Parse each line with risPattern
        source.split('\n').forEach(function (line) {
            matches.push(line.match(risPattern));
        });

        if (source.length === 0)
            throw new Error ('File is empty.');

        if (matches[0] === null)
            throw new Error ('No fields found.');
        
        // Split fields and values and count TY/ER occurences
        for (i = 0, TY = 0, ER = 0; i < matches.length; i++) {
             
            if (matches[i]    === null) continue;
            if (matches[i][1] === 'TY') TY += 1; 
            if (matches[i][1] === 'ER') ER += 1; 
            
            var fieldKey = matches[i][1];

            // If field already has a value 
            if (fieldKey !== 'TY'
            &&  fieldKey !== 'ER'
            &&  fields[fieldKey] !== undefined) {
                
                var oldValue = fields[fieldKey];
                
                // Turn into an array and push the old string in 
                if (typeof oldValue === "string") { 
                    fields[fieldKey] = [];
                    fields[fieldKey].push(oldValue);
                    
                // Copy over previous array values
                } else if (fields[fieldKey] instanceof Array) {
                    fields[fieldKey] = oldValue;
                } 
                
                // At this point we know fields[fieldKey] is an array.
                // So we finally add the new matched value
                fields[fieldKey].push(matches[i][2]);
            
            // If field key does not already exist
            } else {

                // Assign the field the matched value 
                fields[fieldKey] = matches[i][2];
            }
        }
        
        if (TY !== ER)
            throw new Error ('Uneven occurences of TY/ER.');

        fieldKeys = Object.keys(fields);
        
        // Validate if strict mode is enabled
        if (strict && validRisFormat())
            return fields;
        else if (!strict) 
            return fields;
    }
}

module.exports = RisParser;
