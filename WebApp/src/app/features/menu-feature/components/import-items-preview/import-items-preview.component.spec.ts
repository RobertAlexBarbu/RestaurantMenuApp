import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportItemsPreviewComponent } from './import-items-preview.component';

describe('ImportItemsPreviewComponent', () => {
  let component: ImportItemsPreviewComponent;
  let fixture: ComponentFixture<ImportItemsPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportItemsPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportItemsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
