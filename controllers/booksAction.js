var mongoose = require('mongoose');
var bookModel = require('../models/booksModel');
var userModel = require('../models/usersModel');

/**
 *  create new book in 'bookList' collection
 */

const createBook = async function(req, res, next) {
    console.log(req.body.description);
    var item = {
        bookName: req.body.bookName,
        authorName: req.body.authorName,
        category: req.body.category,
        price: req.body.price,
        seller: req.user.userName,
        description: req.body.description,
        image: req.body.image
    };
    var data = new bookModel(item);
    data.save();
    res.redirect('/users');

};


/** show book details and the seller's E-mail*/
const showBookDetail = function(req, res){
    const bookId = req.query.id;
    bookModel.find({_id: bookId}).then((docs) => {
        userModel.findOne({userName: docs[0].seller}, function(err, result){
            if (err) throw err;
            console.log(docs);
            res.render('bookDetail', {list: docs, user: result})
        });

    });
};

/** This function enables the user to delete his uploaded book from the database  */
var deleteBooks = async function(req, res, next) {
    const bookId = req.query.id;
    bookModel.findByIdAndDelete(bookId).exec();
    res.redirect('/users/booksOnSale?seller=' + req.user.userName);
}

/** This function enables the user to update the details of his uploaded book */
const updateBook = async function (req, res) {
    const bookId = req.body.id;
    try{
        const book = await bookModel.find({_id: bookId});
        if (!book) {
            res.status(400);
            console.log("book not found");
        }
        book[0]["bookName"] = req.body.bookName;
        book[0]["authorName"] = req.body.authorName;
        book[0]["category"] = req.body.category;
        book[0]["price"] = req.body.price;

        console.log("Updated ", book[0]);
        await book[0].save();
        res.redirect('/users')
    } catch (err) {
        res.status(400);
        console.log(err);

    }
};

module.exports = {
    createBook,
    showBookDetail,
    deleteBooks,
};

