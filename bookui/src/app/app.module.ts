import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { Routing } from './app.routing';

import { BooksComponent } from './books/books.component';
import { BooksService } from './books/books.service';
import { HomeComponent } from './home/home.component';
import { BookFilterPipe } from './books/books-filter.pipe';
import { AddBookComponent } from './addbook/addbook.component';
import { EditBookComponent } from './editbook/editbook.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    HomeComponent,
    BookFilterPipe,
    AddBookComponent,
    EditBookComponent
  ],
  imports: [BrowserModule, FormsModule, Routing, HttpModule],
  providers: [BooksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
