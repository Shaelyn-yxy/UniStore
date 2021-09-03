var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var userSchema = new Schema({

    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    userName: {type: String, required: true},
    password: {type: String, required: true},
    favoriteBooks: [{type: ObjectId, ref:'books'}]

}, {collection: 'userList'});

module.exports = mongoose.model('users', userSchema);