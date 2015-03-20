function Author (name) {
   
    var name = name || '';
    
    this.filter = function () {
        name = name
            .replace(/\d+\-?/g,     '') 
            .replace(/^\-|\-\s?$/g, '') 
            .trim();
    };
    
    this.filter();

    this.getInitials = function (name) {
        return name.split(' ').map(function (s) {
            return s.charAt(0);
        }).join('');
    }

    this.getForename = function () {
        return name.substring(0, name.length - this.getSurname().length).trim()
    }
    
    this.getSurname = function () {
        return name.split(' ').reverse()[0];
    }

    this.getName = function () {
        return name; 
    }
    
    this.raw = function () {
        return {
            name: name
        };
    }

    this.toString = function () {
        return name;
    }
}

module.exports = Author;
