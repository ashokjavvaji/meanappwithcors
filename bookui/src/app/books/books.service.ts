import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Book } from '../models/book';
import { Books } from '../models/books';
import 'rxjs/add/operator/map';

@Injectable()
export class BooksService {
  books: any;
  genres:Array<string>;
  formats:Array<string>;

  headers:Headers;
  options:RequestOptions;
  
  constructor(private http:Http) { 
    this.books = new Books();

    this.headers = new Headers();
    this.headers.append('Content-Type','application/json');
    this.options = new RequestOptions({ headers: this.headers });
  
    console.log('Init books service');
  }

  myBooks() {
    console.log("====> Books in service: "+JSON.stringify(this.books));
  }

  getBooks() {
    console.log('getting all books from server');
    return this.http.get('http://localhost:3000/books')
      .map(books => this.books = books.json());
  }

  getBook(id:any) {
    let book:any=null;
    return this.http.get('http://localhost:3000/books/view/'+id)
      .map(resp => book = resp.json());
  }

  getGenres() {
    return this.http.get('http://localhost:3000/books/genres')
      .map(resp => this.genres = resp.json());
  }

  getFormats() {
    return this.http.get('http://localhost:3000/books/formats')
      .map(resp => this.formats = resp.json());
  }

  getBooksCount() {
    return this.books.length;
  }

  addBook(newBook:any) {
    console.log("Book to add from angular: "+JSON.stringify(newBook));
    return this.http.post('http://localhost:3000/books/create', newBook, this.options)
      .map(data => {
        console.log('data back from create: '+JSON.stringify(data.json()));
        this.books = data.json();
      });
  }

  updateBook(updatedBook:any) {
    let book = JSON.stringify(updatedBook);
    console.log("updating book: "+book);
    return this.http.put('http://localhost:3000/books/edit',book, this.options)
      .map(data => {
        console.log('Book Update done: '+JSON.stringify(data.json()));
        this.books = data.json();
      });
  }

  deleteBook(id:any) {
    console.log('delete in ui with id: '+id);
    return this.http.delete('http://localhost:3000/books/delete/'+id)
      .map(resp => this.books = resp.json());
  }
}
