import {Component, DestroyRef, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Book, BookProperties} from '../../model';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../../services/book.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {CardPanelComponent} from "../book-overview/card-panel/card-panel.component";
import {BookFormComponent} from "./book-form/book-form.component";


@Component({
  selector: 'ba-book-details',
  standalone: true,
  imports: [CommonModule, CardPanelComponent, BookFormComponent],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {

  @Input()
  book: Book | undefined;
  bookChangedStatus: boolean = false;

  constructor(
    private readonly books: BookService,
    private readonly router: Router,
    private readonly currentRoute: ActivatedRoute,
    private readonly destroyRef: DestroyRef) {
  }

  bookChanged(changed: boolean) {
    this.bookChangedStatus = changed;
  }

  bookSaveClicked(book: BookProperties) {
    const createOrUpdate = this.book ? //
      this.books.updateBook({id: this.book.id, ...book})//
      : this.books.createNew(book);

    createOrUpdate
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((savedBook) => {
        if (!this.book) {
          void this.router.navigate(['..', savedBook.id], {relativeTo: this.currentRoute})
        }
        this.book = savedBook;
      });
  }

  isPersisted(): boolean {
    return this.bookChangedStatus;
  }
}
