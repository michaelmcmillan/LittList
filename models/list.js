var Harvard = require('../bibliographies/harvard/harvard.js');
var crypto = require('crypto');

function List (bibliography) {
    
    var id;
    var url = crypto.randomBytes(5).toString('hex');
    var bibliography;
    var user;
    var created = new Date();

    if (bibliography !== undefined
    && (bibliography instanceof Harvard === false))
        throw new Error ('Provided bibliography is not a valid type.');

    this.getId = function () {
        return id; 
    }

    this.setId = function (newId) {
        id = newId;
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
}

module.exports = List;
