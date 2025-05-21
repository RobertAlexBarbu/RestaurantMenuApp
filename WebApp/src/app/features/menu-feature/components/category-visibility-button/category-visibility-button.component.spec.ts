import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryVisibilityButtonComponent } from './category-visibility-button.component';

describe('CategoryVisibilityButtonComponent', () => {
  let component: CategoryVisibilityButtonComponent;
  let fixture: ComponentFixture<CategoryVisibilityButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryVisibilityButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryVisibilityButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
