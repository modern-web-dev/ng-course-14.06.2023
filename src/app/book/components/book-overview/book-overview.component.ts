import {Component, inject, Injector, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookDetailsComponent} from '../book-details/book-details.component';
import {Book} from '../../model';
import {BookService} from '../../services/book.service';
import {map, Observable, Subscription, tap} from 'rxjs';

@Component({
  selector: 'ba-book-overview',
  standalone: true,
  imports: [CommonModule, BookDetailsComponent],
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss'],
})
export class BookOverviewComponent implements OnDestroy {
  readonly books$: Observable<Book[]>;
  selectedBook: Book | null = null;
  private readonly subscriptions$: Subscription[] = [];

  constructor(private readonly books: BookService) {
    this.books$ = this.books.findAll();
  }

  selectBook(book: Book) {
    this.selectedBook = book;
  }

  isBookSelected(book: Book) {
    return book === this.selectedBook;
  }

  updateBook(bookToUpdate: Book) {
    this.subscriptions$.push(
      this.books.updateBook(bookToUpdate).subscribe(updatedBook => {
        this.selectedBook = updatedBook;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(subscription => subscription.unsubscribe());
  }
}
