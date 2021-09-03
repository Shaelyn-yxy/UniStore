var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({

    bookName: {type: String, required: true},
    authorName: {type: String, required: true},
    category: {type: String, required: true},
    price: {type: String, required: true},
    seller: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true}

}, {collection: 'bookList'});


module.exports = mongoose.model('books', bookSchema);