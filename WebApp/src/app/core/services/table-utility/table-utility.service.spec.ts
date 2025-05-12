import { TestBed } from '@angular/core/testing';

import { TableUtilityService } from './table-utility.service';

describe('TableUtilityService', () => {
  let service: TableUtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableUtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
