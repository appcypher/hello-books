'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBooks = getBooks;
exports.addBook = addBook;
exports.getUserBooks = getUserBooks;
exports.modifyBook = modifyBook;
exports.borrowBook = borrowBook;
exports.returnBook = returnBook;
exports.createNotif = createNotif;
exports.getUserNotifs = getUserNotifs;

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _models2.default.User,
    Book = _models2.default.Book,
    BorrowDetail = _models2.default.BorrowDetail,
    Notification = _models2.default.Notification,
    Sequelize = _models2.default.Sequelize;

/**
 * Return an array of all books in the database
 * @param{Object} req - api request
 * @param{Object} res - route response
 * @return{undefined}
 */

function getBooks(req, res) {
  return Book.all().then(function (books) {
    return res.status(200).send(books);
  }).catch(function (err) {
    return res.status(404).send(err.errors[0].message + '!');
  });
}

/**
 * Add book details specified in request to the database
 * @param{Object} req - api request
 * @param{Object} res - route response
 * @return{undefined}
 */
function addBook(req, res) {
  return Book.create({
    title: req.body.title,
    isbn: req.body.isbn,
    year: req.body.year,
    author: req.body.author,
    description: req.body.description,
    count: req.body.count
  }).then(function (book) {
    return res.status(200).send(book);
  }).catch(function (err) {
    return res.status(400).send(err.errors[0].message + '!');
  });
}

/**
 * Get the list of a user's borrowed but unreturned books
 * @param{Object} req - api request
 * @param{Object} res - route response
 * @return{undefined}
 */
function getUserBooks(req, res) {
  return BorrowDetail.findAll({
    where: {
      userid: req.params.userId,
      returndate: null
    }
  }).then(function (books) {
    return res.status(200).send(books);
  }).catch(function (err) {
    return res.status(400).send(err.errors[0].message + '!');
  });
}

/**
 * Modify book information already in database
 * @param{Object} req - api request
 * @param{Object} res - route response
 * @return{undefined}
 */
function modifyBook(req, res) {
  return Book.update({
    title: req.body.title || Book.title,
    isbn: req.body.isbn || Book.isbn,
    year: req.body.year || Book.year,
    author: req.body.author || Book.author,
    description: req.body.description || Book.description,
    count: req.body.count || Book.count
  }, {
    where: {
      id: req.params.bookId
    }
  }).then(function (book) {
    return res.status(200).send(book[0] === 1 ? 'Book update successful!' : 'Book update not successful!');
  }).catch(function (err) {
    return res.status(400).send(err.errors[0].message + '!');
  });
}

/**
 * Gives user access to a book if available
 * @param{Object} req - api request
 * @param{Object} res - route response
 * @return{undefined}
 */
function borrowBook(req, res) {
  return BorrowDetail.create({
    booktitle: req.body.booktitle,
    borrowdate: Date.now(),
    userid: req.params.userId
  }).then(function (borrowdetail) {
    return res.status(200).send(borrowdetail);
  }).catch(function (err) {
    return res.status(400).send(err.errors[0].message + '!');
  });
}

/**
 * Marks a book as returned in a user borrow history
 * @param{Object} req - api request
 * @param{Object} res - route response
 * @return{undefined}
 */
function returnBook(req, res) {
  return BorrowDetail.update({
    returndate: Date.now(),
    userid: req.params.userId
  }, {
    where: {
      userid: req.params.userId
    }
  }).then(function (borrowdetail) {
    return res.status(200).send(borrowdetail[0] === 2 ? 'Book returned successfully!' : 'Book not returned!');
  }).catch(function (err) {
    return res.status(400).send(err.errors[0].message + '!');
  });
}

// For test purpose only
function createNotif(req, res) {
  return Notification.create({
    sender: req.body.sender,
    reciever: req.body.reciever,
    message: req.body.message,
    sentdate: Date.now(),
    userid: req.body.userid
  }).then(function (notif) {
    return res.status(200).send(notif);
  }).catch(function (err) {
    return res.status(400).send(err.errors[0].message + '!');
  });
}

// For test purpose only
function getUserNotifs(req, res) {
  var idParam = req.params.userId;
  return Notification.findAll({
    where: { userid: idParam }
  }).then(function (notifs) {
    return res.status(200).send(notifs);
  }).catch(function (err) {
    return res.status(400).send(err.errors[0].message + '!');
  });
}