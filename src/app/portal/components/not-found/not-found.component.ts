import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'ba-not-found',
  standalone: true,
  imports: [
    RouterLink
  ],
  template: `
    <h3>Page not found</h3>
    <p>Please go <a routerLink="/books">Book Overview</a></p>
  `
})
export class NotFoundComponent {

}
