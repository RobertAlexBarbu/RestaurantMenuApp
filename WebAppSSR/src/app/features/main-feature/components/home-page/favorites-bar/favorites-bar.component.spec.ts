import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesBarComponent } from './favorites-bar.component';

describe('FavoritesBarComponent', () => {
  let component: FavoritesBarComponent;
  let fixture: ComponentFixture<FavoritesBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
