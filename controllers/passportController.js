
const isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated()) {
        return next();
    }
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/users/login');
}

const isNotAuthenticated = function(req, res, next){
    if (req.isAuthenticated()) {
        return res.redirect('/home');
    }
    // if the user is not authenticated then redirect him to the login page
    next();
}

const logoutUser =  function(req,res){
    req.logout();
    res.redirect('/');
}

module.exports = {
    isAuthenticated,
    isNotAuthenticated,
    logoutUser
};
