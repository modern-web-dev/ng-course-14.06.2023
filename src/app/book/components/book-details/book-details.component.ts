import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Book} from '../../model';

@Component({
  selector: 'ba-book-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent {
  @Input({
    alias: 'value',
    required: true
  })
  book: Book | undefined;

  @Output()
  readonly valueChange = new EventEmitter<Book>();

  save(event: Event) {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const authorInput = formElement.querySelector<HTMLInputElement>('#author');
    const titleInput = formElement.querySelector<HTMLInputElement>('#title');
    const changedBook: Book = {
      id: this.book?.id!,
      author: authorInput?.value ?? '',
      title: titleInput?.value ?? ''
    }
    this.valueChange.emit(changedBook);
  }
}
