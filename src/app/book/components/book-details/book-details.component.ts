import {Component, DestroyRef, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Book, BookProperties} from '../../model';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../../services/book.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule, ValidationErrors, ValidatorFn,
  Validators
} from "@angular/forms";

type BookFormType = FormGroup<{
  author: FormGroup<AuthorFormType>,
  details: FormGroup<DetailsFormType>,
  title: FormControl<string>
}>
type AuthorFormType = {
  firstName: FormControl<string>,
  lastName: FormControl<string>

}
type DetailsFormType = {
  pages: FormControl<number>,
}


const minLength2: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>
  control.value && control.value.length < 2 ? {"minLength2": "The value is too short!"} : null;

const minLength = (minLength: number): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value && control.value.length < minLength ? {"minLength": "The value is too short!"} : null;
  }
}

const maxLengthFullName = (maxLength: number): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const firstNameControl = control.get('firstName');
    const lastNameControl = control.get('lastName');
    return firstNameControl?.value && lastNameControl?.value && firstNameControl?.value.length + lastNameControl?.value.length > maxLength ? {"maxLengthFullName": "The name is too long!"} : null;
  }
}


@Component({
  selector: 'ba-book-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {

  // bookForm: BookFormType = new FormGroup({
  //     author: new FormGroup({
  //       firstName: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(3)]}),
  //       lastName: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(3)]}),
  //     }),
  //     details: new FormGroup({
  //       pages: new FormControl(0, {
  //         nonNullable: true,
  //         validators: [Validators.required, Validators.minLength(10)]
  //       })
  //     }),
  //     title: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(10)]}),
  //   }
  // );

  bookForm: BookFormType = this.fb.group({
      author: this.fb.group({
        firstName: ['', [Validators.required, minLength(10)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
      }, {validators: [maxLengthFullName(40)]}),
      details: this.fb.group({
        pages: [0, [Validators.required, Validators.minLength(10)]]
      }),
      title: ['', [Validators.required, Validators.minLength(10)]],
    }
  );

  constructor(
    private readonly books: BookService,
    private readonly fb: NonNullableFormBuilder,
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
    const b: any = 1;
    const a: string = b;
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
