import { TestBed } from '@angular/core/testing';

import { MenuStyleService } from './menu-style.service';

describe('MenuStyleService', () => {
  let service: MenuStyleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuStyleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
