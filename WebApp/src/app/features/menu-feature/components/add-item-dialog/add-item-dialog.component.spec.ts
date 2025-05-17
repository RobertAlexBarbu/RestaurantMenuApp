import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemDialogComponent } from './add-item-dialog.component';

describe('AddItemDialogComponent', () => {
  let component: AddItemDialogComponent;
  let fixture: ComponentFixture<AddItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddItemDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
