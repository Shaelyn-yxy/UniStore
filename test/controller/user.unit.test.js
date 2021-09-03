var sinon = require('sinon');
var expect = require('chai').expect;
var assert = require('chai').assert;
var should = require('chai').should();
const User = require('../../models/usersModel');
var async = require("async");

describe('usersAction', function () {

    var id = "5edb6aa8b02529e37c2a6b60";

    context("check one user's password", function () {
        it("password should be longer than 6 characters", function () {
            async.parallel(
                {
                    user: function (callback) {
                        User.findById(id, {}).exec(callback);
                    },
                },
                function (err, results) {
                    if (err) {
                        return next(err);
                    } // Error in API usage.
                    if (results.user == null) {
                        // No results.
                        var err = new Error("User not found");
                        err.status = 404;
                        return next(err);
                    }
                    // Successful, so run test.
                    expect(user.password).to.have.length.greaterThan(6);
                }
            );
        })
    })
})