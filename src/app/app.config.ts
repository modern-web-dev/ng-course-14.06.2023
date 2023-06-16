import {ApplicationConfig} from '@angular/core';
import {provideBooks} from './book/book.config';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import {bookRoutes} from './book/book.routes';
import {NotFoundComponent} from './portal/components/not-found/not-found.component';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {jwttokenInterceptor} from "./jwt-token.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
        {path: '', pathMatch: 'full', redirectTo: '/books'},
        bookRoutes,
        {path: '**', component: NotFoundComponent}
      ],
      withComponentInputBinding()
    ),
    provideBooks(),
    provideHttpClient(withInterceptors([jwttokenInterceptor]))
  ]
};
