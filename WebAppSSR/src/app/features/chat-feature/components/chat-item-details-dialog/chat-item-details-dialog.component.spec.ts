import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatItemDetailsDialogComponent } from './chat-item-details-dialog.component';

describe('ChatItemDetailsDialogComponent', () => {
  let component: ChatItemDetailsDialogComponent;
  let fixture: ComponentFixture<ChatItemDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatItemDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatItemDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
