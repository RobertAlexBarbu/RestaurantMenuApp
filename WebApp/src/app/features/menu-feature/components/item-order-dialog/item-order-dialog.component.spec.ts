import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemOrderDialogComponent } from './item-order-dialog.component';

describe('ItemOrderDialogComponent', () => {
  let component: ItemOrderDialogComponent;
  let fixture: ComponentFixture<ItemOrderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemOrderDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
