import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { AddBookComponent } from './addbook/addbook.component';
import { EditBookComponent } from './editbook/editbook.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'books', component: BooksComponent},
    { path: 'books/:id', component: BooksComponent},
    { path: 'add', component: AddBookComponent},
    { path: 'edit/:id', component: EditBookComponent}
];

export const Routing = RouterModule.forRoot(appRoutes);