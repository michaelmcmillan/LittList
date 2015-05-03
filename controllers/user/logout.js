var logger      = require('../../log/logger.js');

function UserLogoutController (req, res, next) {
    
    if (req.session.user === undefined)
        return next(new Error('Du er ikke innlogget.')); 

    req.session.user = undefined;
    res.redirect('/');
}

module.exports = UserLogoutController;
