import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemVisibilityButtonComponent } from './item-visibility-button.component';

describe('ItemVisibilityButtonComponent', () => {
  let component: ItemVisibilityButtonComponent;
  let fixture: ComponentFixture<ItemVisibilityButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemVisibilityButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemVisibilityButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
