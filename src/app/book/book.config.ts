import {EnvironmentProviders, makeEnvironmentProviders} from '@angular/core';
import {BookService} from './services/book.service';

export function provideBooks(): EnvironmentProviders {
  return makeEnvironmentProviders([BookService]);
}
