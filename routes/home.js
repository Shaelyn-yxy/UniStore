var express = require('express');
var router = express.Router();
var bookController = require('../controllers/booksAction.js');
var userController = require('../controllers/usersAction.js');
const passportController = require('../controllers/passportController');

/* home */
router.get('/', passportController.isAuthenticated, function(req, res, next) {
    res.render('home');
});

router.get('/aboutUs', function(req, res, next) {
    res.render('aboutUs');
});

router.get('/searchPage', passportController.isAuthenticated, function(req, res) {
    res.render('searchPage');
});

// /* search */
router.get('/search', passportController.isAuthenticated,userController.searchBooks);

/* See the details of the book*/
router.get('/book', passportController.isAuthenticated,bookController.showBookDetail);


module.exports = router;