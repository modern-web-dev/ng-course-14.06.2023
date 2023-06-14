import {ApplicationConfig} from '@angular/core';
import {provideBooks} from './book/book.config';

export const appConfig: ApplicationConfig = {
  providers: [provideBooks()]
};
