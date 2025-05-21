import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportCategoriesPreviewComponent } from './import-categories-preview.component';

describe('ImportCategoriesPreviewComponent', () => {
  let component: ImportCategoriesPreviewComponent;
  let fixture: ComponentFixture<ImportCategoriesPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportCategoriesPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportCategoriesPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
