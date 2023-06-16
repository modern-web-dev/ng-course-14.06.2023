import {ActivatedRouteSnapshot, ResolveFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {catchError, throwError} from "rxjs";
import {BookService} from "./services/book.service";
import {bookIdParamName} from "./book.routes";
import {Book} from "./model";

export const bookResolver: ResolveFn<Book> = (route: ActivatedRouteSnapshot) => {
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
