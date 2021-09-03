var sinon = require('sinon');
var expect = require('chai').expect;
var assert = require('chai').assert;
var should = require('chai').should();
const Book = require('../../models/booksModel');
var async = require("async");

describe('bookAction', function () {

    var id = "5edb6b72b02529e37c2a6b62";

    context("check book's sell", function () {
        it("The book must have a seller", function () {
            async.parallel(
                {
                    book: function (callback) {
                        Book.findById(id, {}).exec(callback);
                    },
                },

                function (err, results) {
                    if (err) {
                        return next(err);
                    } // Error in API usage.
                    if (results.book == null) {
                        // No results.
                        var err = new Error("Book not found");
                        err.status = 404;
                        return next(err);
                    }
                    // Successful, so run test.
                    expect(book.seller).to.be.empty;
                }
            );
        })
    });

    context("check book's price", function () {
        it("The price of book should greater than 0", function () {
            async.parallel(
                {
                    book: function (callback) {
                        Book.findById(id, {}).exec(callback);
                    },
                },
                function (err, results) {
                    if (err) {
                        return next(err);
                    } // Error in API usage.
                    if (results.book == null) {
                        // No results.
                        var err = new Error("Book not found");
                        err.status = 404;
                        return next(err);
                    }
                    // Successful, so run test.
                    expect(book.price).greaterThan(0);
                }
            );
        })
    })
})