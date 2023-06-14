import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ba-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'book-app';
}
