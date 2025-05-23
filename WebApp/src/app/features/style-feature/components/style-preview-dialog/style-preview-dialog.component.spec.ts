import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylePreviewDialogComponent } from './style-preview-dialog.component';

describe('StylePreviewDialogComponent', () => {
  let component: StylePreviewDialogComponent;
  let fixture: ComponentFixture<StylePreviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StylePreviewDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StylePreviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
