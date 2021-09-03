var mongoose = require('mongoose');

const uri = "mongodb+srv://yxy:yxy@cluster0-pumuc.mongodb.net/test?retryWrites=true&w=majority";
// mongodb+srv://Matthew:iloveuni@cluster0-vsn0o.mongodb.net/test?retryWrites=true&w=majority
// mongodb+srv://yxy:yxy@cluster0-pumuc.mongodb.net/test?retryWrites=true&w=majority

mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true},
    function(err){
        if(!err){
            console.log('Connected to mongo.');
        }else{
            console.log('Failed to connect to mongo!', err);
        }
    });

require('./usersModel.js');
require('./booksModel.js');