var Harvard = require('../bibliographies/harvard/harvard.js');
var crypto = require('crypto');

function List () {
    
    var id;
    var url = crypto.randomBytes(5).toString('hex');
    var bibliography = new Harvard();
    var user;
    var created = new Date();

    this.getId = function () {
        return id; 
    }

    this.setId = function (newId) {
        id = newId;
    }

    this.getBibliographyStyle = function () {
        return bibliography.constructor.name;
    }

    this.getUrl = function () {
        return url; 
    }

    this.getCreatedAt = function () {
        return created; 
    }
    
    this.getReferences = function () {
        return bibliography.getReferences(); 
    }
    
    this.addReference = function (reference) {
        return bibliography.addReference(reference);
    }

    this.removeReference = function (reference) {
        return bibliography.removeReference(reference);
    }
}

module.exports = List;
