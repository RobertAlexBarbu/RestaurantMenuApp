import { TestBed } from '@angular/core/testing';

import { MenuStoreService } from './menu-store.service';

describe('MenuStoreService', () => {
  let service: MenuStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
