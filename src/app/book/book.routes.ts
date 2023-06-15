import {BookOverviewComponent} from './components/book-overview/book-overview.component';
import {BookDetailsComponent} from './components/book-details/book-details.component';
import {ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from '@angular/core';
import {BookService} from './services/book.service';
import {catchError, throwError} from 'rxjs';

const bookIdParamName = 'bookId';
export const bookRoutes: Route = {
  path: 'books',
  children: [
    {
      path: '',
      component: BookOverviewComponent
    },
    {
      path: 'new',
      component: BookDetailsComponent
    },
    {
      path: `:${bookIdParamName}`,
      component: BookDetailsComponent,
      resolve: {
        book: (route: ActivatedRouteSnapshot) => {
          const router = inject(Router);
          const bookIdAsString = route.params[bookIdParamName];
          const bookId = +bookIdAsString;
          if (isNaN(bookId)) {
            setTimeout(() => router.navigateByUrl('/books/new'));
            return throwError(() => new Error(`Could not parse "${bookIdAsString}" as Book ID`));
          } else {
            const books = inject(BookService);
            return books.findOne(bookId)
              .pipe(
                catchError(error => {
                  setTimeout(() => router.navigateByUrl('/books/new'));
                  return throwError(() => error);
                })
              );
          }
        }
      }
    }
  ]
};
