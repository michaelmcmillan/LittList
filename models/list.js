var Harvard = require('../bibliographies/harvard/harvard.js');
var crypto = require('crypto');

function List () {
    
    var id;
    var url = crypto.randomBytes(5).toString('hex');
    var references = [];
    var bibliography = new Harvard();
    var user;
    var created = new Date();

    this.getId = function () {
        return id; 
    }

    this.setId = function (newId) {
        id = newId;
    }

    this.getUrl = function () {
        return url; 
    }

    this.setUrl = function (newUrl) {
        url = newUrl;
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
    
    this.getBibliography = function () {
        return bibliography.getReferences(); 
    }

    this.getReferences = function () {
        return references;
    }
    
    this.addReference = function (reference) {
        references.push(reference.getId());
        bibliography.addReference(reference);
    }

    this.removeReference = function (reference) {
        references.splice(references.indexOf(reference.getId()), 1);
        bibliography.removeReference(reference);
    }
}

module.exports = List;
