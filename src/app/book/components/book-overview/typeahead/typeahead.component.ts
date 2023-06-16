import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {debounceTime, filter, map, merge, Observable, switchMap, tap} from "rxjs";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Book} from "../../../model";
import {BookService} from "../../../services/book.service";

@Component({
  selector: 'ba-typeahead',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss']
})
export class TypeaheadComponent {
  typeaheadControl = new FormControl('', {nonNullable: true});
  typeaheadBooks$: Observable<string[]>;
  loading = false;

  constructor(private readonly books: BookService) {
    const emptyBooks$ = this.typeaheadControl.valueChanges.pipe(
      filter((query) => query.length === 0),
      map((books: string): string[] => []),
    );

    const newBooks$ = this.typeaheadControl.valueChanges.pipe(
      filter((query) => query.length > 0),
      tap(() => this.loading = true),
      debounceTime(500),
      switchMap((query) => this.books.search(query)),
      map((books: Book[]) => books.map(book => `${book.author.firstName} ${book.author.lastName}`)),
      tap(() => this.loading = false),
    );


    this.typeaheadBooks$ = merge(emptyBooks$, newBooks$)
  }
}
