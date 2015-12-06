var bcrypt = require('bcryptjs');

function User () {

    var id;
    var email;
    var encryptedPassword;

    this.register = function (newEmail, newPassword) {
        email = newEmail;     
        ecryptedPassword = bcrypt.hashSync(newPassword);     
        this.save();
    }

    this.checkCredentials = function (email, password) {
    
    }

    this.save = function () {
        return true;  
    }
}
