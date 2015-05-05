var bcrypt = require('bcryptjs');

function User () {

    var id;
    var email;
    var password;
    var lists = [];
    
    this.getId = function () {
        return id;
    }

    this.setId = function (newId) {
        id = newId;
    }

    this.getEmail = function () {
        return email;
    }

    this.setEmail = function (newEmail) {
        if (email !== undefined)
            throw new Error('E-posten er allerede satt.');
        
        if (newEmail.indexOf('@') === -1)
            throw new Error('Mangler alfakrøll i e-postadressen.');

        email = newEmail;
    }

    this.getPassword = function () {
        return password;
    }

    this.setHashedPassword = function (hashedPassword) {
        password = hashedPassword;
    }

    this.setPassword = function (newPassword, done) {
        if (newPassword.length < 7)
            return done(new Error('For kort passord. Minst 7 tegn.'));

        bcrypt.hash(newPassword, 10, function (err, hash) {
            password = hash;
            done();
        });
    }

    this.checkCredentials = function (credentials, done) {
        bcrypt.compare(credentials, password, function (err, res) {
            return done(undefined, (res === true));
        });
    }

    this.addList = function (newList) {
        var self = this;

        if (newList.constructor === Array) {
            newList.forEach(function (singleList) {
                self.addList(singleList); 
            });
        } else {
            lists.forEach(function (list) {
                if (list.getId() === newList.getId())
                    throw new Error('Duplikat av liste for bruker.');
            });

            lists.push(newList);
        }
    }

    this.removeList = function (listToRemove) {
        lists = lists.filter(function (list) {
            return (list.getId() !== listToRemove.getId());
        });
    }

    this.getLists = function () {
        return lists;
    }
}

module.exports = User;
