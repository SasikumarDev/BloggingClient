import { TestBed, async, inject } from '@angular/core/testing';

import { BloggingGuardGuard } from './blogging-guard.guard';

describe('BloggingGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BloggingGuardGuard]
    });
  });

  it('should ...', inject([BloggingGuardGuard], (guard: BloggingGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
