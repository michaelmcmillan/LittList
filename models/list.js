var crypto = require('crypto');

function List () {
    
    var id;
    var url = crypto.randomBytes(5).toString('hex');
    var references = [];
    var created = new Date();
    var bibliographyStyle = 'harvard1.cls';

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

    this.getBibliographyStyle = function () {
        return bibliographyStyle;
    }

    this.setBibliographyStyle = function (style) {
        if (style.substring(style.length - 4) !== '.cls')
            throw new Error('Style must end with .cls');

        bibliographyStyle = style;
    }
}

module.exports = List;
