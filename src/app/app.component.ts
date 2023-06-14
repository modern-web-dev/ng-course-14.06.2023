import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookDetailsComponent} from './book/components/book-details/book-details.component';

@Component({
  selector: 'ba-root',
  standalone: true,
  imports: [CommonModule, BookDetailsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}
