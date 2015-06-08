var fs = require('fs');

function supportedLocales (allowedStyles, localesLocation, done) {
     
    var locales  = [];
    
    fs.readdir(localesLocation, function(err, files) {
        if (err) return done(err); 
        
        files.forEach(function(file) {
            if (allowedLocales[file] !== undefined)
                locales.push({
                    name: allowedLocales[file],
                    file: file
                });            
        });
        
        return done(undefined, locales);
    });
}

module.exports = supportedLocales;
