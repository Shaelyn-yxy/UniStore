// import React from 'react';
// import ReactDom from 'react-dom';
// const myh1 = React.createElement('h1', 'null', 'test hello');

var express = require('express');
var router = express.Router();
const passportController = require('../controllers/passportController');

/* choose login/register */
router.get('/', function(req, res, next) {
  res.render('welcome', { title: 'Uni-store' });
});

// log out the user
router.get('/logout', passportController.isAuthenticated, passportController.logoutUser);



module.exports = router;
