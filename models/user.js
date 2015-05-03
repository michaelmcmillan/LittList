var bcrypt = require('bcryptjs');

function User () {

    var id;
    var email;
    var password;
    var salt;
    
    this.getId = function () {
        return id;
    }

    this.getSalt = function () {
        return salt;
    }

    this.setSalt = function (newSalt) {
        salt = newSalt;
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

        bcrypt.genSalt(10, function (err, newSalt) {
            salt = newSalt;
            bcrypt.hash(newPassword, salt, function (err, hash) {
                password = hash;
                done();
            });
        });
    }
}

module.exports = User;
