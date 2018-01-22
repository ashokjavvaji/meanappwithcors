import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { BooksService } from './books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: any;
  book:any;
  id:any = null;
  @ViewChild('bookModal') bookModal:ElementRef;
  modal:Node;
  title = "List of books available in our store";

  constructor( private _booksService:BooksService, private router:Router, private route:ActivatedRoute) { 
    route.params.subscribe(param => {
      this.id=param['id'];
    });
  }

  ngOnInit() {
    this.getBooks();
    this.book = {};
  }

  getBooks() {
    this._booksService.getBooks()
      .subscribe(res => this.books = res);
  }

  deleteBook(id:any){
    console.log('Delete book with id: '+id);
    this._booksService.deleteBook(id)
      .subscribe(res => {
        this.getBooks();
      });
    //this.router.navigate(['books']);
  }

  showDetails(id:any) {
    console.log('ShowDetails for ID: '+id);
    this._booksService.getBook(id)
      .subscribe(data => {
        this.book = data;
        this.bookModal.nativeElement.modal('show');
      });
  }
}

class Books {
  books: Book[];
}

class Book {
  id: number;
  title: string;
  isbn: string;
  publicationDate: Date;
  publisher: string;
  price: number;
  genre: string;
  format: string;
}
