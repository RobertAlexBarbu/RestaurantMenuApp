import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFeatureComponent } from './menu-feature.component';

describe('MenuFeatureComponent', () => {
  let component: MenuFeatureComponent;
  let fixture: ComponentFixture<MenuFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuFeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
