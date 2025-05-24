import { TestBed } from '@angular/core/testing';

import { ThemeCreationService } from './theme-creation.service';

describe('ThemeCreationService', () => {
  let service: ThemeCreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeCreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
