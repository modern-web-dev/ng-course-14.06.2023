import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Book} from "../../../model";

@Component({
  selector: 'ba-book-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookTableComponent {

  @Input({required: true})
  books!: Book[] | null;

  @Output()
  bookClicked = new EventEmitter<Book>();

  goToDetailsOf(book: Book) {
    this.bookClicked.emit(book);
  }
}
