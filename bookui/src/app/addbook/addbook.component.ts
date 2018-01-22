import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { BooksService } from '../books/books.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddBookComponent implements OnInit {
  genres:Array<string>;
  formats:Array<string>;

  constructor(private _service:BooksService, private router:Router) { 
    _service.getGenres().subscribe(data => {this.genres = data});
    _service.getFormats().subscribe(data => {this.formats = data});
  }

  ngOnInit() {
  }

  onSubmit(inputData: any) {
    console.log('Data entered: '+ JSON.stringify(inputData));
    let newBook = {
      title: inputData.title,
      author: inputData.author,
      isbn: inputData.isbn,
      publicationDate: inputData.publicationDate,
      publisher: inputData.publisher,
      price: inputData.price,
      genre: inputData.genre,
      format: inputData.format
    };

    this._service.addBook(newBook).subscribe(resp => {
      this.router.navigate(['books']);
    });
  }
}
