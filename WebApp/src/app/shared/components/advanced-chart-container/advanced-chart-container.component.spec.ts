import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedChartContainerComponent } from './advanced-chart-container.component';

describe('AdvancedChartContainerComponent', () => {
  let component: AdvancedChartContainerComponent;
  let fixture: ComponentFixture<AdvancedChartContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancedChartContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancedChartContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
