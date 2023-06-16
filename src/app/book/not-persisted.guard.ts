import {CanDeactivateFn} from '@angular/router';
import {BookDetailsComponent} from "./components/book-details/book-details.component";

export const notPersistedGuard: CanDeactivateFn<BookDetailsComponent> = (component) => {
  return !component.isPersisted() ? confirm("The page is not persisted") : true;
};
