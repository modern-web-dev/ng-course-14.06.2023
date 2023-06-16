import {EnvironmentProviders, makeEnvironmentProviders} from '@angular/core';
import {BACKED_URI, BookService} from './services/book.service';


export function provideBooks(): EnvironmentProviders {
  return makeEnvironmentProviders([BookService,
    {provide: BACKED_URI, useValue: "http://localhost:3000"}]);
}
