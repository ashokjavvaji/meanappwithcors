var BooksApi = require('../data/BooksApi');
var Book = require('../data/Book');
var express = require('express');
var router = express.Router();

var genresList=[];
var formatsList=[];
var book = {};

router.get('/', function(req, res) {
    BooksApi.getAllBooks(function(err, items) {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(items));
    });
});

router.get('/genres', function(req,res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(BooksApi.getGenres()));
});

router.get('/formats', function(req,res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(BooksApi.getFormats()));
});

router.post('/create', function(req, res) {
  var book = new Book();
  book.title = req.body.title || "";
  book.author = req.body.author || "";
  book.isbn = req.body.isbn || "";
  book.publisher = req.body.publisher || "";
  book.publicationDate = req.body.publicationDate || "";
  book.price = req.body.price || 0;
  book.genre = req.body.genre || "";
  book.format = req.body.format || "";
  BooksApi.saveBook(book, function(err, books) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(books));
  });
});

router.put('/edit', function(req, res) {
  var book = new Book();
  console.log("--> Req Body: "+JSON.stringify(req.body));
  book._id = req.body._id || -1;
  book.title = req.body.title || "";
  book.author = req.body.author || "";
  book.isbn = req.body.isbn || "";
  book.publisher = req.body.publisher || "";
  book.publicationDate = req.body.publicationDate || "";
  book.price = req.body.price || 0;
  book.genre = req.body.genre || "";
  book.format = req.body.format || "";
  BooksApi.updateBookById(book.id, book, function(err, books) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(books));
  });
});

router.delete('/delete/:id', function(req, res) {
  BooksApi.deleteBookById(req.params.id, function(err, books) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(books));
  });
});

router.get('/view/:id', function(req, res) {
  console.log('showing details for book with id: '+req.params.id);
  BooksApi.getBookById(req.params.id, function(err, book) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(book));
  });
});

module.exports = router;
