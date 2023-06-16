import {Component, DestroyRef, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Book, BookProperties} from '../../model';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../../services/book.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

type BookFormType = {
  author: FormControl<string>,
  title: FormControl<string>
}

@Component({
  selector: 'ba-book-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {

  bookForm = new FormGroup<BookFormType>(
    {
      author: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(3)]}),
      title: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(10)]}),
    }
  );

  constructor(
    private readonly books: BookService,
    private readonly router: Router,
    private readonly currentRoute: ActivatedRoute,
    private readonly destroyRef: DestroyRef) {
  }

  _book?: Book;
  @Input()
  set book(book: Book | undefined) {
    this._book = book;
    if (book) {
      this.bookForm.reset(book);
    }
  }

  save(event: Event) {
    event.preventDefault();
    const bookProps: BookProperties = this.bookForm.getRawValue();
    const createOrUpdate = this._book ? //
      this.books.updateBook({id: this._book.id, ...bookProps})//
      : this.books.createNew(bookProps);

    createOrUpdate
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((savedBook) => {
        this.bookForm.reset(savedBook);
        if (!this._book) {
          void this.router.navigate(['..', savedBook.id], {relativeTo: this.currentRoute})
        }
      });
  }

  isPersisted(): boolean {
    return this.bookForm.pristine;
  }

  doIt() {
    this.bookForm.get('author')?.disable()
  }
}
