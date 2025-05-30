import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemChartComponent } from './item-chart.component';

describe('ItemChartComponent', () => {
  let component: ItemChartComponent;
  let fixture: ComponentFixture<ItemChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
