const mongoose = require('mongoose');

var LocalStrategy = require('passport-local').Strategy;
var userModel = require('../models/usersModel');
const bcrypt = require('bcryptjs');

//part of code from https://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619

module.exports = function(passport){

    passport.use('register', new LocalStrategy({
            usernameField:'userName',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function( req,username, password, done) {

            findOrCreateUser = function(){
                // find a user in Mongo with provided username
                userModel.findOne({'userName': username}, function(err, user){
                    // In case of any error, return using the done method
                    if (err){
                        console.log('There is an error when register: '+ err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        console.log(user);
                        console.log('User already exists with this Username : '+ username);
                        return done(null, false, {message: 'This Username is already registered'});
                    } else {


                        // check length of password.
                        if(password.length < 6){
                            console.log("Password should at least 6 character");
                            return done(null, false, {message:'The password should ' +
                                    'contain at least 6 characters'});
                        }

                        // if there is no user with that username
                        // create the user
                        var newUser = new userModel();

                        console.log(req.body.userName);
                        console.log(req.body.firstName);
                        console.log(req.body.lastName);
                        // set the user's local credentials
                        newUser.userName = username;

                        newUser.email = req.body.email;
                        newUser.firstName = req.body.firstName;
                        newUser.lastName = req.body.lastName;

                        newUser.password= bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

                        // save the user
                        newUser.save(function(err) {
                            if (err){
                                console.log('An error occurs when saving the user: '+err);
                                throw err;
                            }
                            console.log('The Registration is successful!');
                            return done(null, newUser);
                        });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

}