import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAddAdvancedDialogComponent } from './category-add-advanced-dialog.component';

describe('CategoryAddAdvancedDialogComponent', () => {
  let component: CategoryAddAdvancedDialogComponent;
  let fixture: ComponentFixture<CategoryAddAdvancedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryAddAdvancedDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryAddAdvancedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
