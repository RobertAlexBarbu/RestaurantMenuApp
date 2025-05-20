import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDeleteDialogComponent } from './item-delete-dialog.component';

describe('ItemDeleteDialogComponent', () => {
  let component: ItemDeleteDialogComponent;
  let fixture: ComponentFixture<ItemDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemDeleteDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
