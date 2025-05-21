import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemImageButtonComponent } from './item-image-button.component';

describe('ItemImageButtonComponent', () => {
  let component: ItemImageButtonComponent;
  let fixture: ComponentFixture<ItemImageButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemImageButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemImageButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
