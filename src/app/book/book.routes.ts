import {BookOverviewComponent} from './components/book-overview/book-overview.component';
import {BookDetailsComponent} from './components/book-details/book-details.component';
import {Route} from '@angular/router';
import {bookResolver} from "./book.resolver";
import {notPersistedGuard} from "./not-persisted.guard";


// url: books/new
export const bookIdParamName = 'bookId';
export const bookRoutes: Route = {
  path: 'books',
  children: [
    {
      path: '',
      component: BookOverviewComponent
    },
    {
      path: 'new',
      component: BookDetailsComponent,
      canDeactivate: [notPersistedGuard]
    },
    {
      path: `:${bookIdParamName}`,
      component: BookDetailsComponent,
      resolve: {
        book: bookResolver
      },
      canDeactivate: [notPersistedGuard]
    }
  ]
};
