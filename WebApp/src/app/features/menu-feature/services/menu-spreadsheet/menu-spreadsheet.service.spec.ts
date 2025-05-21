import { TestBed } from '@angular/core/testing';

import { MenuSpreadsheetService } from './menu-spreadsheet.service';

describe('MenuSpreadsheetService', () => {
  let service: MenuSpreadsheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuSpreadsheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
