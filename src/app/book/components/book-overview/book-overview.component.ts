import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookDetailsComponent} from '../book-details/book-details.component';
import {Book} from '../../model';

@Component({
  selector: 'ba-book-overview',
  standalone: true,
  imports: [CommonModule, BookDetailsComponent],
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent {
  books: Book[];
  selectedBook: Book | null = null;

  constructor() {
    this.books = [
      {
        id: 0,
        author: 'Douglas Crockford',
        title: 'JavaScript. The Good Parts'
      },
      {
        id: 1,
        author: 'Tom Hombergs',
        title: 'Get Your Hands Dirty On Clean Architecture'
      },
      {
        id: 2,
        author: 'Victor Savkin',
        title: 'Angular Router'
      },
      {
        id: 3,
        author: 'Joshua Bloch',
        title: 'Java Effective Programming'
      }
    ];
  }

  selectBook(book: Book) {
    this.selectedBook = book;
  }

  isBookSelected(book: Book) {
    return book === this.selectedBook;
  }

  updateBook(updatedBook: Book) {
    this.books = this.books.map(book => book.id === updatedBook.id ? updatedBook : book);
    this.selectedBook = updatedBook;
  }
}
