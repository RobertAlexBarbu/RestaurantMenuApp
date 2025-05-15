import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodItemsTableComponent } from './food-items-table.component';

describe('FoodItemsTableComponent', () => {
  let component: FoodItemsTableComponent;
  let fixture: ComponentFixture<FoodItemsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodItemsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodItemsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
