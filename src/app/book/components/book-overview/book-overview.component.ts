import {AfterViewInit, Component, DestroyRef, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookDetailsComponent} from '../book-details/book-details.component';
import {Book} from '../../model';
import {BookService} from '../../services/book.service';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  Observable,
  OperatorFunction,
  Subject,
  switchMap,
  takeUntil
} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'ba-book-overview',
  standalone: true,
  imports: [CommonModule, BookDetailsComponent],
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss'],
})
export class BookOverviewComponent implements AfterViewInit {
  @ViewChild('search')
  searchInput: ElementRef | undefined;
  searchResults$: Observable<string[]> | undefined;

  readonly books$: Observable<Book[]>;
  selectedBook: Book | null = null;
  // private readonly subscriptions$: Subscription[] = [];
  // private readonly unsubscribe$ = new Subject<void>();

  constructor(private readonly books: BookService,
              private readonly destroyRef: DestroyRef) {
    this.books$ = this.books.findAll();
  }

  selectBook(book: Book) {
    this.selectedBook = book;
  }

  isBookSelected(book: Book) {
    return book === this.selectedBook;
  }

  updateBook(bookToUpdate: Book) {
    // this.subscriptions$.push(
      this.books.updateBook(bookToUpdate)
        .pipe(
          // takeUntil(this.unsubscribe$),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe(updatedBook => {
        this.selectedBook = updatedBook;
      })
    // );
  }

  // ngOnDestroy(): void {
  //   // this.subscriptions$.forEach(subscription => subscription.unsubscribe());
  //   this.unsubscribe$.next();
  //   this.unsubscribe$.complete();
  //
  // }

  ngAfterViewInit(): void {
    const searchInputElement = this.searchInput?.nativeElement as HTMLInputElement;
    this.searchResults$ = fromEvent(searchInputElement, 'input')
      .pipe(
        debounceTime(500),
        mapFromEventToTargetValue(),
        distinctUntilChanged(),
        switchMap(query => this.books.search(query))
      )
  }
}

function mapFromEventToTargetValue(): OperatorFunction<Event, string> {
  return map(event => {
    const input = event.target as HTMLInputElement;
    return input.value;
  })
}
