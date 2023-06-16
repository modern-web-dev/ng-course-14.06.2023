import {Component, DestroyRef, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Book, BookProperties} from '../../model';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../../services/book.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'ba-book-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  @Input()
  book: Book | undefined;

  persisted = true;

  constructor(
    private readonly books: BookService,
    private readonly router: Router,
    private readonly currentRoute: ActivatedRoute,
    private readonly destroyRef: DestroyRef) {
  }

  save(event: Event) {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const authorInput = formElement.querySelector<HTMLInputElement>('#author');
    const titleInput = formElement.querySelector<HTMLInputElement>('#title');
    const bookProps: BookProperties = {
      author: authorInput?.value ?? '',
      title: titleInput?.value ?? ''
    }
    const createOrUpdate = this.book ? this.books.updateBook({id: this.book.id, ...bookProps})
      : this.books.createNew(bookProps);
    createOrUpdate
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.router.navigate(['..'], {relativeTo: this.currentRoute}));
  }

  isPersisted(): boolean {
    return this.persisted;
  }
}
