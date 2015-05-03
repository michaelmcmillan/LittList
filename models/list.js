var config = require('../config.js');
var crypto = require('crypto');

function List () {
    
    var id;
    var url = crypto.randomBytes(5).toString('hex');
    var references = [];
    var created = new Date();
    var bibliographyStyle = 'harvard1.csl';

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
        var self = this;
        if (referenceToRemove instanceof Array)
            referenceToRemove.forEach(function (singleReferenceToRemove) {
                self.removeReference(singleReferenceToRemove);
            });
        else
            references = references.filter(function (reference) {
                if (typeof referenceToRemove == "string")
                    referenceToRemove = parseInt(referenceToRemove, 10)

                return reference.getId() !== referenceToRemove;
            });
    }

    this.getBibliographyStyle = function () {
        return bibliographyStyle;
    }

    this.setBibliographyStyle = function (style) {
        if (style.substring(style.length - 4) !== '.csl')
            throw new Error('Style must end with .csl');

        bibliographyStyle = style;
    }

    this.getExpirationDate = function () {
        var lifetime       = config.bibliography.lifetimeInSeconds;
        var lifetimeInMs   = lifetime * 1000;
        var expirationDate = new Date(new Date().getTime() + lifetimeInMs);
        return expirationDate; 
    }

    this.hasExpired = function () {
        return ((this.getCreatedAt() - this.getExpirationDate()) > 0);
    }
}

module.exports = List;
