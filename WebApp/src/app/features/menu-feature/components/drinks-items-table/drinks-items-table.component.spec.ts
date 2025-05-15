import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinksItemsTableComponent } from './drinks-items-table.component';

describe('DrinksItemsTableComponent', () => {
  let component: DrinksItemsTableComponent;
  let fixture: ComponentFixture<DrinksItemsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrinksItemsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrinksItemsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
