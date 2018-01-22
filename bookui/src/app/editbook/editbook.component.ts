import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { BooksService } from '../books/books.service';
import { Book } from '../models/book';

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.css']
})
export class EditBookComponent implements OnInit {

  id: any;
  book: any = {};
  genres:string[] = [];
  formats:string[] = [];

  constructor(private service:BooksService, private router:Router, private route:ActivatedRoute) {
    service.getGenres().subscribe(data => {this.genres = data});
    service.getFormats().subscribe(data => {this.formats = data});
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.id=+params['id'];
    });
    this.service.getBook(this.id)
      .subscribe(data => {
        this.book._id = data._id;
        this.book.title = data.title || "";
        this.book.author = data.author || "";
        this.book.isbn = data.isbn || "";
        this.book.publicationDate = data.publicationDate || "";
        this.book.publisher = data.publisher || "";
        this.book.price = data.price || 0;
        this.book.genre = data.genre || "";
        this.book.format = data.format || "";
      });
  }

  onSubmit(inputData:any) {
    let updatedBook = {
      _id: this.id,
      title: this.book.title,
      author: this.book.author,
      isbn: this.book.isbn,
      publicationDate: this.book.publicationDate,
      publisher: this.book.publisher,
      price: this.book.price,
      genre: this.book.genre,
      format: this.book.format
    };
    console.log("input data for update : "+JSON.stringify(inputData));
    console.log('sending data to update: '+JSON.stringify(updatedBook));
    this.service.updateBook(updatedBook).subscribe(data => {
      this.router.navigate(['books']);
    });
  }
}
