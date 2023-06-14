import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Book} from '../../model';

@Component({
  selector: 'ba-book-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  @Input({
    alias: 'value',
    required: true
  })
  book: Book | undefined;
}
