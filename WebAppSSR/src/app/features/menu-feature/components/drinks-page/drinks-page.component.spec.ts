import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinksPageComponent } from './drinks-page.component';

describe('DrinksPageComponent', () => {
  let component: DrinksPageComponent;
  let fixture: ComponentFixture<DrinksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrinksPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrinksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
