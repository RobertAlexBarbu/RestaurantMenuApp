import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryOrderDialogComponent } from './category-order-dialog.component';

describe('CategoryOrderDialogComponent', () => {
  let component: CategoryOrderDialogComponent;
  let fixture: ComponentFixture<CategoryOrderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryOrderDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
