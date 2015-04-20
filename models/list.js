var crypto = require('crypto');

function List () {
    
    var id;
    var url = crypto.randomBytes(5).toString('hex');
    var references = [];
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

    this.getUrl = function () {
        return url; 
    }

    this.getCreatedAt = function () {
        return created; 
    }

    this.getReferences = function () {
        return references;
    }
    
    this.addReference = function (reference) {
        var self = this;

        if (reference.constructor === Array) {
            reference.forEach(function (ref) {
                self.addReference(ref);
            });
        } else {
            references.push(reference);
        }
    }

    this.removeReference = function (referenceToRemove) {
        references = references.filter(function (reference) {
            return reference.getId() !== referenceToRemove;
        });
    }
}

module.exports = List;
