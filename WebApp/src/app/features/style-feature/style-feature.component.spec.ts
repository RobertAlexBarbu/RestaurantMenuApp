import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleFeatureComponent } from './style-feature.component';

describe('StyleFeatureComponent', () => {
  let component: StyleFeatureComponent;
  let fixture: ComponentFixture<StyleFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StyleFeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StyleFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
