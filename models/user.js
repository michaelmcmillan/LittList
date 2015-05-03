var bcrypt = require('bcryptjs');

function User () {

    var id;
    var email;
    var password;
    
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
            throw new ('E-posten er allerede satt.');

        email = newEmail;
    }

    this.getPassword = function () {
        return password;
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
}

module.exports = User;
