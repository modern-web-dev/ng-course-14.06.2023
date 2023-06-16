import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Book} from '../../model';
import {BookService} from '../../services/book.service';
import {debounceTime, filter, map, Observable, Subscription, switchMap} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ReactiveFormsModule} from "@angular/forms";
import {BookTableComponent} from "./book-table/book-table.component";
import {TypeaheadComponent} from "./typeahead/typeahead.component";
import {CardPanelComponent} from "./card-panel/card-panel.component";

@Component({
  selector: 'ba-book-overview',
  standalone: true,
  imports: [CommonModule, BookTableComponent, ReactiveFormsModule, TypeaheadComponent, CardPanelComponent],
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
    void this.router.navigate([book.id], {relativeTo: this.currentRoute});
  }
}
