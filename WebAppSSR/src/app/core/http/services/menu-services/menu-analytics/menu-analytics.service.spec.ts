import { TestBed } from '@angular/core/testing';

import { MenuAnalyticsService } from './menu-analytics.service';

describe('MenuAnalyticsService', () => {
  let service: MenuAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuAnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
