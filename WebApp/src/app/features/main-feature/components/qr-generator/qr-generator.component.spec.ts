import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrGeneratorComponent } from './qr-generator.component';

describe('QrGeneratorComponent', () => {
  let component: QrGeneratorComponent;
  let fixture: ComponentFixture<QrGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
