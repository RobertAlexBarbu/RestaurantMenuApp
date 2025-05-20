import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAddDialogComponent } from './item-add-dialog.component';

describe('ItemAddDialogComponent', () => {
  let component: ItemAddDialogComponent;
  let fixture: ComponentFixture<ItemAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemAddDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
