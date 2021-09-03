var express = require('express');
const passport = require('passport')
var router = express.Router();
var userController = require('../controllers/usersAction.js');
var bookController = require('../controllers/booksAction.js');
const passportController = require('../controllers/passportController');






module.exports = function(passport) {

    /* GET users listing. */
    router.get("/", passportController.isAuthenticated, userController.showUserPage);

    // Login page
    router.get("/login", passportController.isNotAuthenticated,function (req, res) {
        res.render("login", {errors: ''});
    });

    // Register page
    router.get("/register", function (req, res) {
        res.render("register", {errors: ''});
    });

    router.get('/insert', passportController.isAuthenticated,function (req, res, next) {
        res.render('insert', {user: req.query.username, errors: ''});
    });

    // add favourite book
    router.get('/addFav', passportController.isAuthenticated,userController.addFavorBooks);

    // show favourite book list
    router.get('/favorite', passportController.isAuthenticated,userController.showFavorBooks);

    // show upload_book book list
    router.get('/booksOnSale', passportController.isAuthenticated,userController.showUploadBooks);

    // delete a book from favourite book list
    router.get('/deleteFav', passportController.isAuthenticated,userController.removeFavorBooks);

    // delete a book from database
    router.get('/deleteBooks', passportController.isAuthenticated,bookController.deleteBooks);


    router.get('/edit', passportController.isAuthenticated, userController.showEditProfile);

    // login handle
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/users/login',
        failureFlash : true
    }));


    // upload a book
    router.post('/insertBook', bookController.createBook);

    // register handle
    router.post('/register', passport.authenticate('register', {
        successRedirect: '/home',
        failureRedirect: '/users/register',
        failureFlash : true
    }));

    router.post('/edit', passportController.isAuthenticated, userController.updateUser);


    return router;
};
//module.exports = router;



