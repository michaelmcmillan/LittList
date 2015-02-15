function RisParser (source) {
    
    var source = source; 

    var validate = function () {
        var matches = source.match(/^[0-9|A-Z]{2}  \- /); 
        if (matches.length === undefined)
            throw new Exception ('No fields found.');
    }

    this.parse = function () {
        validate();

        return {
            TY: 'BOOK'
        };
    }
}

module.exports = RisParser;
