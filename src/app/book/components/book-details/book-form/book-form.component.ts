import {Component, DestroyRef, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Book, BookProperties} from "../../../model";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ValidationMessageComponent} from "../../validation-message/validation-message.component";
import {BookService} from "../../../services/book.service";
import {ActivatedRoute, Router} from "@angular/router";
import {maxLengthFullName, minLength} from "../validators";


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
//TODO
type ControlsOf<T> = { [P in keyof T]: T[P] extends "string" | "number" ? FormControl<T[P]> : FormGroup<ControlsOf<T[P]>> };


@Component({
  selector: 'ba-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ValidationMessageComponent],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent {
  @Output()
  bookSaveClicked = new EventEmitter<BookProperties>();
  @Output()
  bookChanged = new EventEmitter<boolean>();

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
  //
  // bookForm: FormGroup<ControlsOf<BookProperties>> = new FormGroup({
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

  constructor(
    private readonly fb: NonNullableFormBuilder) {
    this.bookForm.valueChanges.subscribe(() => {
      this.bookChanged.emit(true)
    })
  }

  @Input()
  set book(book: Book | undefined) {
    if (book) {
      this.bookForm.reset(book);
    }
  }

  save(event: Event) {
    event.preventDefault();
    this.bookSaveClicked.emit(this.bookForm.getRawValue())
  }
}
