import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookDetailsComponent} from '../book-details/book-details.component';
import {Book} from '../../model';
import {BookService} from '../../services/book.service';
import {debounceTime, filter, map, Observable, Subscription, switchMap} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'ba-book-overview',
  standalone: true,
  imports: [CommonModule, BookDetailsComponent, ReactiveFormsModule],
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss'],
})
export class BookOverviewComponent {
  readonly books$: Observable<Book[]>;

  typeaheadControl = new FormControl('default wartość', {nonNullable: true});
  typeaheadBooks$: Observable<string[]>;

  constructor(private readonly books: BookService,
              private readonly router: Router,
              private readonly currentRoute: ActivatedRoute) {
    this.books$ = this.books.findAll();
    this.typeaheadBooks$ = this.typeaheadControl.valueChanges.pipe(
      // filter((query) => query.length > 2),
      debounceTime(500),
      switchMap((query) => this.books.search(query)),
      map((books: Book[]) => books.map(book => book.author))
    )

  }


  goToDetailsOf(book: Book) {
    this.router.navigate([book.id], {relativeTo: this.currentRoute});
  }
}
