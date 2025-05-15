import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAccessInsightDialogComponent } from './menu-access-insight-dialog.component';

describe('ChartInsightDialogComponent', () => {
  let component: MenuAccessInsightDialogComponent;
  let fixture: ComponentFixture<MenuAccessInsightDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuAccessInsightDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuAccessInsightDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
