import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinksCategoriesTableComponent } from './drinks-categories-table.component';

describe('DrinksCategoriesTableComponent', () => {
  let component: DrinksCategoriesTableComponent;
  let fixture: ComponentFixture<DrinksCategoriesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrinksCategoriesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrinksCategoriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
