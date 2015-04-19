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
        references.push(reference);
    }

    this.removeReference = function (reference) {
        var index = references.indexOf(reference);
        if (index >= 0)
            references.splice(index, 1);
    }
}

module.exports = List;
