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
  readonly books: Book[];
  selectedBook: Book | null = null;

  constructor() {
    this.books = [
      {
        author: 'Douglas Crockford',
        title: 'JavaScript. The Good Parts'
      },
      {
        author: 'Tom Hombergs',
        title: 'Get Your Hands Dirty On Clean Architecture'
      },
      {
        author: 'Victor Savkin',
        title: 'Angular Router'
      },
      {
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
}
