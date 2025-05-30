import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryChartComponent } from './category-chart.component';

describe('CategoryChartComponent', () => {
  let component: CategoryChartComponent;
  let fixture: ComponentFixture<CategoryChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
