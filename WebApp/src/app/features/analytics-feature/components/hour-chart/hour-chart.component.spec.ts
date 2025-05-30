import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourChartComponent } from './hour-chart.component';

describe('HourChartComponent', () => {
  let component: HourChartComponent;
  let fixture: ComponentFixture<HourChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HourChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HourChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
