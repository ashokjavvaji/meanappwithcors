"use strict";
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

var books = [];
var genres = ['Action', 'Sci-Fi','Adventure', 'Education'];
var formats = ['Paper Back', 'Kindle Edition', 'PDF Edition'];
var _ = require('lodash');

var currentID = 0;
var _clone = function(item) {
	return JSON.parse(JSON.stringify(item));
};

//Connect to MongoDB
const dbConn = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017',(err,db) => {
        if(err) return console.log(err);
        
        closure(db);
    });
};

var BooksApi = {
    getAllBooks: function(callback) {
        dbConn((db) => {
            db.db('books').collection('books')
                .find()
                .toArray()
                .then((books) => {
                    this.books = _clone(books);
                    callback(null, this.books);
                })
                .catch((err) => {
                    console.log('Error reading books: '+JSON.stringify(err));
                    callback(null,[]);
                });
        });
    },
    getBooks: function() {
        return this.books;
    },
    getGenres: function() {
        return genres;
    },
    getFormats: function() {
        return formats;
    },
    getBookById: function(bookID, callback) {
        var book = {};
        var query = {_id: parseInt(bookID)};
        dbConn((db) => {
            db.db('books').collection('books')
                .findOne(query)
                .then((value) => {
                    book = _clone(value);
                    callback(null, book);
                })
                .catch((err) => {
                    console.log('Error searching books DB with ID: '+bookID+' Error: '+JSON.stringify(err));
                    callback(null,[]);
                });
        });
    },
    updateBookById: function(bookID, book, callback) {
        var query = {_id: parseInt(book._id)};
        dbConn((db) => {
            db.db('books').collection('books')
                .findOneAndReplace(query, book)
                .then((value) => {
                    book = _clone(value);
                    callback(null, book);
                })
                .catch((err) => {
                    console.log('Error updating books DB with ID: '+bookID+' Error: '+JSON.stringify(err));
                    callback(null,[]);
                });
        });
    },
	saveBook: function(book, callback) {
        //get the current record count
        console.log('in save booksapi');
        var count = 0;
        dbConn((db) => {
            //const bookDB = db.db('books');
            db.db('books').collection('books')
                .find().sort({'_id':-1}).toArray()
                .then((value) => {
                    count = value[0]._id;
                    console.log("Max Book ID: "+value[0]._id);
                    count++;
                    //save the book
                    book._id = count;
                    dbConn((db) => {
                        db.db('books').collection('books')
                            .insert(book, function(err, result){
                                if(err) {
                                    console.log('Error inserting book: '+JSON.stringify(err));
                                }
                                callback(null,'Record Inserted');
                            });
                    });
                })
                .catch((err) => {
                    console.log('Error reading books DB: '+JSON.stringify(err));
                    callback(null,[]);
                });
        });
    },

	deleteBookById: function(id, callback) {
        var query = {_id: parseInt(id)};
        dbConn((db) => {
            db.db('books').collection('books')
                .findOneAndDelete(query, function(err, result){
                    if(err) {
                        console.log('Error deleting the document with ID: '+id);
                    }
                    callback(null, []);
                });
        });
	}
};

module.exports = BooksApi;
