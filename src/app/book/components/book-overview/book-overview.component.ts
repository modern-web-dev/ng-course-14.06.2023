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
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'ba-book-overview',
  standalone: true,
  imports: [CommonModule, BookDetailsComponent],
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss'],
})
export class BookOverviewComponent {
  readonly books$: Observable<Book[]>;

  constructor(private readonly books: BookService,
              private readonly router: Router,
              private readonly currentRoute: ActivatedRoute) {
    this.books$ = this.books.findAll();
  }

  goToDetailsOf(book: Book) {
    this.router.navigate([book.id], {relativeTo: this.currentRoute});
  }
}
