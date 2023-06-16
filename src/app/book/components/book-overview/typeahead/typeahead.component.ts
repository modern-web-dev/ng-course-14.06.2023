import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {debounceTime, map, Observable, switchMap} from "rxjs";
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

  constructor(private readonly books: BookService) {
    this.typeaheadBooks$ = this.typeaheadControl.valueChanges.pipe(
      // filter((query) => query.length > 2),
      debounceTime(500),
      switchMap((query) => this.books.search(query)),
      map((books: Book[]) => books.map(book => `${book.author.firstName} ${book.author.lastName}`))
    )
  }
}
