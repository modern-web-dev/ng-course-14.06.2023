import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookOverviewComponent} from './book/components/book-overview/book-overview.component';
import {BookService} from './book/services/book.service';

@Component({
  selector: 'ba-root',
  standalone: true,
  imports: [CommonModule, BookOverviewComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}
