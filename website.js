var validator = require('url');

function Website (url) {
    var url = url;
    
    this.getHost = function () {
        return validator.parse(url).host;
    }

    this.filter = function (url) {
        
    }
}

module.exports = Website;
