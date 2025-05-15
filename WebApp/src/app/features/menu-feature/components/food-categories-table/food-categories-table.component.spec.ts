import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodCategoriesTableComponent } from './food-categories-table.component';

describe('FoodCategoriesTableComponent', () => {
  let component: FoodCategoriesTableComponent;
  let fixture: ComponentFixture<FoodCategoriesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodCategoriesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodCategoriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
