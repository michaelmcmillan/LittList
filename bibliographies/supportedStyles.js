var fs = require('fs');

function supportedStyles (allowedStyles, stylesLocation, done) {
     
    var styles  = [];
    
    fs.readdir(stylesLocation, function(err, files) {
        if (err) return done(err); 
        
        files.forEach(function(file) {
            if (allowedStyles[file] !== undefined)
                styles.push({
                    name: allowedStyles[file],
                    file: file
                });            
        });
        
        return done(undefined, styles);
    });
}

module.exports = supportedStyles;
