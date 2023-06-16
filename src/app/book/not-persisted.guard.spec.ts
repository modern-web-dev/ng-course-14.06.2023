import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { notPersistedGuard } from './not-persisted.guard';

describe('notPersistedGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => notPersistedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
