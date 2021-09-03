var userModel = require('../models/usersModel');
var bookModel = require('../models/booksModel');
const bcrypt = require('bcryptjs');
var keyWord = "";


const searchBooks = async function(req, res){
    const errors = [];
    const searchKey = req.query.keywords;
    keyWord = searchKey;
    bookModel.find({ $or: [ {'bookName': {$regex:searchKey,$options:'$i'}},
        {'authorName': {$regex:searchKey,$options:'$i'}},
        {'category': {$regex:searchKey,$options:'$i'}}]
         }).then((docs) => {
        if( docs.length <= 0){
            errors.push("Sorry no books found");
            docs = [];
        }
        res.render('search', {list: docs, errors: errors});
    });

};


/** add the book into the favorite book list*/
const addFavorBooks = async function (req,res){
    const bookId = req.query.id;
    await userModel.updateOne({userName: req.user.userName}, {$addToSet: {favoriteBooks: bookId,}});
    res.redirect('/home/search?keywords=' + keyWord);
};

/**  This function could demonstrate the books in the current user's favorite book list */
const showFavorBooks = async function (req, res, next) {
    userModel.find({userName: req.user.userName}).populate('favoriteBooks').then((docs) => {
        res.render('favorite', {list: docs[0].favoriteBooks, user: req.user.userName})
    })
};

/** This function could demonstrate the books that the user has uploaded */
const showUploadBooks =  function (req, res, next) {
    bookModel.find({seller: req.user.userName}).then((docs) => {
        res.render('booksOnSale', {list: docs, user: req.user.userName})
    })
};

/** This function could remove a book from current user's favorite book list */
var removeFavorBooks = async function(req, res, next) {
    const bookId = req.query.id;
    await userModel.update({userName: req.user.userName}, {$pull: {favoriteBooks: bookId,}});
    res.redirect('/users/favorite?username=' + req.user.userName)
}



/** This function would render the users page if the user is already login,
    Otherwise it would redirect to the login page */
const showUserPage = async function (req, res) {
    try{
        const user = await userModel.findOne({userName: req.user.userName});
        console.log(user);
        if (!user) {
            res.status(400);
            console.log("user not found");
        }
        res.render('profile', {userObject: user, user: user.userName } );

    } catch (err) {
        res.status(400);
        console.log(err);
        return res.send("Database query failed");
    }


};

const updateUser = async function (req, res) {
        // var user = req.body.username;

        let errors = [];


        if (req.body.password.length < 6) {
            errors.push({ msg: 'Password must be at least 6 characters' });
        }
        if(errors.length>0){
            res.render('edit',{user:req.user.userName, errors:errors});
        } else {
            try {
                const user = await userModel.findOne({userName: req.user.userName});
                console.log(user);
                if (!user) {
                    res.status(400);
                    console.log("user not found");
                }


                user["firstName"] = req.body.firstName;
                user["lastName"] = req.body.lastName;
                user["password"] = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null);
                console.log("Updated ", user);
                await user.save();
                res.redirect('/users')

            } catch (err) {
                res.status(400);
                console.log(err);
                return res.send("Database query failed");
            }
        }
};

const showEditProfile = function(req,res) {
    res.render('edit', {user: req.user.userName, errors:[]});
};




module.exports ={
    addFavorBooks,
    showFavorBooks,
    showUploadBooks,
    showUserPage,
    removeFavorBooks,
    searchBooks,
    updateUser,
    showEditProfile
};
