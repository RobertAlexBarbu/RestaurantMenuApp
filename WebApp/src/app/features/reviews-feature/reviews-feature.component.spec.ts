import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsFeatureComponent } from './reviews-feature.component';

describe('ReviewsFeatureComponent', () => {
  let component: ReviewsFeatureComponent;
  let fixture: ComponentFixture<ReviewsFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewsFeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewsFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
