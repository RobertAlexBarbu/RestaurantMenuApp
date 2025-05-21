import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlinePriceInputComponent } from './inline-price-input.component';

describe('InlinePriceInputComponent', () => {
  let component: InlinePriceInputComponent;
  let fixture: ComponentFixture<InlinePriceInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InlinePriceInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InlinePriceInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
