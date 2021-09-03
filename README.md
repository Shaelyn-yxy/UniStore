# Uni-Store

Member(Unimelb):
Xinyi YUAN
Chun-Wen Cheng
Chenwei Niu 1017772
Tianze Liu 987969


Description: Website entry page URL
+ URL Structure:
https://uni-store.herokuapp.com

### To run in local machine

Install Node.js then install the dependencies using the command
```
npm install 
npm start
```
`Access the app on 'localhost:3000'`

To run the unit testing
```
npm test 
```

### Test route：
Tutor could follow this process to test our website.
1. First tester could register a new account by clicking Register button on our welcome page, when tester register successful, the page will redirect to login page. 
2. When tester enter our home page, you can search any books in our search bar, if tester does not enter any key words, and just click 'GO', it will show all books that we have.
3. For each book section, there are two buttons,‘Add to favorite list’ and 'contact seller'. Tester could add this book to your favorite list, or you can get seller's information of this book.
4. In our navgation bar, tester could click 'UserPage' to enter this page. In this section, tester could 'upload a book', 'show books that uploaded by tester' and 'show your favorite book list'.
5. There is an about Us page, tester can look this page to get some ideas of our website.

## Features 1 - Authentication
##### Function 1 - register
Description: Add a new user to the data base 
* URL Structure: 
    > https://uni-store.herokuapp.com/users/register
* Method: 
  > Post Request 
* Parameters:
    > ```
    > {
    >   firstName : “TestName”,
    >   lastName : “TestLastName”,
    >   email : “test@test.com”,
    >   userName : “TestUserName”,
    >   password : “TestPassword”
    > }
    >  ```
* Returns:
    > ```
    > {
    >   “Message" : “Success"
    > }
    >  ```
* Errors:
    > ```
    > {
    >   “Message” :“Error”,
    >   “error1” : “Password should at least 6 character."
    >   “error2” : “This username is already been registered.
    > }
    >  ```
##### Function 2 - login 
Description: User could login by email address and password for our website
* URL Structure: 
    > https://uni-store.herokuapp.com/users/login
* Method: 
  > Post Request 
* Parameters:
    > ```
    > {
    >   “userName" : “TestUserName”,
    >   “password" : “TestPassword”
    > }
    >  ```

* Returns:
    > ```
    > {
    >   “Message" : “Success"
    > }
    >  ```

* Error - failed to login:
    > ```
    > {
    >   “Message” :“Error”,
    >   “error_summary” : “User not found."
    >   “error_summary” : “Invalid password."
    > }
    >  ```

##### Function 3 - logout 
Description: User can log out.
* Method: 
  > Get Request 
* Parameters:
    > ```
    > {
    >   “userName" : “TestUserName”,
    > }
    >  ```

##### Function 4 - updateUser
Description: in user page, user could update his/her first name, last name and password.
* Method: 
  > Post Request 
* Parameters:
    > ```
    > {
    >   firstName : “TestName”,
    >   lastName : “TestLastName”,
    >   password : “TestPassword”
    > }
    >  ```
* Returns:
    > ```
    > {
    >   “Message" : “Success"
    > }
    >  ```


## Features 2 - Upload/delete books
##### Function 1 - createBooks
Description: User can upload books on our website to sell.
* URL Structure: 
    > https://uni-store.herokuapp.com/users/insert?username=TestUserName
(Tutor can use this url to upload a book)
* Method: 
  > Post Request 
* Parameters:
    > ```
    > {
    >   bookName : “bookName”,
    >   authorName : “authorName”,
    >   category : “category”,
    >   price : “price”,
    >   seller : “seller”
    >   description: "description"
    >   image: "the url of image"
    > }
    >  ```
* Returns:
    > ```
    > {
    >   “Message" : “Success to upload a book."
    > }
    >  ```

##### Function 2 - deleteBooks
Description: When some students finish purchasing the book, seller should delet this book from our website.
* URL Structure: 
    > https://uni-store.herokuapp.com/users/booksOnSale?seller=TestUserName
(Tutor can delet existing books which uploaded by user.)
* Method: 
  > Get Request 
* Parameters:
    > ```
    > {
    >   bookId : book.id,
    > }
    >  ```



## Features 3 - Add books to Favorite List
##### Function 1 - addFavorBooks
Description: User can choose favorite books and add them into Favorite List.
* URL Structure: 
    > https://uni-store.herokuapp.com/home/search?keywords=
(Tutor can use this url to find all the books we have, and for each book there is a button you can click and add this book to your favorite list.)
* Method: 
  > Get Request 
* Parameters:
    > ```
    > {
    >   bookId : book.id,
    > }
    >  ```


##### Function 2 - showFavorBooks
Description: User could view his/her favorite books on userpage.
* URL Structure: 
    > https://uni-store.herokuapp.com/users/favorite?username=TestUserName
(Tutor can use this url to see TestUserName's favorite books.)
* Method: 
  > Get Request
    > ```
    > {
    >   name : userName
    > }
    >  ```

##### Function 3 - removeFavorBooks
Description: User could remove his/her favorite books from list.
* URL Structure: 
    > https://uni-store.herokuapp.com/users/favorite?username=TestUserName
(For each books there is a button for user to remove books form ther favorite list, tutor can click that button to test.)
* Method: 
  > Get Request
    > ```
    > {
    >   bookId : book.id,
    > }
    >  ```



## Features 4 - Show transcation page to contact seller
Description: User could get seller's contact details 
##### Function 1 - showBookDetail
* URL Structure: 
    > https://uni-store.herokuapp.com/home/search?keywords=
(For each books there is a button that could show seller's detail, and if current user is interested on this book, user could find seller's email and contact to seller.)
* Method: 
  > Get Request
* Parameters:
    > ```
    > {
    >   bookId: book.id
    > }
    >  ```


## Features 5 - Search books
##### Function 1 - findAllBooks
Description: If user dose not type any kewwords and press search button it will show all books in our website.
* URL Structure: 
    > https://uni-store.herokuapp.com/home
* Method: 
  > Get Request
* Parameters:
    > ```
    > {
    >   s_key: ""
    > }
    >  ```


##### Function 2 - searchBooks
Description: Search books by key words
* URL Structure: 
    > https://uni-store.herokuapp.com/home 
(For example, if tutor types 'web' in search bar, it will show all the books with keyword 'web'.)
* Method: 
  > Get Request
* Parameters:
    > ```
    > {
    >   s_key: "keywords"
    > }
    >  ```
* Error - failed to find the book:
    > ```
    > {
    >   “Message” :“Error”,
    >   “error_summary” : “Sorry this book is not found."
    > }
    >  ```


## Features 6 - Unit testing
#### Section 1 book.unit.test: 
#### 1. check book's sell - The book must have a seller
* Method: 
  > Get Request
* Parameters:
    > ```
    > {
    >   book: "book.seller"
    > }
    >  ```
* Error - failed to find the book:
    > ```
    > {
    >   “Message” :“Error”,
    >   “error_summary” : “Book not found."
    > }
    >  ```
#### 2.check book's price - The price of book should greater than 0
* Method: 
  > Get Request
* Parameters:
    > ```
    > {
    >   book: "book.price"
    > }
    >  ```
* Error - failed to find the book:
    > ```
    > {
    >   “Message” :“Error”,
    >   “error_summary” : “Book not found."
    > }
    >  ```

#### Section 2 user.unit.test: 
#### 1.check one user's password - password should be longer than 6 characters
* Method: 
  > Get Request
* Parameters:
    > ```
    > {
    >   user: "book.password"
    > }
    >  ```
* Error - failed to find the User:
    > ```
    > {
    >   “Message” :“Error”,
    >   “error_summary” : “User not found."
    > }
    >  ```

#### Section 3 user.integration.test: 
#### 1.check visiting login page - login page
* Method: 
  > Get Request

#### 1.check if use could register successfully - register page
* Method: 
  > Post Request 
* Parameters:
    > ```
    > {
    >   firstName : “matt”,
    >   lastName : “ll”,
    >   email : “matt@student.unimelb.edu.au”,
    >   password : “123456”
    > }
    >  ```
* Returns:
    > ```
    > {
    >   “Message" : “Success"
    > }
    >  ```





