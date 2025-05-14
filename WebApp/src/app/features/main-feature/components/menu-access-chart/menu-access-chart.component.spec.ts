import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAccessChartComponent } from './menu-access-chart.component';

describe('MenuAccessChartComponent', () => {
  let component: MenuAccessChartComponent;
  let fixture: ComponentFixture<MenuAccessChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuAccessChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuAccessChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
